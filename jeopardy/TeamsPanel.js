import Box from '../ui/core/Box.js';
import { JeopardyGrid } from './JeopardyGrid.js';

export class TeamsPanel extends Box {
  constructor(teamCount){
    super();
    JeopardyGrid.teamsPanel = this;
    this.addClass('team-panel');
    this.addEventListener('click', e => {
      if(e.target.classList.contains('team-panel'))
        e.preventDefault();
    });
    this.teamIndex = -1;
    this.teams = [];
    this.addTeamButton = new Box('button').setText('Add Team');
    this.addTeamButton.addClass('add-team-button');
    this.addTeamButton.addEventListener('click', e => {
      if(this.teams.length < 50)
        this.addTeam(this.teams.length+1);
      else
        alert('There can be at most 50 teams!');
    });
    this.appendChild(this.addTeamButton);
    
    for(let i = 0; i < teamCount; i++){
      this.addTeam(i+1)
    }
    //this.select(this.teamIndex);
  }
  addTeam(teamNumber){
    const colors = [
      'rgb(235, 64, 52)',
      'rgb(86, 235, 52)',
      'rgb(52, 180, 235)',
      'rgb(235, 195, 52)',
      'rgb(235, 52, 214)',
      'rgb(67, 52, 235)',
      'rgb(235, 114, 52)',
      'rgb(235, 52, 75)',
      'rgb(120, 235, 52)',
      'rgb(52, 235, 192)',
      'rgb(235, 160, 52)',
      'rgb(235, 52, 126)',
      'rgb(85, 52, 235)',
      'rgb(52, 148, 235)',
      'rgb(180, 52, 235)',
      'rgb(235, 52, 26)',
      'rgb(146, 52, 235)',
      'rgb(52, 235, 203)',
    ];
    
    const team = new Box();
    const icon = new Box().addClass('team-icon');
    const namePointsWrapper = new Box().addClass('name-points-wrapper');

    const name = new Box('h2').setText('Team '+(teamNumber));
    const points = new Box('p').setText('0');
    name.setAttribute('contentEditable', 'true');
    name.setStyle('flex', 1);
    let index = teamNumber; 
    if(index > colors.length)
      index = teamNumber % colors.length;
    const color = colors[index];
    icon.setStyle('background-color', color);

    team.icon = icon;
    team.name = name;
    team.points = points;
    team.currentPoints = 0;
    team.updatePoints = () => {
      team.points.setText(team.currentPoints);
    }
    team.updatePoints();
    namePointsWrapper.appendChild(name).appendChild(points);
    team.appendChild(icon).appendChild(namePointsWrapper);
    this.appendChild(team);
    this.teams.push(team);
  }
  select(teamIndex){
    this.teamIndex = teamIndex;
    this.teams[teamIndex].addClass('selected');
    this.teams[teamIndex].html.scrollIntoView({block: "nearest", inline: "nearest"});
    if(this.teams.length > 1)
      this.teams.at(teamIndex-1).removeClass('selected');
  }
}