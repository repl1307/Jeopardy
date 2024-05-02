import Box from '../ui/core/Box.js';
import UI from '../ui/Ui.js';

import { JeopardyGrid } from './JeopardyGrid.js';

export class QuestionScreen extends Box {
  constructor(){
    super();
    this.currentCell = null; // if set, mode is teams, cell will be hidden on correct answer
    this.currentQuestion = null;
    this.isHandlingAnswer = false;
    this.addClass('question-screen');
    this.backdrop = new Box().center();
    this.backdrop.addClass('backdrop');
    this.backdrop.appendChild(this);
    this.closeButton = new Box('button').setText('Close');
    this.closeButton.addClass('close-button');
    this.closeButton.addEventListener('click', () => {
      this.hide();
    })
    this.question = new Box();
    const text = 'This is a sample question? The answer is hidden below!';
    this.question.addClass('question');
    this.question.setText(text);

    //answer options
    this.answers = new Box();
    this.answers.addClass('answers');
    for(let i = 0; i < 4; i++){
      const child = new Box();
      child.index = i;
      this.answers.appendChild(child);
      child.addEventListener('click', e => {
        const teamsPanel = JeopardyGrid.teamsPanel;
        const displayAnswer = this.currentCell == null;
        //handle user answer
        if(this.currentQuestion.answer.toLowerCase() == this.currentQuestion.answers[child.index].toLowerCase()){
          if(this.currentCell){
            this.answer.setText(this.currentQuestion.answer);
            this.currentCell.addClass('disabled');
            this.currentCell = null;
          }
          this.correctPanel.removeClass('hidden');
          if(teamsPanel)
            teamsPanel.teams[teamsPanel.teamIndex].currentPoints += this.currentQuestion.points;
        } else {
          this.failPanel.removeClass('hidden');
          if(teamsPanel && JeopardyGrid.mode == 'solo')
            teamsPanel.teams[teamsPanel.teamIndex].currentPoints -= this.currentQuestion.points;
        }
        if(teamsPanel)
          teamsPanel.teams[teamsPanel.teamIndex].updatePoints();
        this.answerCover.addClass('hidden');
      });
    }
    //correct panel
    this.correctPanel = new Box().setText('Correct!');
    this.correctPanel.addClass('correct-panel');
    this.correctPanel.addInnerHtml('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/></svg>');
    this.correctPanel.addEventListener('click', e => {
        this.hide();
    });
    this.appendChild(this.correctPanel);
    
    //fail panel
    this.failPanel = new Box().setText('Incorrect!');
    this.failPanel.addClass('fail-panel');
    this.failPanel.addInnerHtml('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>');
    this.failPanel.addEventListener('click', e => {
        this.hide();
    });
    this.appendChild(this.failPanel);
    
    this.answer = new Box();
    this.answer.addClass('answer');
    
    this.answerCover = new Box();
    this.answerCover.addClass('answer-cover');
    this.answer.addEventListener('click', e => {
      if(!this.correctPanel.html.classList.contains('hidden') || !this.failPanel.html.classList.contains('hidden'))
        this.hide();
    });
    this.backdrop.addEventListener('click', e => {
      if(e.target.classList.contains('backdrop')){
        this.hide();
      }
    });
    this.answer.appendChild(this.answerCover);

    this.appendChild(this.question);
    this.appendChild(this.answers);
    this.appendChild(this.answer);
    JeopardyGrid.questionScreen = this;
  }
  show(){
    this.failPanel.addClass('hidden')
    this.correctPanel.addClass('hidden');
    this.backdrop.setStyle({
      display: 'flex',
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    });

    setTimeout(() => {
      this.removeClass('hidden');
      this.answerCover.removeClass('hidden');
    }, 50);
  }
  hide(){
    this.addClass('hidden');
    setTimeout(() => {
      this.backdrop.setStyle('display', 'none');
      JeopardyGrid.updateTurns();
    }, 300);
  }
  // question: question and answer props
  open(question){
    this.currentQuestion = question;
    this.question.setText(question.question);
    if(question.question.length > 300)
      this.question.setStyle('font-size', '3vmin');
    else if(question.question.length > 150)
      this.question.setStyle('font-size', '3.25vmin');
    else
      this.question.setStyle('font-size', '3.75vmin');
    if(JeopardyGrid.mode == 'solo')
      this.answer.setText(question.answer);
    else
      this.answer.setText('???');
    this.answer.appendChild(this.answerCover);
    let index = 0;
    let len = question.answers.length;
    this.answers.children.forEach(child => {
      if(index < len)
        child.setText(question.answers[index]);
      else
        child.setText('');
      index++;
    });
    this.show();
  }
}