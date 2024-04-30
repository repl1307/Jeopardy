
export class QuestionData {
  constructor(filePath){
    this.filePath = filePath;
    this.data = [];
    this.categories = [];
    this.rowCount = 0;
    this.columnCount = 0;
  }
  async getData(filePath){
    const res = await fetch(filePath, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/csv'
      }
    });
    const text = await res.text();
    const lines = text.split('\n').filter(line => line.length > 0);
//console.log(text);
    const questionTemplate = {
      question: null,
      answer: null,
      answers: [],
      points: 0
    }
    let question = structuredClone(questionTemplate);
    
    for(let i = 0; i < lines.length; i++){
      if(lines[i].includes('Q:')){
        if(i > 0){
          this.data.push(structuredClone(question));
          question = structuredClone(questionTemplate);
        }
        question.question = lines[i].replace('Q:', '').trim();
        continue;
      }
      if(!question.answer){
        question.answer = lines[i];
        continue;
      }
      question.answers.push(lines[i]);
    }
    this.data.push(structuredClone(question));
    //console.log(this.data);
  }
}