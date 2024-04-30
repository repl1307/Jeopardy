import UI from '../Ui.js';
import hljs from '../highlightjs/highlight.min.js';

export default class Code extends UI {
  static highlighter = hljs;

  constructor(code, language='css'){
    super(document.createElement('code'));

    this.setStyle({
      padding: '0.1em',
      fontSize: '0.9em'
    });
    this.setText(code).addClass('language-'+language);
    Code.highlighter.highlightElement(this.html);
  }
}