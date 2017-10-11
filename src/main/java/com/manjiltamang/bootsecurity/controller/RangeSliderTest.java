package com.manjiltamang.bootsecurity.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.manjiltamang.bootsecurity.model.Product;
import com.manjiltamang.bootsecurity.service.ProductService;

@Controller
public class RangeSliderTest {
	@Autowired
	ProductService productService;
	
	@GetMapping("/range_slider")
	public String rangeSliderDemo(Model model){
		model.addAttribute("maxPrice", productService.getMaxPrice());
		model.addAttribute("minPrice", productService.getMinPrice());
		return "rangeSlider";
	}
	
	@GetMapping("/range_slider/api")
	@ResponseBody
	public List<Product> rangeSliderApi(){
		return productService.getAllByProductSubCategory("jeans");
	}
	
	@GetMapping("/range_slider/range/api")
	@ResponseBody
	public List<Product> rangeSliderMinMaxApi(HttpServletRequest request){
		String minPriceString = request.getParameter("minPrice");
		String maxPriceString = request.getParameter("maxPrice");
		
		// If min and max value are present in url params
		if(minPriceString != null && !minPriceString.isEmpty() && maxPriceString != null && !maxPriceString.isEmpty()){
			int minPrice = Integer.parseInt(minPriceString);
			int maxPrice = Integer.parseInt(maxPriceString);
			return productService.getAllByRange(minPrice, maxPrice, "jeans");
		}
		return productService.getAllByProductSubCategory("jeans");
	}
}
