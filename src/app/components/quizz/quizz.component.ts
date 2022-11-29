import { Component, OnInit, Type } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_question.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  title:string = ""
  questions:any
  questionSelected:any
  answers:string[] = []
  answerSelected:string= ""
  questionIdex:number = 0
  questionMaxIdex:number = 0
  finished:boolean = false

  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false
      this.title  = quizz_questions.title
      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIdex]
      this.questionIdex = 0
      this.questionMaxIdex = this.questions.length
    }
  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIdex+=1

    if(this.questionMaxIdex > this.questionIdex){
      this.questionSelected = this.questions[this.questionIdex]
    }else{
      const finalAnswer:string = await this.chekResult(this.answers)
      this.finished = true
      //verificar opção de resposta
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
    }
  }

  async chekResult(answers:string[]){
    const result = answers.reduce((previous, current, i, arr)=>{
      if(arr.filter(item => item === previous).length > arr.filter(item => item === previous).length){
        return previous
      }else{
        return current
      }
    })

    return result
  }

}
