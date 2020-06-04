import mjml2html from 'mjml';
import { isComponentType } from '.';

export default (editor, { dc, coreMjmlModel, coreMjmlView, sandboxEl }) => {
  const type = 'mj-navbar';

  dc.addType(type, {
    isComponent: isComponentType(type),
    model: {
      ...coreMjmlModel,
      defaults: {
        name: 'NavBar',
        draggable: '[data-gjs-type=mj-column],[data-gjs-type=mj-hero]',
        droppable: '[data-gjs-type=mj-navbar-link]',
        stylable: [
          'align','ico-align','ico-color',
          'ico-padding','ico-padding-top','ico-padding-right','ico-padding-bottom','ico-padding-left',
          'ico-font-size','ico-line-height',
          // TODO: ico-close, ico-open, ico-font-family, ico-text-decoration, ico-text-transform
        ],
        traits: [
          {label:'Base URL', name:'base-url'},
          {
            type: 'checkbox',
            label: 'Hamburger',
            name: 'hamburger',
            valueTrue: 'hamburger',
            valueFalse: ''
          }
        ],
      },
    },

    view: {
      ...coreMjmlView,

      tagName: 'table',

      attributes: {
        style: 'pointer-events: all; display: table; width: 100%',
      },

      init() {
        coreMjmlView.init.call(this);
        this.listenTo(this.model.get('components'), 'add remove', this.render);
      },

      getTemplateFromMjml() {
        let mjmlTmpl = this.getMjmlTemplate();
        let innerMjml = this.getInnerMjmlTemplate();
        const mjmlInput = `${mjmlTmpl.start}
        ${innerMjml.start}${innerMjml.end}${mjmlTmpl.end}`;
        const htmlOutput = mjml2html(mjmlInput);
        let html = htmlOutput.html;
  
        // I need styles for hamburger
        let styles = [];
        sandboxEl.innerHTML = html;
        var styleArr = Array.from(sandboxEl.querySelectorAll('style'));
        styleArr.forEach((item) => {
          styles.push(item.innerHTML);
        });


        html = html.replace(/<body(.*)>/, '<body>');
        let start = html.indexOf('<body>') + 6;
        let end = html.indexOf('</body>');
        html = html.substring(start, end).trim();
        sandboxEl.innerHTML = html;
        let componentEl = this.getTemplateFromEl(sandboxEl);
        const templateOutput = componentEl.innerHTML
        // Copy all rendered attributes (TODO need for all)
        let attributes = {};
        const elAttrs = componentEl.attributes;

        for (let elAttr, i = 0, len = elAttrs.length; i < len; i++) {
          elAttr = elAttrs[i];
          attributes[elAttr.name] = elAttr.value;
        }
        return {
          attributes,
          content: templateOutput,
          style: styles.join(' ')
        };
      },

      render() {
        this.renderAttributes();
        const mjmlResult = this.getTemplateFromMjml();
        this.el.innerHTML = mjmlResult.content;
        this.$el.attr(mjmlResult.attributes);
        editor.addComponents(`<style>${mjmlResult.style}</style>`);
        this.getChildrenContainer().innerHTML = this.model.get('content');
        this.renderChildren();
        this.renderStyle();
        return this;
      },

      getMjmlTemplate() {
        return {
          start: `<mjml><mj-body><mj-section><mj-column>`,
          end: `</mj-column></mj-section></mj-body></mjml>`,
        };
      },

      getTemplateFromEl(sandboxEl) {
        return sandboxEl.firstChild.querySelector('table table');
      },

      getChildrenSelector() {
        return 'div.mj-inline-links';
      },

      rerender() {
        coreMjmlView.rerender.call(this);
        this.model.components().models.forEach((item) => {
          if (item.attributes.type != "mj-navbar-link") {
            return;
          }
          item.view.rerender();
        });
      },
    },
  });
};
