// import $ from 'jquery';

export class Navigation {
  init() {
    const burger = document.getElementById('burger');
    if (burger) {
      burger.addEventListener('click', this.toggleNavActive);
      window.addEventListener('resize', this.onWindowsResize);
    }
    this.handleNav();
  }

  toggleNavActive(e) {
    e.preventDefault();
    document.querySelector('html').classList.toggle('nav-active');
  }

  onWindowsResize() {
    console.log('on windows resize');
    if (window.screen.width > 768) {
      document.querySelector('html').classList.remove('nav-active');
    }
  }

  addActiveClass(element) {
    const current = location.pathname.split('/').slice(-1)[0].replace(/^\/|\/$/g, '');
    if (current === '') {
      return;
    }
    const href = element.getAttribute('href');
    if (href.indexOf(current) !== -1) {
      element.classList.add('active');
    }
  }

  handleNav() {
    const links = document.querySelectorAll('.nav__link');
    for (let index = 0; index < links.length; index++) {
      const element = links[index];
      this.addActiveClass(element);
    }
  }
}
