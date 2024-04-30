import UI from '../Ui.js';
import Box from '../core/Box.js';
import Button from '../core/Button.js';

export default class Toast extends UI {
  static createToastId() {
    const length = 32;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }

    return randomId;
  }
  // { UI } trigger -- the ui element that triggers a toast
  constructor(trigger, headerText, contentText) {
    super();
    this.setStyle({
      position: 'fixed',
      bottom: 0,
      right: 0,
      flexDirection: 'column-reverse',
      display: 'flex',
      transition: 'all 0.25s',
      padding: 0,
      margin: '5px',
      boxSizing: 'border-box',
      background: 'rgba(0, 0, 0, 0)',
      color: 'none',
      border: 'none',
      height: 0,
      zIndex: 100
    });
    document.body.appendChild(this.html);
    this.toastShowCount = 1;
    this.headerText = headerText;
    this.contentText = contentText;
    this.onClick = null;
    this.trigger = trigger;
    this.trigger.addEventListener('click', e => {
      if(this.onClick)
        this.onClick();
      this.addToast(this.headerText, this.contentText);
    });
    this.toasts = [];
  }

  //add toast
  addToast(headerText, messageText) {
    /*toast structure:
    toast
    -> content
      -> innerContent
          -> header
          -> message
      -> button
    */

    //close button
    const button = new Button().setStyle({
      fontSize: '0.9em',
      aspectRatio: '1 / 1',
      minWidth: 'fit-content',
      borderRadius: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    });
    
    const buttonText = new UI().setText('X').setStyle({
      background: 'none',
      border: 'none'
    });
    button.appendChild(buttonText);
    
    const toast = new Box()
      .setStyle({
        flexDirection: 'column',
        position: 'relative',
        height: '1rem',
        margin: 0,
        padding: 0,
        border: 'none',
        transition: 'right 0.25s, max-height: 0.25s',
        maxWidth: '90vw',
        width: 'min(50vw, 25rem)',
      });
    toast.setAttribute('id', Toast.createToastId());

    const innerContent = new Box()
      .setStyle({
        flexDirection: 'column',
        border: 'none'
      });
    
    const content = new Box()
      .setStyle({
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: '-50vh',
        right: 0,
        zIndex: 1,
        width: 'min(50vh, 25rem)',
        maxWidth: '100vw',
        transition: 'right 0.25s, bottom 0.25s, transform 0.15s, opacity: 0.25s',
        margin: 0,
      });

    //slide in animation on next render
    requestAnimationFrame(() => {
      content.setStyle({
        bottom: 0
      });
    });

    let header = null;
    if (headerText != '') {
      header = UI.createElement('h2', headerText);
      header.style.margin = 0;
      innerContent.appendChild(header);
    }
    const text = UI.createElement('p', messageText);
    innerContent.appendChild(text);
    content.appendChild(innerContent);
    content.appendChild(button);
    // content.appendChild(text);
    toast.appendChild(content);

    //when close button is clicked
    button.addEventListener('click', e => {
      const currentToast = this.toasts.filter(t => t.toastWrapper.getAttribute('id') == toast.getAttribute('id'))[0];
      const content = currentToast.toast;

      currentToast.toast.setStyle('max-height', 0);
      content.setStyle('right', '-' + (content.html.clientWidth + 50) + 'px');
      requestAnimationFrame(() => setTimeout(() => {
        toast.html.remove();
      }, 250));
      const index = this.toasts.indexOf(currentToast);
      this.toasts.splice(index, 1);
      this.children[this.children.indexOf(currentToast.toastWrapper)].remove();
      this.children.splice(this.children.indexOf(currentToast.toastWrapper), 1);
      if (this.toasts.length > 0)
        this.toasts.at(-1).toast.setStyle('transform', 'scale(1)');
    });

    this.showToast(this.toastShowCount);
    this.toasts.push(new ToastStructure(toast, content, header, text, button));
    if(this.children.length > 0){
      this.insertBefore(toast, this.children.at(-1));
      console.log('inserting toast');
    }
    else{
      this.appendChild(toast);
      console.log('appending toast');
    }
    console.log(this.children);
    return this;
  }

  showToast(numOfToasts){
      let toastCount = -1;
      for (let i = this.toasts.length-1; i >= 0; i--) {
        toastCount++;
        const t = this.toasts[i];
        if(toastCount < numOfToasts){
          t.toast.setStyle('display', 'flex');
        }
        else{
          t.toast.remove();
          this.toasts.splice(i, 1);
        }
      }
  }
}

class ToastStructure {
  constructor(toastWrapper, toast, header, message, button){
    this.toastWrapper = toastWrapper;
    this.toast = toast;
    this.header = header;
    this.message = message;
    this.button = button;
  }
}