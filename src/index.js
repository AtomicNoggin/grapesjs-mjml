import loadBlocks from './blocks';
import loadComponents from './components';
import loadCommands from './commands';
import loadButtons from './buttons';
import loadStyle from './style';
import mjml2html from 'mjml';
// pass through all the mjml tags and components so they can be extended as needed later on.
import { registerDependencies } from 'mjml-validator';
import { registerComponent, BodyComponent, HeadComponent } from 'mjml-core';
import MjBody from 'mjml-body';
import MjButton from 'mjml-button';
import {Carousel as MjCarousel, CarouselImage as MjCarouselImage} from 'mjml-carousel';
import MjColumn from 'mjml-column';
import MjDivider from 'mjml-divider';
import MjGroup from 'mjml-group';
import MjAttributes from 'mjml-head-attributes';
import MjBreakpoint from 'mjml-head-breakpoint';
import MjPreview from 'mjml-head-preview';
import MjStyle from 'mjml-head-style';
import MjTitle from 'mjml-head-title';
import MjFont from 'mjml-head-font';
import MjHero from 'mjml-hero';
import MjImage from 'mjml-image';
import {Navbar as MjNavbar, NavbarLink as MjNavbarLink}  from 'mjml-navbar';
import MjRaw from 'mjml-raw';
import MjSection from 'mjml-section';
import {Social as MjSocial, SocialElement as MjSocialElement} from 'mjml-social';
import MjSpacer from 'mjml-spacer';
import MjTable from 'mjml-table';
import MjText from 'mjml-text';
import MjWrapper from 'mjml-wrapper';

const masterPlugin = (editor, opt = {}) => {
  const config = editor.getConfig();
  const opts = {
    editor,
    cmdBtnMoveLabel: 'Move',
    cmdBtnUndoLabel: 'Undo',
    cmdBtnRedoLabel: 'Redo',
    cmdBtnDesktopLabel: 'Desktop',
    cmdBtnTabletLabel: 'Tablet',
    cmdBtnMobileLabel: 'Mobile',

    expTplBtnTitle: 'View Code',
    fullScrBtnTitle: 'FullScreen',
    swichtVwBtnTitle: 'View Components',
    defaultTemplate: '', // Default template in case the canvas is empty
    categoryLabel: '',

    // Code viewer theme
    codeViewerTheme: 'hopscotch',

    // Import placeholder MJML
    importPlaceholder: '',

    // Title for the import modal
    modalTitleImport: 'Import MJML',

    // Test for the import button
    modalBtnImport: 'Import',

    // Description for the import modal
    modalLabelImport: '',

    // Title for the export modal
    modalTitleExport: 'Export MJML',

    // Description for the export modal
    modalLabelExport: '',

    // Overwrite default export command
    overwriteExport: 1,

    // String before the MJML in export code
    preMjml: '',

    // String after the MJML in export code
    postMjml: '',

    // Export 'mjml', 'html' or both (leave empty) TODO
    exportOnly: '',

    // Clean all previous blocks if true
    resetBlocks: 1,

    // Reset the Style Manager and add new properties for MJML
    resetStyleManager: 1,

    // Column padding (this way it's easier select columns)
    columnsPadding: '10px 0',

    ...opt,
  };

  // I need to prevent forced class creation as classes aren't working
  // at the moment
  config.forceClass = 0;

  // Don't need to create css rules with media
  config.devicePreviewMode = 1;

  // Doesn't work without inline styling
  config.avoidInlineStyle = 0;

  [
    loadBlocks,
    loadComponents,
    loadCommands,
    loadButtons,
    loadStyle,
  ].forEach(module => module(editor, opts));

  // Update devices
  if (opts.resetDevices) {
    const dm = editor.DeviceManager;
    dm.getAll().reset();
    dm.add('Desktop', '');
    dm.add('Mobile', '320px');
    dm.add('Tablet', '820px');
  }
};
export default masterPlugin;
export const blocksPlugin = masterPlugin.blocksPlugin = loadBlocks;
export const componentsPlugin = masterPlugin.componentsPlugin = loadComponents;
export const commandsPlugin = masterPlugin.commandsPlugin =  loadCommands;
export const buttonsPlugin = masterPlugin.buttonsPlugin = loadButtons;
export const stylePlugin = masterPlugin.stylePlugin = loadStyle;
export const mjml2htmlCommand = masterPlugin.mjml2htmlCommand = mjml2html;
export const mjmlRegisterDependencies = masterPlugin.mjmlRegisterDependencies = registerDependencies
export const mjmlRegisterComponent = masterPlugin.mjmlRegisterComponent = registerComponent
export const MjmlBodyComponent  = masterPlugin.MjmlBodyComponent = BodyComponent;
export const MjmlHeadComponent  = masterPlugin.MjmlHeadComponent = HeadComponent;
export const BaseMjBody = masterPlugin.BaseMjBody = MjBody;
export const BaseMjButton = masterPlugin.BaseMjButton = MjButton;
export const BaseMjCarousel = masterPlugin.BaseMjCarousel = MjCarousel;
export const BaseMjCarouselImage = masterPlugin.BaseMjCarouselImage = MjCarouselImage;
export const BaseMjColumn = masterPlugin.BaseMjColumn = MjColumn;
export const BaseMjDivider = masterPlugin.BaseMjDivider = MjDivider;
export const BaseMjGroup = masterPlugin.BaseMjGroup = MjGroup;
export const BaseMjAttributes = masterPlugin.BaseMjAttributes = MjAttributes;
export const BaseMjBreakpoint = masterPlugin.BaseMjBreakpoint = MjBreakpoint;
export const BaseMjPreview = masterPlugin.BaseMjPreview = MjPreview;
export const BaseMjStyle = masterPlugin.BaseMjStyle = MjStyle;
export const BaseMjTitle = masterPlugin.BaseMjTitle = MjTitle;
export const BaseMjFont = masterPlugin.BaseMjFont = MjFont;
export const BaseMjHero = masterPlugin.BaseMjHero = MjHero;
export const BaseMjImage = masterPlugin.BaseMjImage = MjImage;
export const BaseMjNavbar = masterPlugin.BaseMjNavbar = MjNavbar;
export const BaseMjNavbarLink = masterPlugin.BaseMjNavbarLink = MjNavbarLink;
export const BaseMjRaw = masterPlugin.BaseMjRaw = MjRaw;
export const BaseMjSection = masterPlugin.BaseMjSection = MjSection;
export const BaseMjSocial = masterPlugin.BaseMjSocial = MjSocial;
export const BaseMjSocialElement = masterPlugin.BaseMjSocialELement = MjSocialElement;
export const BaseMjSpacer = masterPlugin.BaseMjSpacer = MjSpacer;
export const BaseMjTable = masterPlugin.BaseMjTable = MjTable;
export const BaseMjText = masterPlugin.BaseMjText = MjText;
export const BaseMjWrapper = masterPlugin.BaseMjWrapper = MjWrapper;

