import UI from '../Ui.js';

export default class Select extends UI {
  constructor(placeholder, options){
    super();
    this.select = new UI(document.createElement('select'))
      .setStyle('margin', 0)
      .setStyle('padding-right', '3rem');
    this.setStyle({
      padding: 0,
      margin: 0,
      width: 'fit-content',
      border: 'none',
      position: 'relative'
    });
    this.arrow = UI.parse(`
    <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 320 512'>
      <path d='M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z'/>
    </svg>`).children[0];
    this.arrow = new UI(this.arrow).setStyle({
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: '5px',
        margin: 0,
        padding: 0,
        paddingBottom: '5px',
        height: 'min(1.5rem, 5vmin)',
        aspectRatio: '1 / 1',
        pointerEvents: 'none',
        border: 'none',
    });
    this.appendChild(this.select)
    this.appendChild(this.arrow)

    //options handling
    if(placeholder){
      this.placeholder = UI.createElement('option', placeholder);
      this.placeholder.setAttribute('selected', 'selected');
      this.select.appendChild(this.placeholder);
    } else {
      this.placeholder = null;
    }
    this.options = [];
    for(const o of options){
      this.options.push(UI.createElement('option', o));
      this.select.appendChild(this.options.at(-1));
    }
  }
}