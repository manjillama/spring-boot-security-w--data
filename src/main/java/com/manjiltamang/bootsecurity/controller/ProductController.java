package com.manjiltamang.bootsecurity.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.manjiltamang.bootsecurity.model.Product;
import com.manjiltamang.bootsecurity.service.ProductService;

@Controller
public class ProductController {
	@Autowired
	ProductService productService;
	
	@GetMapping("/api/products/api/pageable")
	@ResponseBody
	public Page<Product> getPageableApi(Pageable pageable){
		return productService.listAllByPage(pageable);
	}
	
	@GetMapping("/api/products/pageable")
	public String getPageableList(Pageable pageable, Model model){
		Page<Product> productList =  productService.listAllByPage(pageable);
		int totalPages = productList.getTotalPages();
		Long totalProducts = productList.getTotalElements();
		int size = productList.getNumberOfElements();
		int currentPage = productList.getNumber()+1;	//Starts with index 0, hence +1
		
		List<Product> products = productList.getContent();
		
		model.addAttribute("totalPages", totalPages);
		model.addAttribute("size", size);
		model.addAttribute("currentPage", currentPage);
		model.addAttribute("products", products);
		model.addAttribute("totalProducts", totalProducts);
		return "pageableProductList";
	}
}
