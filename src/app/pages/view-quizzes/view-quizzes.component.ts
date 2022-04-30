import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes=[];
  constructor(private service:QuizService) { }

  ngOnInit(): void {
    this.loaddata();
  }

  public loaddata(){
    this.service.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !!','Not able to load data...','error');
      }
    );
  }
//Delete quiz
  deleteQuiz(qId:string){
    Swal.fire({
      icon:'question',
      title:"Are you sure ?",
      confirmButtonText:'Delete',
      showCancelButton: true,
    }).then((result)=>{
      if(result.isConfirmed){
        this.service.deleteQuiz(qId).subscribe(
          (data:any)=>{
            this.quizzes=this.quizzes.filter((quiz:any)=>quiz.qId!=qId);
            Swal.fire('Deleted!!','Quiz deleted successfuly', 'success');
          },
          (error)=>{
            Swal.fire('Error !!','Server Error', 'error');
            console.log(error);
          }
        );
      }
    })
  }
}
