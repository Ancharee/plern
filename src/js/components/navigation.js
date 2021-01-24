// import $ from 'jquery';

export class Navigation {
  init() {
    const burger = document.getElementsByName('burger');
    burger.addEventListener('click', function() {
      console.log(this);
    });
  }
}
