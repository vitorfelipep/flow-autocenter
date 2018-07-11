import {ToastOptions} from 'ng2-toastr';

export class CustomOption extends ToastOptions {
  animate = 'fade'; // flyLeft
  positionClass = 'toast-bottom-right';
  toastLife = 10000;
  newestOnTop = false;
  showCloseButton = true;
}
