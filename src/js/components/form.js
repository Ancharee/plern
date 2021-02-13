import MicroModal from 'micromodal';

export class Form {
  init() {
    MicroModal.init();
    document
      .getElementsByClassName('js-submit')[0]
      .addEventListener('click', () => {
        this.submit();
      });
    document
      .getElementsByClassName('js-modal-confirm')[0]
      .addEventListener('click', () => {
        this.openModalDone();
      });
  }

  submit() {
    const form = document.getElementsByClassName('js-form')[0];
    const controls = form.getElementsByTagName('input');
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

    if (errors <= 0) {
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
}
