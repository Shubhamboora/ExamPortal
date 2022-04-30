import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {
  public Editor = ClassicEditor;
  quesId:any;
  qTitle:any;
  quizId:any;
  question:any={
    quiz:{
      qId:''
    },
    image:'',
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:''
    
  };
  constructor(private _questionService:QuestionService, private _route:ActivatedRoute, private _snack:MatSnackBar, private _navigate:Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.quesId=this._route.snapshot.params['quesId'];
    this.qTitle=this._route.snapshot.params['title'];
    
    this._questionService.getQuestionsById(this.quesId).subscribe(
      (data:any)=>{
        this.question=data;
        this.quizId=data.quiz['qId'];
      },(error)=>{
        Swal.fire('Error !!','Error while loading question','error');
        console.log(error);
      });
    
  }
  
  submit(){
    if(this.emptyCheck(this.question)){
      this._questionService.updateQuestion(this.question).subscribe((data:any)=>{this._navigate.navigate(['/admin/view-questions/'+this.quizId
      +'/'+this.qTitle]);},(error)=>{console.log(error);Swal.fire('Error !!','Error while Updating question','error');});
    }
  }

  emptyCheck(data:any){
    if(data.content.trim()=='' ||data.content.trim()==null){
      this._snack.open('Question field is empty','',{duration:3000});
      return false;
    }else if(data.option1.trim()=='' ||data.option1.trim()==null){
      this._snack.open('option 1 field is empty','',{duration:3000});
      return false;
    }else if(data.option2.trim()=='' ||data.option2.trim()==null){
      this._snack.open('option 2 field is empty','',{duration:3000});
      return false;
    }
    else if(data.option3.trim()=='' ||data.option3.trim()==null){
      this._snack.open('option 3 field is empty','',{duration:3000});
      return false;
    }
    else if(data.option4.trim()=='' ||data.option4.trim()==null){
      this._snack.open('option 4 field is empty','',{duration:3000});
      return false;
    }
    else if(data.answer.trim()=='' ||data.answer.trim()==null){
      this._snack.open('answer field is empty','',{duration:3000});
      return false;
    }
    else if(data.quiz.qId=='' ||data.quiz.qId==null){
      this._snack.open('Can not map with Quiz','',{duration:3000});
      return false;
    }
    return true;
  }
}
