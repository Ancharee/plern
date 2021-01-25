// import fullpage from 'fullpage.js';
import fullpage from 'fullpage.js/dist/fullpage.extensions.min';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { SplitText } from 'gsap/utils';
import SplitText from 'gsap/all';
gsap.registerPlugin(ScrollTrigger, SplitText);

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
          this.animationFirstSection();
          this.setTextPosition();
        },
        afterLoad: (origin, destination, direction) => {
          console.log(origin, direction);
          const { index } = destination;
          if (index > 0) {
            this.animationText(index);
          }
        },
      });
    }
  }

  hasDownloadBarVisible() {
    return this.downloadBar.offsetHeight !== 0 && this.downloadBar.offsetWidth !== 0;
  }

  hasImageVisible() {
    return this.image;
  }

  animationFirstSection() {
    const tl = gsap.timeline({ repeat: 0, repeatDelay: 0, defaults: { ease: 'easeOut', y: 0 } });
    tl.to(this.header, { duration: 1, delay: 2 });
    if (this.hasDownloadBarVisible) {
      tl.to(this.downloadBar, { duration: 1 }, '-=1');
    }
    if (this.hasImageVisible) {
      tl.to(this.image, { duration: 3 });
    }
  }

  setTextPosition() {
    gsap.set('.js-section-content-inner', { yPercent: 100 });
  }

  animationText(index) {
    const section = document.querySelectorAll('section')[index];
    const content = section.getElementsByClassName('js-section-content-inner');
    gsap.to(content, {
      ease: 'easeOut',
      yPercent: 0,
      delay: 0.5,
      duration: 1.2
    });
  }
}
