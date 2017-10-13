package com.manjiltamang.bootsecurity.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.manjiltamang.bootsecurity.model.Product;
import com.manjiltamang.bootsecurity.service.ProductService;

/*
 * Sorting and Filter Using AngularJs
 * Skip if you are anyone except Manjil Tamang
 */
@Controller
public class AngularSortTest {
	@Autowired
	ProductService productService;
	
	@GetMapping("/filter/angular")
	public String angularSort(){
		return "angularSortList";
	}
	
	@GetMapping("/filter/angular/api")
	@ResponseBody
	public List<Product> angularSortApi(){
		return productService.getAllByProductSubCategory("jeans");
	}
}
