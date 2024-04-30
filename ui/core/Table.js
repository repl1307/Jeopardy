import UI from '../Ui.js';

//table
export class Table extends UI {
  constructor(){
    super('table');
    this.rows = [];
    this.columns = [];
    this.addClass('table');
  }
  //content is either string or elem to be added to table
  addRow(content=[], type='td'){
    const row = new TableRow(this, content, type);
    this.appendChild(row);
    this.rows.push(row);
    
    //append to columns
    while(this.columns.length < content.length)
      this.columns.push([])
    for(let i=0; i < content.length; i++){
      this.columns[i].push(content[i]);
    }
  }
  removeRow(row){
    for(const cell of row){
      row.removeChild(cell);
    }
    this.removeChild(row);
  }
}

//table row
export class TableRow extends UI {
  constructor(table, content, type='td'){
    super('tr');
    this.cells = [];
    this.table = table;
    for(const c of content){
      if(c instanceof TableCell)
        this.cells.push(c);
      else
        this.cells.push(new TableCell(this, c, type));
      const cell = this.cells[this.cells.length-1];
      cell.setAttribute('colSpan', cell.colspan);
      cell.setAttribute('rowSpan', cell.rowspan);
      this.appendChild(this.cells.at(-1));
    }
  }
}

//table cell
export class TableCell extends UI {
  constructor(row, content='', type='td'){
    super(type);
    this.row = row;
    this.content = content;
    this.type = type;
    this.colspan = 1;
    this.rowspan = 1;
    
    if(typeof content != 'object')
      this.setText(content);
    else
      console.warn(`Content is not a string`);
  }
  setColumns(count){
    const cells = [];
    for(const cell of this.row.cells){
      const newCell = new TableCell(this.row, cell.content, cell.type)
      if(cell == this)
        newCell.colspan = count;
    }
    const table = this.row.table;
    const newRow = new TableRow(this.row.table, [], this.type);
    for(const c of cells){
      newRow.cells.push(c);
      newRow.appendChild(c);
    }
    table.appendChild(newRow);
    table.removeChild(this.row);
  }
}