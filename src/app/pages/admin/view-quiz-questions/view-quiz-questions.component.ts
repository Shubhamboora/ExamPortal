import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId:any;
  qTitle:any;
  questions=[];
  constructor(private _route:ActivatedRoute, private _questionService:QuestionService) { }

  ngOnInit(): void {
    this.loadDate();
    
  }

  loadDate(){
    this.qId=this._route.snapshot.params['qid'];
    this.qTitle=this._route.snapshot.params['title'];
    this._questionService.getQuestionsOfQuiz(this.qId).subscribe((data:any)=>{this.questions=data;},(error)=>{console.log(error);Swal.fire('Error !!','Error while loading questions','error');});
  }

  DeleteQuestion(qid:any){
    Swal.fire({
      icon:'question',
      showConfirmButton:true,
      confirmButtonText:'Delete',
      title:'Sure, You want to delete question',
    }).then((result)=>{
      if(result.isConfirmed){
        this._questionService.deleteQuestion(qid).subscribe(
          (data:any)=>{

            this.questions=this.questions.filter((q:any)=>q.qiesId != qid);
            Swal.fire('Deleted !!','Question deleted successfuly','success');

          },
          (error)=>{
            Swal.fire('Error !!','error while deleting','error');
          });
      }
    });
    

  }

}
