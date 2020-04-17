export default (editor, opt = {}) => {

  if (true) {
    const sectors = editor.StyleManager.getSectors();
    
    editor.on('load', () => {
      sectors.reset();
      sectors.add([{
        name: 'Icon',
        open: false,
        buildProps:[
          // social icon properties
          'icon-padding','icon-size',
          // navbar icon properties
          // TODO: ico-close, ico-open, ico-font-family, ico-text-decoration, ico-text-transform
          'ico-align','ico-color',
          'ico-padding',
          'ico-font-size','ico-line-height',
        ],
        properties:[{
          property: "ico-color",
          name: "Icon color",
          type: "color",
        }, {
          property: 'icon-padding',
          name: 'Icon padding',
          detatched: false,
          type: 'composite',
          properties: [
            { name: 'Top', property: 'icon-padding-top', type:'integer', units:['px'], min:0 },
            { name: 'Right', property: 'icon-padding-right', type:'integer', units:['px'], min:0 },
            { name: 'Bottom', property: 'icon-padding-bottom', type:'integer', units:['px'], min:0 },
            { name: 'Left', property: 'icon-padding-left', type:'integer', units:['px'], min:0 }
          ],
        }, {
          property: 'ico-padding',
          name: 'Icon padding',
          detached: false,
          type: 'composite',
          properties: [
            { name: 'Top', property: 'ico-padding-top', type:'integer', units:['px'], min:0 },
            { name: 'Right', property: 'ico-padding-right', type:'integer', units:['px'], min:0 },
            { name: 'Bottom', property: 'ico-padding-bottom', type:'integer', units:['px'], min:0 },
            { name: 'Left', property: 'ico-padding-left', type:'integer', units:['px'], min:0 }
          ],
        }, {
          property: 'ico-align',
          name: "Icon align",
          type: 'radio',
          defaults: 'center',
          list: [
            { value: 'left', name: 'Left', className: 'fa fa-align-left' },
            { value: 'center', name: 'Center', className: 'fa fa-align-center' },
            { value: 'right', name: 'Right', className: 'fa fa-align-right' }
          ],
        },
        { name: 'Icon size', property: 'ico-font-size', type: 'integer', units:['px'], min: 0, defaults:'13px' },
        { name: 'Icon size', property: 'icon-size', type: 'integer', units:['px','%'], min: 0, defaults:'20px' },
        { name: "Icon line height", property: "ico-line-height", type:"integer", min: 0 },], 
      }, {
        name: 'Background',
        open: false,
        buildProps:['container-background-color','background-color','background-image'],
        properties:[{
          property: "container-background-color",
          name: "Container Background",
          type: "color",
        },{
          property: "background-color",
          name: "Background Color",
          type: "color",
        },{
          name:"Background Image",
          property:'background-image',
          type:"composite",
          detached: true,
          properties: [
          {
            name:'URL',
            property: 'background-url',
            placeholder: 'https://',
            full: true,
          },
          {
            type:'integer',
            property:'background-size',
            name:'Size',
            min: 0,
            placeholder: 'auto',
            units: ['px', '%'],
            fixedValues:['auto','cover','contain','inherit','initial']
          }, {
            type: 'select',
            property: 'background-repeat',
            name: 'Repeat',
            list: [
              { value: '', name: 'Default' },
              { value: 'repeat', name: 'Repeat' },
              { value: 'repeat-x', name: 'Repeat X' },
              { value: 'repeat-y', name: 'Repeat Y' },
              { value: 'no-repeat', name: 'No Repeat' }
            ]
          }]
        }]
      }, {
        name: 'Size & Position',
        open: false,
        buildProps: [ 'width','height',
          'padding', 'inner-padding',
          'align','vertical-align',],
        properties: [
          {
            property: 'width',
            name:'Width',
            type:'integer',
            units:['px'],
            min:0
          },{
            property: 'height',
            name:'Height',
            type:'integer',
            units:['px'],
            min:0
          },{
            property: 'padding',
            type:'composite',
            name:'Padding',
            detached: false,
            properties: [
              { name: 'Top', property: 'padding-top', type:'integer', units:['px'], min:0 },
              { name: 'Right', property: 'padding-right', type:'integer', units:['px'], min:0 },
              { name: 'Bottom', property: 'padding-bottom', type:'integer', units:['px'], min:0 },
              { name: 'Left', property: 'padding-left', type:'integer', units:['px'], min:0 }
            ],
          },{
            property: 'inner-padding',
            name: 'Inner padding',
            detached: false,
            type: 'composite',
            properties: [
              { name: 'Top', property: 'inner-padding-top', type:'integer', units:['px'], min:0 },
              { name: 'Right', property: 'inner-padding-right', type:'integer', units:['px'], min:0 },
              { name: 'Bottom', property: 'inner-padding-bottom', type:'integer', units:['px'], min:0 },
              { name: 'Left', property: 'inner-padding-left', type:'integer', units:['px'], min:0 }
            ],
          },
          {
            property: 'align',
            name: "Horizontal align",
            type: 'radio',
            defaults: 'center',
            list: [
              { value: 'left', name: 'Left', className: 'fa fa-align-left' },
              { value: 'center', name: 'Center', className: 'fa fa-align-center' },
              { value: 'right', name: 'Right', className: 'fa fa-align-right' }
            ],
          },
          {
            property: 'vertical-align',
            name: "Vertical align",
            type: 'radio',
            defaults: 'top',
            list: [
              { value: 'top', name: 'Top', className: 'fa fa-align-left fa-rotate-90' },
              { value: 'middle', name: 'Middle', className: 'fa fa-align-center fa-rotate-90' },
              { value: 'bottom', name: 'Bottom', className: 'fa fa-align-right fa-rotate-90' }
            ],
          }
        ]
      },
      {
        name: "Style",
        open: false,
        buildProps: ['border-radius', 'border-detached'],
        properties: [{
          property: 'border-detached',
          name: 'Border',
          type: 'composite',
          detached: true,
          properties: [
            { name: 'Width', property: 'border-width', type: 'integer' },
            {
              name: 'Style', property: 'border-style', type: 'select',
              list: [
                { value: 'none' },
                { value: 'solid' },
                { value: 'dotted' },
                { value: 'dashed' },
                { value: 'double' },
                { value: 'groove' },
                { value: 'ridge' },
                { value: 'inset' },
                { value: 'outset' }
              ]
            },
            { name: 'Color', property: 'border-color', type: 'color' },
          ]
        }, {
          property: 'border-radius',
          type: 'composite',
          name:'Corner Radius',
          detached: false,
          properties: [
            { name: 'Top', property: 'border-top-left-radius', type:'integer', units: ['px'] },
            { name: 'Right', property: 'border-top-right-radius', type:'integer', units: ['px']  },
            { name: 'Bottom', property: 'border-bottom-left-radius', type:'integer', units: ['px']  },
            { name: 'Left', property: 'border-bottom-right-radius', type:'integer', units: ['px']  }
          ],
        }],
      },
      {
        name: "Typography",
        open: false,
        buildProps: [
          'font-family', 'font-size', 'font-weight', 'color', 
          'text-padding', 'text-align', 'text-decoration', 'line-height'],
        properties: [
        { name: 'Font', property: 'font-family' },
        { name: 'Font weight', property: 'font-weight' },
        { name: 'Font size', property: 'font-size', type: 'integer', units:['px'], min: 0, defaults:'13px' },
        { name: 'Font color', property: 'color' }, 
        {
          property: 'text-padding',
          name: 'Text padding',
          detached: false,
          type: 'composite',
          properties: [
            { name: 'Top', property: 'text-padding-top', type:'integer', units:['px'], min:0 },
            { name: 'Right', property: 'text-padding-right', type:'integer', units:['px'], min:0 },
            { name: 'Bottom', property: 'text-padding-bottom', type:'integer', units:['px'], min:0 },
            { name: 'Left', property: 'text-padding-left', type:'integer', units:['px'], min:0 }
          ],
        },
        {
          property: 'text-align',
          name: "Text align",
          type: 'radio',
          defaults: 'left',
          list: [
            { value: 'left', name: 'Left', className: 'fa fa-align-left' },
            { value: 'center', name: 'Center', className: 'fa fa-align-center' },
            { value: 'right', name: 'Right', className: 'fa fa-align-right' },
            { value: 'justify', name: 'Justify', className: 'fa fa-align-justify' }
          ],
        }, {
          property: 'text-decoration',
          name: "Text decoration",
          type: 'radio',
          defaults: 'none',
          list: [
            { value: 'none', name: 'None', className: 'fa fa-times' },
            { value: 'underline', name: 'underline', className: 'fa fa-underline' },
            { value: 'line-through', name: 'Line-through', className: 'fa fa-strikethrough' }
          ],
        },
        { name: "Line Height", property: "line-height", type:'integer', units: ['px','%']},
        ]
      }]);
    });
  }

};
