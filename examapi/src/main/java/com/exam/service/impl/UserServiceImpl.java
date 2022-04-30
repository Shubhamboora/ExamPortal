package com.exam.service.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.repo.RoleRepository;
import com.exam.repo.UserRepository;
import com.exam.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;

	//Creating user
	@Override
	public User createUser(User user, Set<UserRole> userRoles) throws Exception {
		User local = this.userRepository.findByUsername(user.getUsername());
		if(local != null) {
			System.out.println("User is already there !!!");
			throw new Exception("User already present");
		}else {
			for(UserRole ur: userRoles) {
				this.roleRepository.save(ur.getRole());
			}
			
			user.getUserRoles().addAll(userRoles);
			user.setProfile("default.png");
			local = this.userRepository.save(user);
		}
		return local;
	}

	//getting user by username
	@Override
	public User getUserByUsername(String username) {
		
		return this.userRepository.findByUsername(username);
	}

	@Override
	public void deleteUser(Long id) {
		this.userRepository.deleteById(id);
	}

}