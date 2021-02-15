import './vendors/fullpage.parallax.min.js';
import fullpage from 'fullpage.js/dist/fullpage.extensions.min';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export class Template {
  constructor() {
    this.fullPageApi = null;
    this.container = document.getElementById('fullpage');
    this.header = document.getElementsByClassName('js-header');
    this.content1 = document.getElementsByClassName('js-section-content-inner-1');
    this.downloadBar = document.getElementsByClassName('js-download-bar');
    this.sectionBackground = document.getElementsByClassName('fp-bg');
  }

  init() {
    this.width = window.innerWidth;
    this.initFullPage();
    this.handleWindowResize();
    this.handleScrollTrigger();
    this.handleDownloadBar();
    this.handleScrollTop();
    this.handleGoToPricing();
  }

  initFullPage() {
    if (this.container && !this.isTablet) {
      const sections = this.getSections;
      this.fullPageApi = new fullpage('#fullpage', {
        licenseKey: '74ED3D42-843248CC-935A616C-ED1D0476',
        parallaxKey: 'cGxlcm4uY29fM0NLY0dGeVlXeHNZWGc9RUlB',
        parallax: true,
        parallaxOptions: {
          type: 'reveal',
          percentage: 62,
          property: 'translate'
        },
        scrollingSpeed: 1000,
        autoScrolling: true,
        fitToSection: false,
        anchors: sections,
        animateAnchor: false,
        lockAnchors: true,
        responsiveWidth: 1335,
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

  hasContent1Visible() {
    return this.content1;
  }

  animationFirstSection() {
    const tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
    tl.to(this.header, { duration: 1, delay: 0.5, ease: 'easeOut', yPercent: 0, opacity: 1 });
    if (this.hasDownloadBarVisible) {
      tl.to(this.downloadBar, { ease: 'easeOut', yPercent: 0, opacity: 1, duration: 1 }, '-=1');
    }
    if (this.hasContent1Visible) {
      tl.to(this.content1, { ease: 'easeOut', yPercent: 0, opacity: 1, duration: 2, }, '-=0.9');
    }
    if (this.sectionBackground) {
      tl.to(this.sectionBackground, { duration: 0.75, opacity: 1, ease: 'easeOut' }, '-=1.8');
    }
  }

  setTextPosition() {
    gsap.set(this.header, { yPercent: -100, opacity: 0 });
    gsap.set('.js-section-content-inner', { yPercent: 100 });

    if (this.hasContent1Visible) {
      gsap.set(this.content1, { yPercent: 100, opacity: 0 });
    }
    if (this.sectionBackground) {
      gsap.set(this.sectionBackground, { opacity: 0 });
    }
  }

  animationText(index) {
    const section = document.querySelectorAll('section')[index];
    const content = section.getElementsByClassName('js-section-content-inner');
    gsap.to(content, {
      ease: 'easeOut',
      yPercent: 0,
      opacity: 1,
      delay: 0.5,
      duration: 1.2
    });
  }

  handleWindowResize() {
    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.handleParallax();
    });
  }

  handleParallax() {
    if (this.isTablet && this.fullPageApi) {
      this.fullPageApi = this.fullPageApi.destroy('all');
    } else {
      this.initFullPage();
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
    gsap.to(this.header, {
      scrollTrigger: {
        trigger: '.footer__logo',
        start: 'top center',
        scrub: true,
        // markers: true,
      },
      ease: 'easeOut',
      yPercent: -100,
      duration: 1.2,
    });
  }

  handleDownloadBar() {
    if (this.isTablet && this.downloadBar) {
      ScrollTrigger.create({
        trigger: '.js-trigger-download-bar',
        onEnter: () => {
          gsap.to(this.downloadBar, {
            ease: 'easeOut',
            yPercent: 100,
            duration: 1,
          });
        },
        onLeaveBack: () => {
          gsap.to(this.downloadBar, {
            ease: 'easeOut',
            yPercent: 0,
            duration: 1,
          });
        }
      });
    }
  }

  handleScrollTop() {
    const goTopButton = document.getElementById('go-top');
    if (goTopButton) {
      goTopButton.addEventListener('click', () => {
        console.log(this.isTablet);
        if (this.isTablet) {
          gsap.to('body', { duration: 2, scrollTo: 0 });
        } else {
          this.fullPageApi.moveTo('page1');
        }
      });
    }
  }

  handleGoToPricing() {
    const button = document.getElementsByClassName('js-go-to-pricing');
    if (button && button.length) {
      button[0].addEventListener('click', (e) => {
        e.preventDefault();
        if (this.isTablet) {
          gsap.to('body', { duration: 2, scrollTo: '.section__home8' });
        } else {
          this.fullPageApi.moveTo('page8');
        }
      });
    }
  }

  get isTablet() {
    return this.width < 1336;
  }

  get getSections() {
    const sections = document.querySelectorAll('.section');
    const array = [];
    sections.forEach((e, i) => array.push('page' + (i + 1)));
    return array;
  }
}
