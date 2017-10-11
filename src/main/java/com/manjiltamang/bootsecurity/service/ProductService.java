package com.manjiltamang.bootsecurity.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.manjiltamang.bootsecurity.model.Product;
import com.manjiltamang.bootsecurity.repository.ProductRepository;

@Service
@Transactional
public class ProductService {
	@Autowired
	private ProductRepository productRepository;
	
	public Page<Product> listAllByPage(Pageable pageable) {
		 return productRepository.findAll(pageable);
	}
	
	public List<Product> getAllByProductSubCategory(String productSubCategory){
		return productRepository.findByProductSubCategoryIgnoreCase(productSubCategory);
	}
	
	public List<Product> getAllByRange(double minValue, double maxValue, String subCategory){
		return productRepository.findByProductSubCategoryIgnoreCase(minValue, maxValue, subCategory);
	}
	
	public double getMaxPrice(){
		return productRepository.getMaxPrice();
	};
	
	public double getMinPrice(){
		return productRepository.getMinPrice();
	};
}
