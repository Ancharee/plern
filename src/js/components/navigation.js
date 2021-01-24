// import $ from 'jquery';

export class Navigation {
  init() {
    const burger = document.getElementById('burger');
    if (burger) {
      burger.addEventListener('click', this.toggleNavActive);
      window.addEventListener('resize', this.onWindowsResize);
    }
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
}
