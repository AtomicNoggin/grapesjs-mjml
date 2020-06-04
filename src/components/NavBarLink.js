import { isComponentType } from '.';

export default (editor, { dc, coreMjmlModel, coreMjmlView }) => {
  const type = 'mj-navbar-link';

  dc.addType(type, {
    isComponent: isComponentType(type),
    extend: 'link',
    extendFnView: ['onActive', 'disableEditing'],
    model: {
      ...coreMjmlModel,

      defaults: {
        name: 'NavBarLink',
        draggable: '[data-gjs-type=mj-navbar]',
        highlightable: false,
        stylable: [
          'font-style', 'font-size', 'font-weight', 'font-family', 'color',
          'text-decoration', 'text-transform',
          'padding', 'padding-top', 'padding-left', 'padding-right', 'padding-bottom',
        ],
        traits: [
          {label:"Link URL", name:"href", placeholder:"https://"},
          {
            label: 'Link Target', name: 'target', type: 'select',
            options: [
              { value: '', name: 'Default' },
              { value: '_blank', name: 'New Window' },
              { value: '_self', name: 'Same Window' },
            ]
          },
          {label:"Link rel", name:"rel", placeholder:""},
        ],
      },
    },


    view: {
      ...coreMjmlView,

      tagName: 'a',

      attributes: {
        style: 'pointer-events: all; float: none; display: inline-table;',
      },

      getMjmlTemplate() {
        let parentView = this.model.parent().view;
        if (parentView.getInnerMjmlTemplate) {
          let mjmlNavBar = coreMjmlView.getInnerMjmlTemplate.call(parentView);
          return {
            start: `<mjml><mj-body><mj-column>${mjmlNavBar.start}`,
            end: `${mjmlNavBar.end}</mj-column></mj-body></mjml>`,
          };
        } else {
          return {
            start: `<mjml><mj-body><mj-column><mj-navbar>`,
            end: `</mj-navbar></mj-column></mj-body></mjml>`,
          };
        }
      },

      getTemplateFromEl(sandboxEl) {
        return sandboxEl.querySelector('div').innerHTML;
      },

      getChildrenSelector() {
        return 'a,p';
      },

      /**
       * Prevent content repeating
       */
      renderChildren() {
        coreMjmlView.renderChildren.call(this);
      },

      /**
       * Need to make text selectable.
       */
      onActive() {
        this.getChildrenContainer().style.pointerEvents = 'all';
      },

      disableEditing() {
        this.getChildrenContainer().style.pointerEvents = 'none';
      },
    },
  });
};