package com.exam;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.service.UserService;

@SpringBootApplication
public class ExamapiApplication implements CommandLineRunner {
	
//	@Autowired
//	private UserService userService;
//	@Autowired
//	private BCryptPasswordEncoder Bencode;

	public static void main(String[] args) {
		SpringApplication.run(ExamapiApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
//		System.out.println("Starting code");
//		String password = this.Bencode.encode("1111");
//		User user = new User("S.Boora",password,"Shubham","Boora","Shubhamboora10@gmail.com","9467043683",true,"default.png");
//		Role admin = new Role(777L,"ADMIN");
//		
//		Set<UserRole> userRoleSet = new HashSet<>();
//		UserRole userRole = new UserRole();
//		userRole.setUser(user);
//		userRole.setRole(admin);
//		userRoleSet.add(userRole);
//		
//		User adminUser = this.userService.createUser(user, userRoleSet);
//		System.out.println(adminUser.getUsername());
	}

}
