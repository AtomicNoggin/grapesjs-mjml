// Specs: https://mjml.io/documentation/#mjml-spacer
import { isComponentType } from './index.js';

export default (editor, { dc, coreMjmlModel, coreMjmlView }) => {
  const type = 'mj-spacer';

  dc.addType(type, {
    isComponent: isComponentType(type),

    model: {
      ...coreMjmlModel,
      defaults: {
        name: 'Spacer',
        draggable: '[data-gjs-type=mj-column], [data-gjs-type=mj-hero]',
        droppable: false,
        stylable: ['height', 'width', 'padding','padding-top','padding-right', 'padding-bottom','padding-left', 'container-background-color', 'vertical-align'],
        traits:[],
        void: true,
      },
    },

    view: {
      ...coreMjmlView,
      tagName: 'table',
      attributes: {
        style: 'pointer-events: all; display: table; width: 100%;user-select: none;',
      },

      getMjmlTemplate() {
        return {
          start: `<mjml><mj-body><mj-section><mj-column>`,
          end: `</mj-column></mj-section></mj-body></mjml>`,
        };
      },

      getTemplateFromEl(sandboxEl) {
        return sandboxEl.querySelector('table table').innerHTML;
      },

      getChildrenSelector() {
        return 'td';
      },

      renderChildren() {
        coreMjmlView.renderChildren.call(this);
      }
    },
  });
};