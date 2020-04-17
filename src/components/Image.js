// Specs: https://mjml.io/documentation/#mjml-image
import { isComponentType } from './index.js';

export default (editor, { dc, coreMjmlModel, coreMjmlView }) => {
  const type = 'mj-image';

  dc.addType(type, {
    isComponent: isComponentType(type),
    extend: 'image',

    model: {
      ...coreMjmlModel,
      defaults: {
        name: 'Image',
        resizable: false,
        highlightable: true,
        draggable: '[data-gjs-type=mj-column],[data-gjs-type=mj-section], [data-gjs-type=mj-hero]',
        stylable: [
          'width','height',
          'padding', 'padding-top', 'padding-left', 'padding-right', 'padding-bottom',
          'border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius',
          'border-detached', 'border-width', 'border-style', 'border-color',
          'container-background-color', 'align',
        ],
        'style-default': {
          'padding-top': '10px 25px 10px 25px',
          'align': 'center',
        },
        traits: [
          {label:"Image URL", name:"src", placeholder:"https://"},
          {label:"Alt text", name:"alt", placeholder:""},
          {label:"Title", name:"title", placeholder:""},
          {
            type:'checkbox',
            name:'fluid-on-mobile',
            label:'Fluid on mobile',
            valueTrue: 'true',
            valueFalse: ''
          },          
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
        void: true,
      },
    },

    view: {
      ...coreMjmlView,
      tagName: 'table',
      attributes: {
        style: 'pointer-events: all; display: table; width: 100%; user-select: none;',
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
        return 'img';
      },
    },
  });
};
