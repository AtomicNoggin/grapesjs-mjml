// Specs: https://mjml.io/documentation/#mjml-button
import { isComponentType } from './index.js';

export default (editor, { dc, coreMjmlModel, coreMjmlView }) => {
  const type = 'mj-button';

  dc.addType(type, {
    isComponent: isComponentType(type),
    extend: 'link',
    extendFnView: ['onActive', 'disableEditing'],

    model: {
      ...coreMjmlModel,
      defaults: {
        name: 'Button',
        draggable: '[data-gjs-type=mj-column], [data-gjs-type=mj-hero]',
        highlightable: true,
        stylable: ['width', 'height',
          'background-color', 'container-background-color',
          'font-style', 'font-size', 'font-weight', 'font-family', 'color',
          'text-decoration', 'align','text-align',
          'vertical-align', 'text-transform',
          'padding', 'padding-top', 'padding-left', 'padding-right', 'padding-bottom',
          'inner-padding', 'inner-padding-top', 'inner-padding-left', 'inner-padding-right', 'inner-padding-bottom',
          'border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius',
          'border-detached', 'border-width', 'border-style', 'border-color',
        ],
        traits: [
          {name:"Link URL", property:"href", placeholder:"https://"},
          {
            name: 'Link Target', property: 'target', type: 'select',
            options: [
              { value: '', name: 'Default' },
              { value: '_blank', name: 'New Window' },
              { value: '_self', name: 'Same Window' },
            ]
          },
          {label:"Link rel", name:"rel", placeholder:""},
        ],
        // 'container-background-color', 'inner-padding'
      },
    },

    view: {
      ...coreMjmlView,
      tagName: 'table',
      attributes: {
        style: 'pointer-events: all; display: table; width: 100%',
      },

      getMjmlTemplate() {
        return {
          start: `<mjml><mj-body><mj-section><mj-column>`,
          end: `</mj-column></mj-section></mj-body></mjml>`,
        };
      },

      getTemplateFromEl(sandboxEl) {
        return sandboxEl.querySelector('table table').outerHTML;
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
