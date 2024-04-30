import * as Zephyr from './ui/core.js';
import { JeopardyGrid } from './jeopardy/JeopardyGrid.js';
import { QuestionScreen } from './jeopardy/QuestionScreen.js';
import { TeamsPanel } from './jeopardy/TeamsPanel.js';
import { QuestionData } from './jeopardy/QuestionData.js';
import { Router } from './ui/utilities/Router.js';
import {HomePage } from './pages/HomePage.js';

const root = new Zephyr.Box(document.body).setStyle({
  border: 'none',
  flexDirection: 'column',
  padding: 0,
  margin: 0
});

const main = new Zephyr.Box();
main.addClass('main');
main.removeClass('zephyr-ui');
root.appendChild(main);

const router = new Router(main);
router.createRoute('/game/teams', teamGame);
router.createRoute('/game/solo', soloGame);
router.createRoute('/home', home);
router.setRoute('/home');

//game page
async function teamGame(){
  const dataHandler = new QuestionData('questions.csv');
  await dataHandler.getData(dataHandler.filePath);
  const questions = dataHandler.data;
  //const header = new Zephyr.UI('h1').setText('Jeopardy!');
  const navbar = new Zephyr.Box().setStyle({
    width: '100%',
    padding: '0.5rem'
  });
  
  const exit = new Zephyr.Button('Exit');
  exit.addEventListener('click', e => {
    if(confirm('Are you sure? You will lose your progress.'))
      router.setRoute('/home');
  });
  navbar.appendChild(exit);
  const container = new Zephyr.Box();
  container.setStyle({
    padding: '0.5rem',
    overflow: 'hidden'
  });
  
  const grid = new JeopardyGrid(8, 8, questions);
  grid.setCategories(null);
  let points = [];
  for(let i = 10; i > 0; i--)
    points.push(i*100)
  grid.setPointsColumn(points);
  const teamsPanel = new TeamsPanel(1);
  container.appendChild(grid);
  container.appendChild(teamsPanel);

  const questionScreen = new QuestionScreen();
  questionScreen.hide();
  return [ navbar, container, questionScreen.backdrop];
}

//solo game 
async function soloGame(){
  const dataHandler = new QuestionData('questions.csv');
  await dataHandler.getData(dataHandler.filePath);
  const questions = dataHandler.data;
  //const header = new Zephyr.UI('h1').setText('Jeopardy!');
  const navbar = new Zephyr.Box().setStyle({
    width: '100%',
    padding: '0.5rem'
  });
  const exit = new Zephyr.Button('Exit');
  exit.addEventListener('click', e => {
    if(confirm('Are you sure? You will lose your progress.'))
      router.setRoute('/home');
  });
  navbar.appendChild(exit);
  const container = new Zephyr.Box();
  container.setStyle({
    padding: '0.5rem',
    overflow: 'hidden'
  });

  const grid = new JeopardyGrid(8, 8, questions);
  grid.setCategories(null);
  let points = [];
  for(let i = 10; i > 0; i--)
    points.push(i*100)
  grid.setPointsColumn(points);
  const teamsPanel = new TeamsPanel(1);
  container.appendChild(grid);
  container.appendChild(teamsPanel);
  teamsPanel.addTeamButton.remove();

  const questionScreen = new QuestionScreen();
  questionScreen.hide();
  return [ navbar, container, questionScreen.backdrop];
}

//home page
async function home(){
  const page = new HomePage(router);
  return [page];
}
