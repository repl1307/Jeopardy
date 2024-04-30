import * as Zephyr from '../core.js'

export default class NavBar extends Zephyr.Box {
  constructor(){
    super();
    this.addClass('navbar');
  }
  //onclick takes event and navbar as arguments
  //ex: (e, navbar) => console.log(navbar.children);
  add(uiElem, onClick=null){
    this.appendChild(uiElem);
    if(onClick)
      uiElem.addEventListener('click', e => onClick(e, this));
  }
}