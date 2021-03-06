// Specs: https://mjml.io/documentation/#mjml-hero
import { isComponentType } from './index.js';

export default (editor, { dc, coreMjmlModel, coreMjmlView }) => {
  const type = 'mj-hero';
  const droppable = [
    'mj-text', 'mj-button', 'mj-image', 'mj-divider', 'mj-navbar', 'mj-social',
    'mj-spacer',
  ].map(tag => `[data-gjs-type=${tag}]`).join(', ');

  dc.addType(type, {
    isComponent: isComponentType(type),

    model: {
      ...coreMjmlModel,
      defaults: {
        name: 'Hero',
        draggable: '[data-gjs-type=mj-body]',
        droppable,
        stylable: [
          'background-color','background-image','background-url','background-width','background-height','background-repeat',
          'height', 'width', 
          'padding', 'padding-top', 'padding-left', 'padding-right', 'padding-bottom', 
          'vertical-align'
        ],
        traits: [
          {
            type: 'select',
            name: 'mode',
            Label: 'Layout Mode',
            defaults:'fluid-height',
            options: [
              {value:'fluid-height',name:'Fluid Height'},
              {value:'fixed-height',name:'Fixed Height'},
            ],
          }
        ]
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
        return '.mj-hero-content';
      },

    }
  });
};
