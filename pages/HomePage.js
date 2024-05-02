import * as Zephyr from '../ui/core.js';

export class HomePage extends Zephyr.Box {
  constructor(router){
    super();
    this.center().addClass('home-page').addClass('hidden');
    setTimeout(() => {
      this.removeClass('hidden');
    }, 500);
    //animation
    this.squares = [];
    for(let i = 0; i < 30; i++){
      const square = new Zephyr.Box().addClass('animated-square');
      this.squares.push(square);
      this.appendChild(square);
      square.setStyle('top', `${i%10*10}%`);
      const randDelay = Math.random() * (i+5);
      let opacity = Math.random();
      opacity -= opacity > 0.5 ? 0.5 : 0;
      if(opacity < 0.1)
        opacity = 0.1;
      if(Math.random() < 0.5)
        square.setStyle('background-color', `rgba(255, 255, 255, ${opacity})`);
      else
        square.setStyle('background-color', `rgba(45, 45, 45, ${opacity})`);
      square.setStyle('animation-delay', `${randDelay}s`);
    }

    //ui
    const header = new Zephyr.UI('h1').setText('Jeopardy!');
    const soloButton = new Zephyr.Button('Play Solo');
    const teamButton = new Zephyr.Button('Play with Teams');
    
    soloButton.addEventListener('click', e => {
      router.setRoute('/game/solo');
    });
    teamButton.addEventListener('click', e => {
      router.setRoute('/game/teams');
    })
    
    const buttons = new Zephyr.Box().setStyle({
      flexDirection: 'column',
      gap: '0.15rem'
    }).centerVertically();
    
    buttons.appendChild(soloButton).appendChild(teamButton);
    this.appendChild(header).appendChild(buttons);
    
  }
}