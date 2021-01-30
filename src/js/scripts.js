// Load jQuery from NPM
import $ from 'jquery';
import { Template } from './template';
import {
  Navigation,
  Accordion
} from './components/index';

window.jQuery = $;
window.$ = $;

document.addEventListener('DOMContentLoaded', () => {
  new Template().init();
  new Navigation().init();
  new Accordion().init();
});
