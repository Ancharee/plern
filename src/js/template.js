// import fullpage from 'fullpage.js';
import fullpage from 'fullpage.js/dist/fullpage.extensions.min';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export class Template {
  constructor() {
    this.container = document.getElementById('fullpage');
    this.header = document.getElementsByClassName('js-header');
    this.image = document.getElementsByClassName('js-section-image-1');
    this.downloadBar = document.getElementsByClassName('js-download-bar');
  }

  init() {
    this.initFullPage();
  }

  initFullPage() {
    if (this.container) {
      new fullpage('#fullpage', {
        parallax: true,
        parallaxOptions: {
          type: 'reveal',
          percentage: 62,
          property: 'translate'
        },
        scrollingSpeed: 1000,
        autoScrolling: true,
        fitToSection: false,
        // scrollBar: true,
        afterRender: () => {
          this.animationToFirstSection();
        },
      });
    }
  }

  animationToFirstSection() {
    const tl = gsap.timeline({ repeat: 0, repeatDelay: 0, defaults: { ease: 'easeOut', y: 0 } });
    tl.to(this.header, { duration: 1, delay: 2 });
    if (this.hasDownloadBarVisible) {
      tl.to(this.downloadBar, { duration: 1 }, '-=1');
    }
    if (this.hasImageVisible) {
      tl.to(this.image, { duration: 3 });
    }
  }

  hasDownloadBarVisible() {
    return this.downloadBar.offsetHeight !== 0 && this.downloadBar.offsetWidth !== 0;
  }

  hasImageVisible() {
    return this.image;
  }
}
