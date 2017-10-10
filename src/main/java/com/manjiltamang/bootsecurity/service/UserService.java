package com.manjiltamang.bootsecurity.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manjiltamang.bootsecurity.model.User;
import com.manjiltamang.bootsecurity.repository.UserRepository;

@Service
@Transactional
public class UserService {
	@Autowired
	UserRepository userRepository;
	
	public List<User> findAll(){
		List<User> users = new ArrayList<User>();
		for(User user: userRepository.findAll()){
			users.add(user);
		}
		return users;
	}
}
