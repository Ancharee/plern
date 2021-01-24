import fullpage from 'fullpage.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export class Template {
  init() {
    this.initFullPage();
    this.startAnimation();
  }

  initFullPage() {
    const section = document.getElementById('fullpage');
    if (section) {
      new fullpage('#fullpage');
    }
  }

  startAnimation() {
    const tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
    tl.to('.js-header', {
      ease: 'easeOut',
      y: 0,
      duration: 1,
    });
    tl.to('.js-download-bar', {
      ease: 'easeOut',
      y: 0,
      duration: 1,
    }, '-=1');
    const image1 = document.getElementsByName('js-section-image-1');
    if (image1) {
      tl.to('.js-section-image-1', {
        ease: 'easeOut',
        y: 0,
        duration: 3,
      });
    }
  }
}
