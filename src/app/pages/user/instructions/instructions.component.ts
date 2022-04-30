import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  qId:any;
  quiz:any;
  constructor(private _route:ActivatedRoute, private _quizService:QuizService,private router:Router) { }

  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    this.loadData();
  }

  loadData(){
    this._quizService.getQuiz(this.qId).subscribe(
      (data:any)=>{
        this.quiz=data;

      },
      (error)=>{
        Swal.fire('Error !!','Error while loading quiz','error');
      }
    );
  }

  startQuiz(){
    Swal.fire({
      title:'Do you want to start the quiz',
      showCancelButton:true,
      confirmButtonText:'Start',
      icon:'question',
    }).then((result)=>{
      if(result.isConfirmed){
        this,this.router.navigate(['/start/'+this.qId]);
      }
    });
  }
}
