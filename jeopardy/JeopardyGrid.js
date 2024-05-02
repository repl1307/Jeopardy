import Box from '../ui/core/Box.js';

export class JeopardyGrid extends Box {
  static questionScreen;
  static teamsPanel;
  static mode; //teams or solo
  static transition(grid){
    const overlay = new Box().addClass('grid-overlay');
    grid.appendChild(overlay);
    requestAnimationFrame(() => {
      setTimeout(() => {
        overlay.addClass('hidden');
      }, 500);
    });
  }
  constructor(rowCount, columnCount, questions=null){
    super();
    JeopardyGrid.transition(this);
    this.addClass('grid');
    this.rows = [];
    this.cells = [];
    this.categoryCells = [];
    this.pointCells = [];
    this.questions = questions;
    this.questionScreen = null;
    let questionCount = 0;
    
    for(let i = 0; i < rowCount+1; i++){
      const row = new Box();
      row.addClass('row');

      for(let j = 0; j < columnCount+1; j++){
        const cell = new Box().center().addClass('cell');
        let isQuestionCell = true;
        //categories rows
        if(i == 0){
          if(j > 0)
            this.categoryCells.push(cell);
          cell.addClass('disabled');
          isQuestionCell = false;
        }
        //points column
        if(j == 0){
          if(i > 0){
            this.pointCells.push(cell);
            cell.setText(((rowCount-i+1)*100)+' points');
            cell.points = (rowCount -i+1)*100;
          }
          cell.addClass('disabled');
          isQuestionCell = false;
        }

        if(isQuestionCell){
          let index = questionCount;

          this.questions[index].points = (rowCount-i+1)*100;
          cell.addEventListener('click', e => {
            console.log(index);
            if(JeopardyGrid.mode == 'solo')
              cell.addClass('disabled');
            else if(JeopardyGrid.mode == 'teams')
              JeopardyGrid.questionScreen.currentCell = cell;
            this.questions[index].points = row.points? row.points : 200;
            JeopardyGrid.questionScreen.open(this.questions[index]);
          });
          questionCount++;
        }
        row.appendChild(cell);
        this.cells.push(cell);
      }
      this.appendChild(row);
      this.rows.push(row);
    }
  }
  setCategories(categories){
    if(categories == null){
      this.rows[0].setStyle('flex', 0);
      return;
    }
    for(let i = 0; i < this.categoryCells.length; i++)
      this.categoryCells[i].setText(categories[i]);
  }
  setPointsColumn(values){
    console.log('setting points');
    //i is 1 to exclude categories row
    for(let i = 0; i < this.pointCells.length; i++){
      this.pointCells[i].setText(values[i]+' points');
      this.rows[i+1].points = values[i];
      console.log(this.rows[i])
    }
  }
  static updateTurns(){
    if(!JeopardyGrid.teamsPanel) return;
    JeopardyGrid.teamsPanel.teamIndex++;
    if(JeopardyGrid.teamsPanel.teamIndex > JeopardyGrid.teamsPanel.teams.length-1)
      JeopardyGrid.teamsPanel.teamIndex = 0;
    JeopardyGrid.teamsPanel.select(JeopardyGrid.teamsPanel.teamIndex);
  }
}