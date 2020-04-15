// Specs: https://mjml.io/documentation/#mjml-section
import { isComponentType } from './index.js';

export default (editor, { dc, coreMjmlModel, coreMjmlView }) => {
  const type = 'mj-section';

  dc.addType(type, {
    isComponent: isComponentType(type),

    model: {
      ...coreMjmlModel,
      defaults: {
        name: 'Section',
        draggable: '[data-gjs-type=mj-body], [data-gjs-type=mj-wrapper]',
        droppable: '[data-gjs-type=mj-column]',
        'style-default': {
          'padding': '10px 10px',
          'vertical-align': 'top',
          'text-align': 'center',
        },
        stylable: [
          'background-color', 'background-repeat', 'background-size', 'background-url',
          'border', 'border-width', 'border-style', 'border-color',
          'border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius',
          'padding', 'padding-top', 'padding-left', 'padding-right', 'padding-bottom',
          'text-align', 'direction'
        ],
      },
    },

    view: {
      ...coreMjmlView,
      tagName: 'div',
      attributes: {
        style: 'pointer-events: all;',
        'data-type': 'mj-section',
      },

      getMjmlTemplate() {
        let parentView = this.model.parent().view;
        if (parentView.getInnerMjmlTemplate) {
          let mjmlBody = coreMjmlView.getInnerMjmlTemplate.call(parentView);
          return {
            start: `<mjml><mj-body>${mjmlBody.start}`,
            end: `${mjmlBody.end}</mj-body></mjml>`,
          };
        } else {
          return {
            start: `<mjml><mj-body>`,
            end: `</mj-body></mjml>`,
          };
        }
      },

      getChildrenSelector() {
        return 'table > tbody > tr > td';
      },

      init() {
        coreMjmlView.init.call(this);
        this.listenTo(this.model.get('components'), 'add remove', this.render);
      },
    },
  });
};
