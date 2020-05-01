// Specs: https://mjml.io/documentation/#mjml-column
import mjml2html from 'mjml';
import { isComponentType } from './index.js';

export default (editor, { dc, opt, coreMjmlModel, coreMjmlView, sandboxEl }) => {
  const type = 'mj-column';

  dc.addType(type, {
    isComponent: isComponentType(type),
    model: {
      ...coreMjmlModel,
      defaults: {
        name: 'Column',
        draggable: '[data-gjs-type=mj-section]',
        stylable: [
          'background-color', 'vertical-align', 'width',
          'border', 'border-width', 'border-style', 'border-color',
          'border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius',
          'padding', 'padding-top', 'padding-left', 'padding-right', 'padding-bottom',
        ],
      },
    },

    view: {
      ...coreMjmlView,
      tagName: 'div',
      attributes: {
        style: 'pointer-events: all;',
      },

      getTemplateFromMjml() {
        let mjmlTmpl = this.getMjmlTemplate();
        // add an mj-spacer to ensure the full table renders
        let innerMjml = this.getInnerMjmlTemplate({'vertical-align':'top'});
        const mjmlInput = `${mjmlTmpl.start}
        ${innerMjml.start}<mj-spacer />${innerMjml.end}${mjmlTmpl.end}`;

        const htmlOutput = mjml2html(mjmlInput);
        let html = htmlOutput.html;

        // I need styles for responsive columns
        let styles = [];
        sandboxEl.innerHTML = html;
        var styleArr = Array.from(sandboxEl.querySelectorAll('style'));
        styleArr.forEach((item) => {
          styles.push(item.innerHTML);
        });


        let content = html.replace(/<body(.*)>/, '<body>');
        let start = content.indexOf('<body>') + 6;
        let end = content.indexOf('</body>');
        content = content.substring(start, end).trim();
        sandboxEl.innerHTML = content;
        let componentEl = this.getTemplateFromEl(sandboxEl);
        // remove the dummy mj-spacer
        const childContainer = componentEl.querySelector(this.getChildrenSelector());
        while (childContainer.lastChild) {
          childContainer.removeChild(childContainer.lastChild)
        }

        // Copy all rendered attributes (TODO need for all)
        let attributes = {
        };
        const elAttrs = componentEl.attributes;

        for (let elAttr, i = 0, len = elAttrs.length; i < len; i++) {
          elAttr = elAttrs[i];
          attributes[elAttr.name] = elAttr.value;
        }
        /*
        console.groupCollapsed('getTemplateFromMjml ' + this.model.attributes.tagName)
        console.log("=================================================");
        console.log(mjmlInput);
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log(content);
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log(componentEl.innerHTML);
        console.log("=================================================");
        console.groupEnd('getTemplateFromMjml ' + this.model.attributes.tagName)
        */
        return {
          attributes,
          content: componentEl.innerHTML,
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

      renderStyle() {
        this.el.setAttribute('style', `${this.el.getAttribute('style') + this.attributes.style}`);
      },

      getMjmlTemplate() {
        // Need it for responsive columns
        let cols = this.model.collection.models.filter( model => 
          model.attributes && 
          model.attributes.type && 
          model.attributes.type.toLowerCase() !== "textnode"
        ).length - 1;
        cols = cols ? cols : 0;
        let addColumn = Array(cols).fill('<mj-column></mj-column>').join('');

        return {
          start: `<mjml><mj-body><mj-section>`,
          end: `${addColumn}</mj-section></mj-body></mjml>`,
        };
      },

      getTemplateFromEl(sandboxEl) {
        return sandboxEl.firstChild.querySelector('div > table > tbody > tr > td > div');
      },

      getChildrenSelector() {
        debugger;
        return 'div > table > tbody > tr > td';
      },
    },
  });
};
