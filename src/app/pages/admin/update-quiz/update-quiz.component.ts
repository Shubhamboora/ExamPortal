import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  
  constructor(private router:Router,private snack:MatSnackBar , private _rout:ActivatedRoute, private quizService:QuizService,private categoryService:CategoryService) { }

  qId=null;
  quiz:any;
  categories:any;


  ngOnInit(): void {
    this.qId=this._rout.snapshot.params['qid'];
    this.loadData();
  }

  loadData(){
    this.quizService.getQuiz(this.qId).subscribe((data:any)=>{this.quiz=data},(error)=>{console.log(error);Swal.fire('Error !!','Error while loading quiz details','error');});
    this.categoryService.categories().subscribe((data:any)=>{this.categories=data},(error)=>{console.log(error);Swal.fire('Error !!','Error while loading categories details','error');});
  }
  submit(){
    if(
        (this.quiz.title.trim()=='' || this.quiz.title.trim()==null)
     || (this.quiz.description.trim()=='' || this.quiz.description.trim()==null)
     || (this.quiz.maxMarks.trim()=='' || this.quiz.maxMarks.trim()==null)
     || (this.quiz.numberOfQuestions.trim()=='' || this.quiz.numberOfQuestions.trim()==null) || this.quiz.category.id==null)
     {
        this.snack.open('All Fields Are Mandatory','',{duration:3000});
        return;
       }
    
    this.quizService.updateQuiz(this.quiz).subscribe((data:any)=>{
      Swal.fire('Success','Quiz updated successfuly','success').then((e)=>{
        this.router.navigate(['/admin/quizzes']);
      });
    },
    (error)=>{
      Swal.fire('Error !!','Server error','error');
      console.log(error);
    });
  }

}
