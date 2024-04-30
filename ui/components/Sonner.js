import Toast from './Toast.js';

export default class Sonner extends Toast {
  // { UI } trigger -- the ui element that triggers a toast
  constructor(trigger, headerText, contentText){
    super(trigger, headerText, contentText);
    this.toastShowCount = 3;
    this.addEventListener('mouseover', e => {
      let rect;
      if(this.toasts.length > 0)
        rect = this.toasts.at(-1).toast.html.getBoundingClientRect();
      for(let i = 0; i < this.toasts.length; i++){
        const toast = this.toasts[i].toastWrapper;
        console.log("Height: "+rect.height);
        if(this.toasts.length-1-i < this.toastShowCount){
          toast.setStyle({
            minHeight: rect.height+'px',
            marginBottom: '5px',
            display: 'flex',
            opacity: 1,
            overflow: 'visible',
            zIndex: i
          });
        } else {
          toast.setStyle({
            minHeight: '0',
            display: 'none',
            opacity: 1,
            height: '0',
            marginBottom: 0,
          });
        }
      }
    });
    this.addEventListener('mouseout', e => {
      for(let i=0; i < this.toasts.length; i++){
        const toast = this.toasts[i].toastWrapper;
        if(i < this.toasts.length - this.toastShowCount){
          toast.setStyle({
            minHeight: '1rem',
            display: 'flex',
            opacity: 1,
            height: '1rem',
            marginBottom: 0,
            zIndex: i
          });
        } else {
          toast.setStyle({
            minHeight: '0',
            display: 'none',
            opacity: 1,
            height: '0',
            marginBottom: 0,
          });
        }
      }
    });
  }
}