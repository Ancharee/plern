import MicroModal from 'micromodal';
import * as $ from 'jquery';
import 'jquery-mask-plugin';

export class Form {
  constructor() {
    this.form = document.getElementsByClassName('js-submit');
    this.modal = document.getElementsByClassName('js-modal-confirm');
    this.initMask();
  }

  init() {
    if (this.form.length) {
      this.form[0].addEventListener('click', () => {
        this.submit();
      });
    }
    if (this.modal.length) {
      MicroModal.init();
      this.modal[0].addEventListener('click', () => {
        this.openModalDone();
      });
    }
  }

  submit() {
    const form = document.getElementsByClassName('js-form')[0];
    const controls = form.getElementsByClassName('form-control');
    let errors = 0;
    for (let index = 0; index < controls.length; index++) {
      const control = controls[index];
      if (!control.value) {
        this.showErrorMessage(control);
        errors++;
      } else {
        this.hideErrorMessage(control);
        errors--;
      }
    }

    if (errors <= 0 && this.modal.length) {
      this.openModalOTP();
    }
  }

  showErrorMessage(element) {
    element.nextSibling.nextSibling.style.display = 'block';
  }

  hideErrorMessage(element) {
    element.nextSibling.nextSibling.style.display = 'none';
  }

  openModalOTP() {
    MicroModal.show('modal-otp');
  }

  openModalDone() {
    MicroModal.close('modal-otp');
    MicroModal.show('modal-done');
  }

  initMask() {
    const form = document.getElementsByClassName('js-form-credit');
    if (form.length) {
      $('#credit').mask('0000-0000-0000-0000');
      $('#expire').mask('00-00');
      $('#cvv').mask('000');
    }
  }
}
