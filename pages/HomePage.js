import * as Zephyr from '../ui/core.js';

export class HomePage extends Zephyr.Box {
  constructor(router){
    super();
    this.center().setStyle({
      flexDirection: 'column',
      height: '100%'
    });
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