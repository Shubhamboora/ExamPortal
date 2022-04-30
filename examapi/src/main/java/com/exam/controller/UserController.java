package com.exam.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.service.impl.UserServiceImpl;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

	@Autowired
	private UserServiceImpl userServiceimpl;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	//creating user
	@PostMapping("/")
	public User createUserHandler(@RequestBody User user) throws Exception {
		//Encoding password
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));
		Set<UserRole> roles = new HashSet<>();
		Role normal = new Role(666L,"NORMAL");
		UserRole role = new UserRole();
		role.setUser(user);
		role.setRole(normal);
		roles.add(role);
		
		this.userServiceimpl.createUser(user, roles);
		
		return user;
	}
	
	@GetMapping("/{username}")
	public User getUserHandler(@PathVariable("username") String username) {
		return this.userServiceimpl.getUserByUsername(username);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteUserHandler(@PathVariable("id")Long id) {
		try {
			this.userServiceimpl.deleteUser(id);
			return ResponseEntity.ok("User Deleted Successfully!!!");
		}catch(Exception exception) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
		}
		
		
	}
	
}
