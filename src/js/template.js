import * as $ from 'jquery';
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
    this.textWrapper1 = document.getElementsByClassName('text-wrapper-1');
    this.buttonWrapper1 = document.getElementsByClassName('button-wrapper-1');
    this.downloadBar = document.getElementsByClassName('js-download-bar');
    this.sectionBackground = document.getElementsByClassName('fp-bg');
    this.tablet = this.tablet;
  }

  init() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.initFullPage();
    this.handleWindowResize();
    this.handleScrollTrigger();
    this.handleDownloadBar();
    this.handleScrollTop();
    this.handleGoToPricing();
    this.setHeightToBG();
  }

  initFullPage() {
    // if (this.container && !this.isTablet && !this.isVerticalShot) {
    const sections = this.getSections;
    this.fullPageApi = new fullpage('#fullpage', {
      licenseKey: '74ED3D42-843248CC-935A616C-ED1D0476',
      parallaxKey: 'cGxlcm4uY29fM0NLY0dGeVlXeHNZWGc9RUlB',
      // parallax: true,
      parallaxOptions: {
        type: 'reveal',
        percentage: 62,
        property: 'translate'
      },
      scrollingSpeed: 1200,
      autoScrolling: true,
      fitToSection: false,
      anchors: sections,
      animateAnchor: false,
      lockAnchors: true,
      responsiveWidth: 1024,
      responsiveHeight: 600,
      afterRender: () => {
        this.setAnimationFirstSection();
        this.animationFirstSection();
      },
      afterLoad: (origin, destination, direction) => {
        this.setTextWrapper();
        console.log(origin);
        console.log(destination);
        console.log(direction);
        const { index } = destination;
        if (index > 0) {
          this.animationTextWrapper(index);
        }
        if (direction && direction === 'down') {
          this.setTextWrapper1();
        } else if (direction && direction === 'up' && index === 0) {
          this.animationTextWrapper1();
        }
        this.animationImageWrapper(index);
      },
      onLeave: (origin, destination, direction) => {
        this.toggleHeader(destination);
        this.toggleDownloadBar(origin, destination, direction);
        this.setImageWrapper(origin, destination, direction);
      }
    });
    // }
  }

  hasDownloadBarVisible() {
    return this.downloadBar.offsetHeight !== 0 && this.downloadBar.offsetWidth !== 0;
  }

  setAnimationFirstSection() {
    // Header
    gsap.set(this.header, { yPercent: -100, opacity: 0 });
    // Headline
    const textHeadline = document.getElementsByClassName('text-headline-1');
    if (textHeadline && textHeadline.length) {
      gsap.set(textHeadline, { y: 50, opacity: 0 });
    }
    // Text content
    if (this.textWrapper1 && this.textWrapper1.length) {
      gsap.set(this.textWrapper1, { opacity: 0 });
      const textLines = this.textWrapper1[0].querySelectorAll('*');
      gsap.to(textLines, { y: 50, opacity: 0 });
    }
    // Button
    if (this.buttonWrapper1 && this.buttonWrapper1.length) {
      gsap.set(this.buttonWrapper1, { y: 50, opacity: 0 });
    }
    // Background
    if (this.sectionBackground && this.sectionBackground.length) {
      gsap.set(this.sectionBackground, { opacity: 0 });
    }
  }

  animationFirstSection() {
    // Create timeline
    const tl = gsap.timeline({
      repeat: 0,
      repeatDelay: 0,
      defaults: { ease: 'power2.inOut', duration: 1 }
    });
    // Header
    tl.to(this.header, { delay: 0.5, yPercent: 0, opacity: 1 });
    // Button download
    if (this.hasDownloadBarVisible) {
      tl.to(this.downloadBar, { yPercent: 0, opacity: 1 }, '-=1');
    }
    // Headline
    const textHeadline = document.getElementsByClassName('text-headline-1');
    if (textHeadline && textHeadline.length) {
      tl.to(textHeadline, { y: 0, opacity: 1, stagger: 0.09 }, '-=0.9');
    }
    // Text content
    if (this.textWrapper1 && this.textWrapper1.length) {
      tl.to(this.textWrapper1, { opacity: 1, duration: 0, }, '-=0.9');
      const textLines = this.textWrapper1[0].querySelectorAll('*');
      tl.to(textLines, { y: 0, opacity: 1, stagger: 0.09  }, '-=1');
    }
    // Button
    if (this.buttonWrapper1 && this.buttonWrapper1.length) {
      tl.to(this.buttonWrapper1, { y: 0, opacity: 1 }, '-=0.9');
    }
    // Background
    if (this.sectionBackground) {
      tl.to(this.sectionBackground, { duration: 0.75, opacity: 1 }, '-=1.8');
    }
  }

  setTextWrapper1() {
    // Headline
    const textHeadline = document.getElementsByClassName('text-headline-1');
    if (textHeadline && textHeadline.length) {
      gsap.set(textHeadline, { y: 50, opacity: 0 });
    }
    // Text content
    const textWrapper = document.getElementsByClassName('text-wrapper-1');
    if (textWrapper && textWrapper.length) {
      const textLines = textWrapper[0].querySelectorAll('*');
      gsap.to(textLines, { y: 50, opacity: 0 });
    }
    // Button
    if (this.buttonWrapper1 && this.buttonWrapper1.length) {
      gsap.set(this.buttonWrapper1, { y: 50, opacity: 0 });
    }
  }

  animationTextWrapper1() {
    // Create timeline
    const tl = gsap.timeline({ repeat: 0, repeatDelay: 0,
      defaults: { ease: 'power2.inOut', duration: 1, opacity: 1 }
    });
    // Headline
    let time = '';
    const textHeadline = document.getElementsByClassName('text-headline-1');
    if (textHeadline && textHeadline.length) {
      tl.to(textHeadline, { y: 0, opacity: 1, stagger: 0.09 });
      time = '-=0.9';
    }
    // Text content
    const textWrapper = document.getElementsByClassName('text-wrapper-1');
    if (textWrapper && textWrapper.length) {
      const textLines = textWrapper[0].querySelectorAll('*');
      tl.to(textLines, { y: 0, opacity: 1, stagger: 0.09 }, time);
    }
    // Button
    if (this.buttonWrapper1 && this.buttonWrapper1.length) {
      tl.to(this.buttonWrapper1, { y: 0, opacity: 1 }, '-=0.9');
    }
  }

  setTextWrapper() {
    const sections = document.querySelectorAll('section');
    for (let index = 0; index < sections.length; index++) {
      const section = sections[index];
      // Headline
      const textHeadline = section.getElementsByClassName('text-headline');
      if (textHeadline && textHeadline.length) {
        gsap.to(textHeadline, { y: 50, opacity: 0 });
      }
      // Text content
      const textWrapper = section.getElementsByClassName('text-wrapper');
      if (textWrapper && textWrapper.length) {
        const textLines = textWrapper[0].querySelectorAll('*');
        gsap.to(textLines, { y: 50, opacity: 0 });
      }
      // Button
      const buttonWrapper = section.getElementsByClassName('button-wrapper');
      if (buttonWrapper && buttonWrapper.length) {
        gsap.set(buttonWrapper, { y: 50, opacity: 0 });
      }
    }
  }

  animationTextWrapper(index) {
    const section = document.querySelectorAll('section')[index];
    const textWrapper = section.getElementsByClassName('text-wrapper');
    const buttonWrapper = section.getElementsByClassName('button-wrapper');
    const textHeadline = section.getElementsByClassName('text-headline');
    // create timeline
    const tl = gsap.timeline({ repeat: 0, repeatDelay: 0,
      defaults: { ease: 'power2.inOut', duration: 1, opacity: 1 }
    });
    let time = '';
    // Headline
    if (textHeadline && textHeadline.length) {
      tl.to(textHeadline, { y: 0, opacity: 1, stagger: 0.09 });
      time = '-=0.9';
    }
    // Text content
    if (textWrapper && textWrapper.length) {
      const textLines = textWrapper[0].querySelectorAll('*');
      tl.to(textLines, { y: 0, opacity: 1, stagger: 0.09 }, time);
    }
    // Button
    if (buttonWrapper && buttonWrapper.length) {
      tl.to(buttonWrapper, { y: 0, opacity: 1, stagger: 0.09 }, '-=0.9');
    }
  }

  handleWindowResize() {
    window.addEventListener('resize', () => {
      this.handleWindowChanges();
    });

    window.addEventListener('orientationchange', () => {
      this.handleWindowChanges();
    });
  }

  handleWindowChanges() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.setHeightToBG();
    if (this.isTablet && !this.isVerticalShot) {
      this.fullPageApi.parallax = true;
    } else {
      this.fullPageApi.parallax = false;
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

  toggleDownloadBar(origin, destination, direction) {
    if (direction === 'down') {
      const { item } = destination;
      if (item && item.classList.contains('js-trigger-download-bar')) {
        gsap.to(this.downloadBar, {
          ease: 'easeOut',
          yPercent: 100,
          duration: 1,
        });
      }
    } else {
      const { item } = origin;
      if (item && item.classList.contains('js-trigger-download-bar')) {
        gsap.to(this.downloadBar, {
          ease: 'easeOut',
          yPercent: 0,
          duration: 1,
        });
      }
    }
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

  setImageWrapper(origin, destination, direction) {
    if (direction === 'down') {
      const { item } = destination;
      const imageWrapper = item.getElementsByClassName('js-image-wrapper');
      if (imageWrapper && imageWrapper.length) {
        gsap.set(imageWrapper, { y: '3.9vh' });
      }
    } else {
      const { item } = destination;
      const imageWrapper = item.getElementsByClassName('js-image-wrapper');
      if (imageWrapper && imageWrapper.length) {
        gsap.set(imageWrapper, { y: '-3.9vh' });
      }
    }
  }

  animationImageWrapper(index) {
    const section = document.querySelectorAll('section')[index];
    const imageWrapper = section.getElementsByClassName('js-image-wrapper');
    if (imageWrapper && imageWrapper.length) {
      gsap.to(imageWrapper, { ease: 'power2.inOut', duration: 1, y: 0 });
    }
  }

  setHeightToBG() {
    const bg$ = $('.js-bg');
    if (bg$ && bg$.length) {
      const next$ = bg$.next();
      bg$.find('.fp-bg').css('height', next$[0].offsetHeight);
    }
  }

  get isTablet() {
    return this.width < 1024;
  }

  get isVerticalShot() {
    return this.height < 600;
  }

  get getSections() {
    const sections = document.querySelectorAll('.section');
    const array = [];
    sections.forEach((e, i) => array.push('page' + (i + 1)));
    return array;
  }
}
