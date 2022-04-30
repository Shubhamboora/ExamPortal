package com.exam.service;

import java.util.Set;

import com.exam.helper.UserNotFoundException;
import com.exam.model.User;
import com.exam.model.UserRole;

public interface UserService {

	//creating user
	public User createUser(User user, Set<UserRole> userRoles) throws Exception;
	
	//get user by userName
	public User getUserByUsername(String username) throws UserNotFoundException;
	
	//delete user by id
	public void deleteUser(Long id);
}
