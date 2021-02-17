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
    this.handleProfileForm();
  }

  submit() {
    const controls = document.getElementsByClassName('form-control');
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
    $(element).next().show();
    // element.nextSibling.nextSibling.style.display = 'block';
  }

  hideErrorMessage(element) {
    // element.nextSibling.nextSibling.style.display = 'none';
    $(element).next().hide();
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

  handleProfileForm() {
    const profile = document.getElementsByClassName('js-profile');
    if (profile && profile.length) {
      this.toggleDisableForm();
      document.getElementsByClassName('js-edit')[0].addEventListener('click', () => this.onEditProfile());
      document.getElementsByClassName('js-cancel')[0].addEventListener('click', () => this.onCancelEditProfile());
    }
  }

  toggleDisableForm(isDisabled = true) {
    const inputs = document.getElementsByTagName('input');
    for (let index = 0; index < inputs.length; index++) {
      const element = inputs[index];
      element.disabled = isDisabled;
    }
  }

  onEditProfile() {
    this.addActive('js-upload');
    this.addActive('js-form-action');
    this.addActive('js-edit');
    this.toggleDisableForm(false);
  }

  onCancelEditProfile() {
    this.removeActive('js-upload');
    this.removeActive('js-form-action');
    this.removeActive('js-edit');
    this.toggleDisableForm();
  }

  addActive(name) {
    document.getElementsByClassName(name)[0].classList.add('is-active');
  }

  removeActive(name) {
    document.getElementsByClassName(name)[0].classList.remove('is-active');
  }
}
