import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qId:any;
  questions:any;
  marksGot=0;
  CorrectAnswers=0;
  attempted=0;
  isSubmit=false;
  timer:any;
  constructor(private locationSt:LocationStrategy, private _route:ActivatedRoute, private _questionService:QuestionService) { }

  ngOnInit(): void {
    this.priventBackButton();
    this.loadData();
  }

  loadData(){
    this.qId=this._route.snapshot.params['qid'];
    this._questionService.getQuestionForQuiz(this.qId).subscribe(
      (data:any)=>{
        this.questions=data;
        this.timer=this.questions.length*1*60;
        this.startTimer();
      },
      (error)=>{
        Swal.fire('Error !!', 'Error while Starting quiz. Please try after some time','error');
      }
    );
  }

  priventBackButton(){
    
    history.pushState(null, location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null, location.href);
    });
  }

  SubmitQuiz(){
    Swal.fire({
      title:'Sure, you want to submit the quiz',
      showCancelButton:true,
      confirmButtonText:'Submit',
      icon:'question',
    }).then((result)=>{
      if(result.isConfirmed){
        this.evalQuiz();
      }
    });

    
  }
  startTimer(){
    let t = window.setInterval(()=>{
      if(this.timer<=0){
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000)
  }

  getFormattedTime(){
    let mm=Math.floor(this.timer/60);
    let ss=this.timer- mm*60;
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz(){
    this._questionService.evalquestion(this.questions).subscribe(
      (data:any)=>{
        this.isSubmit=true;
        this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
        this.attempted=data.attempted;
        this.CorrectAnswers=data.CorrectAnswers;
      },
      (error)=>{
        console.log(error);
      });
    //this.isSubmit=true;
        // this.questions.forEach((q:any)=>{
        //   if(q.givenAnswer==q.answer){
        //     this.CorrectAnswers++;
        //     let marksPerQuestion=this.questions[0].quiz.maxMarks/this.questions.length;
        //     this.marksGot+=marksPerQuestion;
        //   }
        //   if(q.givenAnswer.trim()!=''){
        //     this.attempted++;
        //   }
        // });
  }

  printPage(){
    window.print();
  }
}
