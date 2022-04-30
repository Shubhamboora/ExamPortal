import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  catId:any;
  quizzes=[];
  constructor(private _route:ActivatedRoute, private _navigate:Router, private _quizService:QuizService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this._route.params.subscribe((params)=>{
    this.catId= this._route.snapshot.params['catId'];
    if(this.catId==0){
      this._quizService.getActiveQuizzes().subscribe(
        (data:any)=>{
          this.quizzes=data;

        },
        (error)=>{
          console.log(error);
          Swal.fire('Error !!','Not able to load data...','error');
        }
      );
       
    }else {
      this._quizService.getActiveQuizByCategory(this.catId).subscribe(
        (data:any)=>{
          this.quizzes=data;

        },
        (error)=>{
          console.log(error);
          Swal.fire('Error !!','Not able to load data...','error');
        }
      );
      
    }
  });
    
  }
}
