package com.manjiltamang.bootsecurity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.manjiltamang.bootsecurity.model.Product;

public interface ProductRepository extends CrudRepository<Product, Long>, PagingAndSortingRepository<Product, Long>{
	List<Product> findByProductSubCategoryIgnoreCase(String productSubCategory);
	
	@Query("FROM Product WHERE productPrice BETWEEN :minValue AND :maxValue AND productSubCategory = :productSubCategory")
	List<Product> findByProductSubCategoryIgnoreCase(@Param("minValue") double minValue, @Param("maxValue") double maxValue,@Param("productSubCategory")  String productSubCategory);
	
	@Query("SELECT MAX(productPrice) FROM Product")
	double getMaxPrice();
	
	@Query("SELECT MIN(productPrice) FROM Product")
	double getMinPrice();
	
	@Query("SELECT productManufacturer FROM Product where productSubCategory = :productSubCategory GROUP BY productManufacturer")
	List<Product> getBrands(@Param("productSubCategory")  String productSubCategory);
	
	List<Product> findByProductManufacturerAndProductSubCategory(String productManufacturer, String subCategory);
	
	@Query("From Product where productSubCategory = :productSubCategory AND productManufacturer = :productManufacturer AND productPrice BETWEEN :minValue AND :maxValue")
	List<Product> listByManufacturerAndProductPriceRange(@Param("minValue") double minValue, @Param("maxValue") double maxValue,@Param("productSubCategory") String productSubCategory, @Param("productManufacturer") String productManufacturer);
}
