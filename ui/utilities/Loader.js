import Box from '../core/Box.js';

export class Loader {
  constructor(page, main) {
    this.page = page;
    this.loader = null;
    this.main = main;
    this.delay = 0;
    this.activate();
  }
  activate() {
    const { main } = this;
    let start;
    // if (!this.loader) {
      this.loader = this.loadingElem();
      main.appendChild(this.loader);
    //}
    this.loader.setStyle('display', 'flex');

    start = Date.now();
    console.log('loading started ' + start);

    if (document.readyState != 'complete') {
      const load = (e) => {
        console.log('loading finished ' + Date.now() + ' ' + (Date.now() - start));
        this.page();
        setTimeout(() => this.deactivate(), this.delay);
        window.removeEventListener('load', load);
      };
      window.addEventListener('load', load);
    } else {
      this.page();
    }
  }
  deactivate() {
    this.loader.setStyle('opacity', '0');
    setTimeout(() => {
      this.main.removeChild(this.loader);
      this.loader = null;
    }, 500);
  }
  loadingElem() {
    const container = new Box();
    container.center().setStyle({
      width: '100%',
      height: '100%',
      position: 'fixed',
      margin: 0,
      padding: 0,
      zIndex: 100,
      flexDirection: 'column',
      boxSizing: 'border-box',
      transition: 'opacity 0.5s',
    });
    const text = new Box();
    text.setStyle({
      background: 'none',
      border: 'none',
      fontSize: '10vmin',
      margin: '1.25rem'
    });
    text.setText('Loading...');

    //loading animation
    // const span = document.createElement('span');
    // document.addEventListener('DOMContentLoaded', e => {
    //   span.className = 'loader';
    // });
    //span.style.margin = '10px auto';
    container.appendChild(text);
    //container.appendChild(span);

    container.preserveOnRerender = true;
    return container;
  }
}