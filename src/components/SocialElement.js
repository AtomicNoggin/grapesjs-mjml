// Specs: https://mjml.io/documentation/#mjml-social
import { isComponentType } from './index.js';

export default (editor, { dc, coreMjmlModel, coreMjmlView }) => {
  const type = 'mj-social-element';

  dc.addType(type, {
    isComponent: isComponentType(type),

    model: {
      ...coreMjmlModel,
      defaults: {
        name: 'SocialElement',
        draggable: '[data-gjs-type=mj-social]',
        stylable: [
          'padding', 'padding-top', 'padding-left', 'padding-right', 'padding-bottom',
          'icon-padding', 'icon-padding-top', 'icon-padding-left', 'icon-padding-right', 'icon-padding-bottom',
          'text-padding', 'text-padding-top', 'text-padding-left', 'text-padding-right', 'text-padding-bottom',
          'border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius',
          'background-color',
          'color', 'font-family', 'font-size', 'font-style', 'font-weight', 'line-height', 'text-decoration'
        ],
        traits: [
          {
            type: 'select',
            label: 'Icon',
            name: 'name',
            options: [
              { value: '', name: 'Custom' },
              { value: 'facebook', name: 'Facebook' },
              { value: 'twitter', name: 'Twitter' },
              { value: 'google', name: 'Google' },
              { value: 'instagram', name: 'Instagram' },
              { value: 'web', name: 'Web' },
              { value: 'youtube', name: 'Youtube' },
              { value: 'pinterest', name: 'Pinterest' },
              { value: 'linkedin', name: 'Linkedin' },
              { value: 'snapchat', name: 'Snapchat' },
              { value: 'vimeo', name: 'Vimeo' },
              { value: 'tumblr', name: 'Tumblr' },
              { value: 'github', name: 'Github' },
              { value: 'soundcloud', name: 'SoundCloud' },
              { value: 'medium', name: 'Medium' },
              { value: 'dribbble', name: 'Dribbble' },
              { value: 'xing', name: 'Xing' },
            ]
          },
          { name: 'src', label: 'Custom icon URL'},
          { name: 'href', label: 'Link URL' },
          {
            label: 'Link Target', name: 'target', type: 'select',
            options: [
              { value: '', name: 'Default' },
              { value: ' _blank', name: 'New Tab' },
              { value: ' _self', name: 'Same Tab' },
            ]
          },
        ],
      },
    },

    view: {
      ...coreMjmlView,
      tagName: 'table',
      attributes: {
        style: 'pointer-events: all; float: none; display: inline-table;',
      },

      getMjmlTemplate() {
        let parentView = this.model.parent().view;
        if (parentView.getInnerMjmlTemplate) {
          let mjmlSocial = coreMjmlView.getInnerMjmlTemplate.call(parentView);
          return {
            start: `<mjml><mj-body><mj-column>${mjmlSocial.start}`,
            end: `${mjmlSocial.end}</mj-column></mj-body></mjml>`,
          };
        } else {
          return {
            start: `<mjml><mj-body><mj-column><mj-social>`,
            end: `</mj-social></mj-column></mj-body></mjml>`,
          };
        }
      },

      getTemplateFromEl(sandboxEl) {
        return sandboxEl.querySelector('tr > td > table').innerHTML;
      },

      getChildrenSelector() {
        return 'img';
      }
    },
  });
};
