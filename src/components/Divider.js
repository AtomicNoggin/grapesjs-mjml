// Specs: https://mjml.io/documentation/#mjml-divider
import { isComponentType } from './index.js';

export default (editor, { dc, coreMjmlModel, coreMjmlView }) => {
  const type = 'mj-divider';

  dc.addType(type, {
    isComponent: isComponentType(type),

    model: {
      ...coreMjmlModel,
      defaults: {
        name: 'Divider',
        draggable: '[data-gjs-type=mj-column],[data-gjs-type=mj-hero]',
        droppable: false,
        'style-default': {
          'width': '100%',
          'border-width': '4px',
          'border-style': 'solid',
          'border-color': '#000000',
          'padding-top': '10px',
          'padding-bottom': '10px',
          'padding-right': '25px',
          'padding-left': '25px',
        },
        stylable: [
          'padding', 'padding-top', 'padding-left', 'padding-right', 'padding-bottom',
          'container-background-color',
          'border-detached', 'border-width', 'border-style', 'border-color'
        ],
        traits: [
          {
            type:'number',
            name:'width',
            label:'Divider Width',
            min: 0,
            defaults:'100%',
            units: ['%', 'px']
          },
          {
            name: "container-background-color",
            label: "Container Background",
            type: "color",
          },
        ],
        void: true,
      },
    },

    view: {
      ...coreMjmlView,
      tagName: 'tr',
      attributes: {
        style: 'pointer-events: all; display: table; width: 100%; user-select: none;',
      },

      getMjmlTemplate() {
        return {
          start: `<mjml><mj-body><mj-column>`,
          end: `</mj-column></mj-body></mjml>`,
        };
      },

      getTemplateFromEl(sandboxEl) {
        return sandboxEl.querySelector('tr').innerHTML;
      },

      getChildrenSelector() {
        return 'p';
      },
    },
  });
};
