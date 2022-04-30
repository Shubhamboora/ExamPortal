package com.exam.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.service.impl.QuestionServiceImpl;
import com.exam.service.impl.QuizServiceImpl;



@RestController
@RequestMapping("/question")
@CrossOrigin("*")
public class QuestionController {

	@Autowired
	private QuestionServiceImpl questionServiceImpl;
	
	@Autowired
	private QuizServiceImpl quizServiceImpl;
	
	@PostMapping("/")
	public ResponseEntity<Question> addQuestion(@RequestBody Question question){
		Question addQuestion = this.questionServiceImpl.addQuestion(question);
		return ResponseEntity.ok(addQuestion);
	}
	
	@PutMapping("/")
	public ResponseEntity<Question> updateQuestion(@RequestBody Question question){
		Question updateQuestion = this.questionServiceImpl.updateQuestion(question);
		return ResponseEntity.ok(updateQuestion);
	}
	
	@GetMapping("/quiz/{qid}")
	public ResponseEntity<List> getByQuiz(@PathVariable Long qid){
		Quiz quiz = this.quizServiceImpl.getQuiz(qid);
		Set<Question> questions = quiz.getQuestions();

		List<Question> list = new ArrayList(questions);
		
		Collections.shuffle(list);
		
		if(list.size()>Integer.parseInt(quiz.getNumberOfQuestions())) {
			list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions()+1));
		}
		
		list.forEach((q)->{
			q.setAnswer("");
		});
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("/quiz/all/{qid}")
	public ResponseEntity<?> getByQuizAdmin(@PathVariable Long qid){
		Quiz quiz = this.quizServiceImpl.getQuiz(qid);
		Set<Question> questions = quiz.getQuestions();

		
		return ResponseEntity.ok(questions);
	}
	
	//get single Question
	@GetMapping("/{quesId}")
	public ResponseEntity<Question> getSingleQuestion(@PathVariable("quesId") Long quesId) {
		Question question = this.questionServiceImpl.getQuestion(quesId);
		return ResponseEntity.ok(question);
	}
	
	//delete single Question
		@DeleteMapping("/{quesId}")
		public void deleteSingleQuestion(@PathVariable("quesId") Long quesId) {
			this.questionServiceImpl.deleteQuestion(quesId);
		}
		
		//Evaluate Quiz
		@PostMapping("/eval-quiz")
		public ResponseEntity<?> evalQuestion(@RequestBody List<Question> questions){
				double marksGot=0;
				int CorrectAnswers=0;
				int attempted=0;
			for(Question q:questions){
				Question question = this.questionServiceImpl.get(q.getQiesId());
				if(q.getGivenAnswer()==null) {
					q.setGivenAnswer("");
				}
				if(question.getAnswer().equals(q.getGivenAnswer())) {
					//correct
					CorrectAnswers++;
					double marksSingle = Double.parseDouble(questions.get(0).getQuiz().getMaxMarks())/questions.size();
					marksGot+=marksSingle;
				}
				if(!q.getGivenAnswer().equals("")) {
					attempted++;
				}
			}
			Map<String, Object> map =Map.of("marksGot",marksGot,"CorrectAnswers",CorrectAnswers,"attempted",attempted);
			return ResponseEntity.ok(map);
		}
}
