package com.manjiltamang.bootsecurity.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import com.manjiltamang.bootsecurity.model.Product;
import com.manjiltamang.bootsecurity.service.ProductService;

@Controller
public class RestSearchController {
	@Autowired
	ProductService productService;
	
	@GetMapping("products/{subCategory}/api")
	@ResponseBody
	public List<Product> productSubCateApi(@PathVariable String subCategory,HttpServletRequest request){
		String minPrice = request.getParameter("minPrice");
		String maxPrice = request.getParameter("maxPrice");
		String brand = request.getParameter("brand");
		
		// If all three parameters are present
		if(minPrice !=null && !minPrice.isEmpty() && maxPrice !=null && !maxPrice.isEmpty() && brand !=null && !brand.isEmpty()){
			return productService.listByManufacturerAndProductPriceRange(Double.parseDouble(minPrice), Double.parseDouble(maxPrice), subCategory, brand);
		}
		// If only price parameter is present
		else if(minPrice !=null && !minPrice.isEmpty() && maxPrice !=null && !maxPrice.isEmpty() && brand == null){	
			return productService.getAllByRange(Double.parseDouble(minPrice), Double.parseDouble(maxPrice), subCategory);
		}
		// If only brand is present
		else if(minPrice == null && maxPrice == null && brand != null && !brand.isEmpty()){
			return productService.listByProductmanufacturer(brand, subCategory);
		}else{
			return productService.getAllByProductSubCategory(subCategory);
		}
	}
	
	@GetMapping("products/{subCategory}")
	public String productSubCate(@PathVariable String subCategory, Model model){
		model.addAttribute("query", subCategory);
		return "productList";
	}
	
	@GetMapping("api/get_brands/{subCategory}")
	@ResponseBody
	public List<Product> getAllBrands(@PathVariable String subCategory){
		return productService.getAllBrands(subCategory);
	}
}
