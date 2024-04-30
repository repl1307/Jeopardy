//ui
export default class UI {
  static elements = [];
  static intersectionObserver = null;
  static mutationObserver = null;
  static parser = new DOMParser();
  static parse(htmlString) {
    return UI.parser.parseFromString(htmlString, 'text/html').body;
  }
  static createElement(tag, textContent = '') {
    const element = document.createElement(tag);
    element.textContent = textContent;
    return element;
  }
  constructor(html = null) {
    if(typeof html == 'string')
      this.html = document.createElement(html);
    else
      this.html = html ?? document.createElement('div');
    this.children = [];
    this.preserveOnRerender = false;
    this.setTheme('zephyr-ui');
    UI.elements.push(this);
    // if(!UI.intersectionObserver){
    //   UI.intersectionObserver = new IntersectionObserver(entries => {
    //     entries.forEach(entry => {
    //       if(entry.isIntersecting)
    //         entry.target.style.visibility = 'visible';
    //     });
    //   });
    //   UI.mutationObserver = new MutationObserver(mutations => {
    //     mutations.forEach(mutation => {
    //       mutation.addedNodes.forEach(node => {
    //         if(node.nodeType === 1)
    //           UI.intersectionObserver.observe(node);
    //         });
    //     });
    //   });
    //   UI.intersectionObserver.observe(document.body);
    //   UI.mutationObserver.observe(document.body, {
    //     childList: true,
    //     subtree: true
    //   });
    // }
    return this;
  }
  //set theme (see theme.js)
  setTheme(theme='') {
    this.html.style = '';
    this.html.classList = '';
    if(theme != '')
      this.addClass(theme);
    return this;
  }

  //append child to ui element
  appendChild(uiElement) {
    if (uiElement instanceof HTMLElement) {
      const ui = new UI(uiElement);
      ui.setTheme('');
      this.html.appendChild(ui.html);
      this.children.push(ui);
      return this;
    }
    this.children.push(uiElement);
    this.html.appendChild(uiElement.html);
    return this;
  }
  //insert child before another child
  insertBefore(uiElement, beforeChild) {
    const before = beforeChild instanceof HTMLElement ?
      beforeChild : beforeChild.html;
    const newElem = uiElement instanceof HTMLElement ?
      uiElement : uiElement.html;
    this.html.insertBefore(newElem, before);
    if (!(uiElement instanceof HTMLElement)) {
      this.children.push(uiElement);
    }
    return this;
  }
  //child is the actual ui element or index of the child
  removeChild(child) {
    if (typeof child == 'number')
      child = this.children[child];

    this.children.splice(this.children.indexOf(child), 1);
    this.html.removeChild(child.html);
    // child.html.remove();
    return child;
  }

  //set text content of ui element
  setText(text) {
    this.html.textContent = text;
    return this;
  }
  //add to text content of ui element
  addText(text) {
    this.html.textContent += text;
    return this;
  }
  //set inner html of ui element
  setInnerHtml(html) {
    const doc = UI.parser.parseFromString(html, 'text/html');
    for (const child of this.html.children) {
      child.remove();
    }
    this.appendChild(doc.body);
    return this;
  }
  //add to inner html of ui element
  addInnerHtml(html) {
    const doc = UI.parser.parseFromString(html, 'text/html');
    this.appendChild(doc.body);
    return this;
  }
  //set css property of ui element
  setStyle(...args) {
    if (args.length == 2) {
      const property = args[0];
      const value = args[1];
      this.html.style[property] = value;
    }
    else {
      for (const [property, value] of Object.entries(args[0])) {
        this.html.style[property] = value;
      }
    }
    return this;
  }

  //set html attribute of ui element
  setAttribute(attribute, value) {
    this.html[attribute] = value;
    return this;
  }

  //get html attribute of ui element
  getAttribute(attribute) {
    return this.html[attribute];
  }

  //modify children
  modifyChildren(callback = child => { console.log(child); }) {
    for (const child of this.children) {
      callback(child);
    }
    return this;
  }

  //add event listener
  addEventListener(event, callback) {
    this.html.addEventListener(event, callback);
    return this;
  }

  //add class
  addClass(...args) {
    for (const c of args)
      this.html.classList.add(c);
    return this;
  }
  //remove class
  removeClass(...args) {
    for (const c of args)
      this.html.classList.remove(c);
    return this;
  }
  //toggle class(es)
  toggleClass(...args) {
    for (const c of args)
      this.html.classList.toggle(c);
    return this;
  }

  //remove element
  remove() {
    this.html.remove();
    for (const child of this.children) {
      if (child.html)
        child.html.remove();
      else
        child.remove();
    }
    return this;
  }
}