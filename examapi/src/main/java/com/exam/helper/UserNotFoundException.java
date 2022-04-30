package com.exam.helper;

public class UserNotFoundException extends Exception {

	public UserNotFoundException () {
		super("User with this username not found in our Database");
	}
	public UserNotFoundException(String msg) {super(msg);}
}
