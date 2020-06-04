// Specs: https://mjml.io/documentation/#mjml-wrapper
import { isComponentType } from './index.js';

export default (editor, { dc, coreMjmlModel, coreMjmlView }) => {
  const type = 'mj-wrapper';

  dc.addType(type, {
    isComponent: isComponentType(type),

    model: {
      ...coreMjmlModel,
      defaults: {
        name: 'Wrapper',
        draggable: '[data-gjs-type=mj-body]',
        droppable: '[data-gjs-type=mj-section]',
        stylable: [
          'background-color','background-image','background-url','background-size','background-repeat',
          'border-detached', 'border-width', 'border-style', 'border-color',
          'border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius',
          'padding', 'padding-top', 'padding-left', 'padding-right', 'padding-bottom',
          'text-align', 'vertical-align'
        ],
        traits: [
          {
            type:'checkbox',
            name:'full-width',
            label:'Full Width',
            valueTrue: 'full-width',
            valueFalse: ''
          },
        ],
      },
    },

    view: {
      ...coreMjmlView,
      tagName: 'div',
      attributes: {
        style: 'pointer-events: all; display: table; width: 100%',
      },

      getMjmlTemplate() {
        return {
          start: `<mjml><mj-body>`,
          end: `</mj-body></mjml>`,
        };
      },

      getChildrenSelector() {
        return 'table tr td';
      },

    }
  });
};
