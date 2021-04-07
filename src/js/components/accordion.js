import $ from 'jquery';
import 'jquery-ui/ui/widgets/accordion';

export class Accordion {
  init() {
    $('.js-accordion').accordion();

    window.addEventListener('resize', () => {
      $('.js-accordion').accordion('refresh');
    });

    window.addEventListener('orientationchange', () => {
      $('.js-accordion').accordion('refresh');
    });
  }
}
