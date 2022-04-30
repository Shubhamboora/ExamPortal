package com.exam.controller;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.exam.model.exam.Category;
import com.exam.service.impl.CategoryServiceImpl;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {

	@Autowired
	private CategoryServiceImpl categoryServiceImpl;
	
	//Adding single category
	@PostMapping("/")
	public ResponseEntity<?> addCategory(@RequestBody Category category){
		Category addCategory = this.categoryServiceImpl.addCategory(category);
		return ResponseEntity.ok(addCategory);
	}
	
	//getting single category
	@GetMapping("/{categoryId}")
	public ResponseEntity<Category> getCategory(@PathVariable("categoryId") Long categoryId) {
		Category category = this.categoryServiceImpl.getCategory(categoryId);
		return ResponseEntity.ok(category);
	}
	
	//getting all categories
		@GetMapping("/")
		public ResponseEntity<?> getCategories() {
			Set<Category> category = this.categoryServiceImpl.getCategories();
			return ResponseEntity.ok(category);
		}
		
	//Update particular category
		@PutMapping("/")
		public ResponseEntity<Category> updateCategory(@RequestBody Category category){
			Category updateCategory = this.categoryServiceImpl.updateCategory(category);
			return ResponseEntity.ok(updateCategory);
		}
		
		//Delete particular Category
		@DeleteMapping("/{categoryId}")
		public void deleteCategory(@PathVariable("categoryId") Long categoryId) {
			this.categoryServiceImpl.deleteCategory(categoryId);
		}
		
		
		
}
