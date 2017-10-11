package com.manjiltamang.bootsecurity.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.manjiltamang.bootsecurity.model.User;
import com.manjiltamang.bootsecurity.service.UserService;

@Controller
public class DefaultController {
	@Autowired
	UserService userService;
	
	@RequestMapping(value={"/","home"})
    public String home(){
        return "home";
    }

	@RequestMapping(value="/welcome")
	public String welcome(){
	    return "welcome";
	}
	
	@RequestMapping(value="/admin")
	public String admin(@AuthenticationPrincipal org.springframework.security.core.userdetails.User activeUser){
		System.out.println(">>>>>>>>>>>>>>>> "+activeUser.getUsername());
	    return "admin";
	}
	
	@RequestMapping(value="/login")
	public String login(){
	    return "login";
	}
	
	@RequestMapping(value="/403")
	public String Error403(){
	    return "403";
	}
	
	@RequestMapping(value="/api")
	@ResponseBody
    public List<User> restTest(){
		 return userService.findAll();
    }
	
	
}
