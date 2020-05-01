// Specs: https://mjml.io/documentation/#mjml-text

export default (editor, { dc, coreMjmlModel, coreMjmlView }) => {
  const type = 'mj-text';

  dc.addType(type, {
    extend: 'text',
    extendFnView: ['onActive'],

    isComponent(el) {
      if (el.tagName === type.toUpperCase()) {
        return {
          type,
          content: el.innerHTML,
          components: [],
        };
      }
    },

    model: {
      ...coreMjmlModel,
      defaults: {
        name: 'Text',
        draggable: '[data-gjs-type=mj-column], [data-gjs-type=mj-hero]',
        highlightable: true,
        stylable: [
          'height', 'font-style', 'font-size', 'font-weight', 'font-family',
          'line-height', 'letter-spacing', 'text-decoration', 'align', 'text-transform',
          'padding','padding-left','padding-right','padding-top','padding-bottom', 'container-background-color'
        ],
        traits: []
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
          end: `</mj-column><mj-section></mj-body></mjml>`,
        };
      },

      getTemplateFromEl(sandboxEl) {
        return sandboxEl.querySelector('table table').outerHTML;
      },

      getChildrenSelector() {
        return 'td > div';
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
    },
  });
};
