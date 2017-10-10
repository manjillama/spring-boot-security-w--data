package com.manjiltamang.bootsecurity.service;

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
}
