package com.exam.controller;

import java.util.List;
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

import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;
import com.exam.service.impl.QuizServiceImpl;

@RestController
@RequestMapping("/quiz")
@CrossOrigin("*")
public class QuizController {

	@Autowired
	private QuizServiceImpl quizServiceImpl;
	
	//add particular quiz

		@PostMapping("/")
		public ResponseEntity<Quiz> addQuiz(@RequestBody Quiz quiz){
			Quiz addQuiz = this.quizServiceImpl.addQuiz(quiz);
			return ResponseEntity.ok(addQuiz);
		}
		
		//getting single category
		@GetMapping("/{qId}")
		public ResponseEntity<Quiz> getQuiz(@PathVariable("qId") Long qId) {
			Quiz quiz = this.quizServiceImpl.getQuiz(qId);
			return ResponseEntity.ok(quiz);
		}
		
		//getting all quizzes
			@GetMapping("/")
			public ResponseEntity<?> getQuizzes() {
				Set<Quiz> quizzes = this.quizServiceImpl.getQuizzes();
				return ResponseEntity.ok(quizzes);
			}
			
		//Update particular Quiz
			@PutMapping("/")
			public ResponseEntity<Quiz> updateQuiz(@RequestBody Quiz quiz){
				Quiz updateQuiz = this.quizServiceImpl.updateQuiz(quiz);
				return ResponseEntity.ok(updateQuiz);
			}
			
			//Delete particular Category
			@DeleteMapping("/{qId}")
			public void deleteCategory(@PathVariable("qId") Long qId) {
				this.quizServiceImpl.deleteQuiz(qId);
			}
			
			//getting quiz by category
			@GetMapping("/category/{Id}")
			public ResponseEntity<?> getCategoryQuiz(@PathVariable("Id") Long Id) {
				List<Quiz> quizzesByCategory = this.quizServiceImpl.getQuizzesByCategory(Id);
				return ResponseEntity.ok(quizzesByCategory);
			}
			
			//getting active quiz by category
			@GetMapping("/category/active/{Id}")
			public ResponseEntity<?> getActiveCategoryQuiz(@PathVariable("Id") Long Id) {
				Category category = new Category();
				category.setId(Id);
				List<Quiz> quizzesByCategory = this.quizServiceImpl.getActiveQuizzesOfCategory(category);
				return ResponseEntity.ok(quizzesByCategory);
			}
			
			//get all active quizzes
			@GetMapping("/active")
			public ResponseEntity<List<Quiz>> getActiveQuizzes(){
				List<Quiz> activeQuizzes = this.quizServiceImpl.getActiveQuizzes();
				return ResponseEntity.ok(activeQuizzes);
			}
}
