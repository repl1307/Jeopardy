import UI from '../Ui.js';

//accordian label
export class AccordianLabel extends UI {
  constructor(text) {
    super();
    this.setText(text);
    this.addClass('zephyr-ui-accordian-label');
  }
}

//accordian content
export class AccordianContent extends UI {
  constructor(text) {
    super();
    this.setTheme('');
    this.setText(text);
    this.addClass('zephyr-ui-accordian-content');
    this.isHidden = true;
  }
  minimize() {
    this.setStyle({
      height: 0,
      paddingTop: 0,
      paddingBottom: 0,
      borderTopWidth: 0,
      borderBottomWidth: 0
    });
    return this;
  }
  expand(height, style) {
    this.setStyle({
      height: height+'px',
      paddingTop: style.paddingTop,
      paddingBottom: style.paddingBottom,
      borderBottomWidth: style.borderRightWidth,
    });
    return this;
  }
}

//accordian
export class Accordian extends UI {
  constructor() {
    super();
    this.labels = [];
    this.contents = [];
    this.openLimit = null;
    this.currentLimit = this.openLimit;
  }
  addContent(label, content, index = null) {
    if (index != null) {
      this.html.insertBefore(content.html, this.labels[index].html);
      this.html.insertBefore(label.html, content.html);
      this.labels.splice(index, 0, label);
      this.contents.splice(index, 0, content);
    } else {
      this.labels.push(label);
      this.contents.push(content);
      this.html.appendChild(label.html);
      this.html.appendChild(content.html);
    }

    const labelClick = () => {
      const height = content.html.scrollHeight;
      const style = getComputedStyle(content.html);
      
      label.html.addEventListener('click', e => {
        if (this.openLimit != null && content.isHidden) {
          if (this.currentLimit == 0) {
            for (const c of this.contents) {
              c.isHidden = true;
              c.minimize();
            }
            this.currentLimit = this.openLimit - 1;
            content.expand(height, style);
            content.isHidden = false;
            return;
          }
          this.currentLimit--;
        }
        if (content.isHidden)
          content.expand(height, style);
        else
          content.minimize();
        content.isHidden = !content.isHidden;
      });
      content.minimize();
    };
    requestAnimationFrame(labelClick);
    return this;
  }
  removeContent(index) {
    this.contents[index].html.remove();
    this.labels[index].html.remove();
    this.contents.splice(index, 1);
    this.labels.splice(index, 1);
    return this;
  }
  setLimit(num) {
    this.openLimit = num;
    this.currentLimit = num;
    return this;
  }
}