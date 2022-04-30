import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  public getQuestionsOfQuiz(qid:any){
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  public addQuestion(question:any){
    return this._http.post(`${baseUrl}/question/`, question);
  }

  public getQuestionsById(qid:any){
    return this._http.get(`${baseUrl}/question/${qid}`);
  }
  public updateQuestion(question:any){
    return this._http.put(`${baseUrl}/question/`, question);
  }

  public deleteQuestion(quesId:any){
    return this._http.delete(`${baseUrl}/question/${quesId}`)
  }

  public getQuestionForQuiz(qId:any){
    return this._http.get(`${baseUrl}/question/quiz/${qId}`)
  }

  public evalquestion(questions:any){
    return this._http.post(`${baseUrl}/question/eval-quiz/`, questions);
  }
}
