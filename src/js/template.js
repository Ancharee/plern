import fullpage from 'fullpage.js/dist/fullpage.extensions.min';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export class Template {
  constructor() {
    this.fullpageApi = null;
    this.container = document.getElementById('fullpage');
    this.header = document.getElementsByClassName('js-header');
    this.image = document.getElementsByClassName('js-section-image-1');
    this.downloadBar = document.getElementsByClassName('js-download-bar');
  }

  init() {
    this.width = window.innerWidth;
    this.initFullPage();
    this.handleWindowResize();
  }

  initFullPage() {
    if (this.container && this.isDesktop) {
      this.fullpageApi = new fullpage('#fullpage', {
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
          this.setTextPosition();
          this.animationFirstSection();
        },
        afterLoad: (origin, destination, direction) => {
          console.log(origin);
          console.log(destination);
          console.log(direction);
          const { index } = destination;
          if (index > 0) {
            this.animationText(index);
          }
        },
        onLeave: (origin, destination, direction) => {
          console.log('-----onLeave------');
          console.log(origin);
          console.log(destination);
          console.log(direction);
          this.toggleHeader(destination);
        }
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
    const tl = gsap.timeline({ repeat: 0, repeatDelay: 0, defaults: { ease: 'easeOut', yPercent: 0 } });
    tl.to(this.header, { duration: 1, delay: 2 });
    if (this.hasDownloadBarVisible) {
      tl.to(this.downloadBar, { duration: 1 }, '-=1');
    }
    if (this.hasImageVisible) {
      tl.to(this.image, { duration: 3 });
    }
  }

  setTextPosition() {
    gsap.set(this.header, { yPercent: -100 });
    if (this.hasImageVisible) {
      gsap.set(this.image, { yPercent: 100 });
    }
    // gsap.set(this.downloadBar, { yPercent: 100 });
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

  handleWindowResize() {
    this.width = window.innerWidth;
    window.addEventListener('resize', this.handleFullPage);
  }

  handleFullPage() {
    if (this.isDesktop) {
      console.log('desktop');
    } else {
      if (this.fullpageApi) {
        this.fullpageApi.destroy();
      }
    }
  }

  toggleHeader(destination) {
    const { item } = destination;
    let yPercent = 0;
    if (item && item.classList.contains('section--footer')) {
      yPercent = -100;
    }
    gsap.to(this.header, {
      ease: 'easeOut',
      yPercent: yPercent,
      duration: 1.2
    });
  }

  handleScrollTrigger() {

  }

  get isDesktop() {
    return this.width > 1336;
  }
}
