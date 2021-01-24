// Load jQuery from NPM
// import $ from 'jquery';
import {
  Navigation
} from './components/index';

// window.jQuery = $;
// window.$ = $;

document.addEventListener('DOMContentLoaded', () => {
  new Navigation.init();
});
