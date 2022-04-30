import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories=[];
  quiz={
    title:"",
    description:"",
    maxMarks:"",
    numberOfQuestions:"",
    active:false,
    category:{
      id:null,
    },
  };
  constructor(private categoryService:CategoryService, private snack:MatSnackBar, private quizService:QuizService) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.categoryService.categories().subscribe(
      (data:any)=>{
        this.categories=data;
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !!','error while loading categories...','error');
      }
    );
  }

  public submit(){
    if(
        (this.quiz.title.trim()=='' || this.quiz.title.trim()==null)
     || (this.quiz.description.trim()=='' || this.quiz.description.trim()==null)
     || (this.quiz.maxMarks.trim()=='' || this.quiz.maxMarks.trim()==null)
     || (this.quiz.numberOfQuestions.trim()=='' || this.quiz.numberOfQuestions.trim()==null) || this.quiz.category.id==null)
     {
        this.snack.open('All Fields Are Mandatory','',{duration:3000});
        return;
       }
    
    this.quizService.addQuiz(this.quiz).subscribe((data:any)=>{
      Swal.fire('Success','Quiz added Successfuly','success');
      this.clearingData();
    },
    (error)=>{
      Swal.fire('Error !!','Server error','error');
      console.log(error);
    });
  }

  public clearingData(){
    this.quiz={
      title:"",
      description:"",
      maxMarks:"",
      numberOfQuestions:"",
      active:false,
      category:{
        id:null,
      },
    };
  }

}
