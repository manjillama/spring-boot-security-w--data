var paginate = angular.module('angularPanigate', ['ui.bootstrap','ngRoute']);

// Change URL on paginate
paginate.config(function($routeProvider) {
	  $routeProvider
	    .when('/:currentPage', {
	    })
	});
paginate.controller('productPaginateCtrl', ['$scope','$location','$routeParams','$http','$filter',function($scope,$location,$routeParams,$http,$filter) {
	//default sort option
	$scope.selectedOrder = 'featured';
	var subCategory = $('.productlist-view').attr("data-attr-query");
	var url = $location.url();
	// Api resource url
	var jsonUrl = '/products/'+subCategory+'/api';	
	
	//Read Json Url Params
	var parseQueryString = function(url) {
		  var urlParams = {};
		  url.replace(
		    new RegExp("([^?=&]+)(=([^&]*))?", "g"),
		    function($0, $1, $2, $3) {
		      urlParams[$1] = $3;
		    }
		  );
		  return urlParams;
	}
	
	function getAllSubCategory(){
		/*
		 * Filter by Brands
		 */
		$http.get("http://localhost:8080/api/get_brands/jeans")
	    .then(function (response) {
	    	$scope.brands = response.data;
	    	$scope.checkboxModel = {
 		       value2 : ''
	    	};
	    	$scope.filterByBrand = function(){
	    		// If brand checkbox is checked
	    		if($scope.checkboxModel.value2.length > 0){
	    			 // If url params is already present
		  	    	  if(~jsonUrl.indexOf('?')){
		  	    		 //Checking if Brand Parameter is already present
		  	    		  if(parseQueryString(jsonUrl).brand){
		  	    			// Do nothing
		  	    		  }else{
		  	    			console.log("Not present");
		  	    			jsonUrl += "&";
		  	    		  }
		  	    		 
		  	    		 // If brand is alreadt present
				    	  if(~jsonUrl.indexOf('brand')){
				    		  jsonUrl = jsonUrl.replace(/(brand=)[^\&]+/,'brand='+$scope.checkboxModel.value2);	//new brand name
				    		  sortAndPaginate();
				    	  }else{
				    		  jsonUrl+= 'brand='+$scope.checkboxModel.value2;	//if brand is not yet present
				    		  sortAndPaginate();
				    	  }
		  	  		  }else{
		  	  			jsonUrl += "?";		//If no url params are present yet
		  	  			jsonUrl+= 'brand='+$scope.checkboxModel.value2;	//if brand is not yet present
			  	  		sortAndPaginate();
		  	  		  }		
		  	    	  console.log(jsonUrl);
	    		}else{
	    			//console.log("Unchecked");
	    			jsonUrl = jsonUrl.replace(/(brand=)[^\&]+/,'');	//new brand name
		    		sortAndPaginate();
	    		}
	    		// Reset to page one
			  	$scope.currentPage = 1;
	    	};
	    	
	    });
	}
	getAllSubCategory();
	
	
	
	/*
	 * Sorting product page 
	 */ 
	  $scope.sortBy = function (selectedOrder) {
		 console.log(selectedOrder);
		 if(selectedOrder === 'priceHigh'){
			 $scope.data = $filter('orderBy')($scope.data, 'productPrice', true);
		 }else if(selectedOrder === 'priceLow'){
			 $scope.data = $filter('orderBy')($scope.data, 'productPrice', false);
		 }else if(selectedOrder === 'featured'){
			 $scope.data = $filter('orderBy')($scope.data, 'productId', true);
		 }
		 
		// Reset to page one
		$scope.currentPage = 1;
	  };
	  
	  
	
	/*
	 * filter By Price Range
	 */ 
	$( "#price-range" ).slider({
	      range: true,
	      min: 0,
	      max: 4000,
	      values: [ 0, 4000 ],
	      slide: function( event, ui ) {
	        $( "#priceAmount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
	      },
	      stop: function(event, ui){
	    	  // If url params is already present
	    	  if(~jsonUrl.indexOf('?')){
	    		//Checking if min max Parameter is already present
  	    		  if(parseQueryString(jsonUrl).minPrice){
  	    			  // Do nothing
  	    		  }else{
  	    			jsonUrl += "&";
  	    		  }
	    		  // If minPrice and maxPrice are already present then replace values
	    		  if(~jsonUrl.indexOf('minPrice') && ~jsonUrl.indexOf('maxPrice')){
				      jsonUrl = jsonUrl.replace(/(minPrice=)[^\&]+/,'minPrice='+ui.values[ 0 ]);	//new min price
				      jsonUrl = jsonUrl.replace(/(maxPrice=)[^\&]+/,'maxPrice='+ui.values[ 1 ]);	//new max price
				      console.log(jsonUrl);
				      sortAndPaginate();
		    	  }else{	//if minPrice and maxPrice are not yet present
		    		  jsonUrl = jsonUrl + 'minPrice='+ui.values[ 0 ] +'&maxPrice='+ui.values[ 1 ];	
		    		  console.log(jsonUrl);
				      sortAndPaginate();
		    	  }
	  		  }else{		//If no url params are present yet
	  			  jsonUrl += "?";	
	  			  jsonUrl += 'minPrice='+ui.values[ 0 ] +'&maxPrice='+ui.values[ 1 ];	//if minPrice and maxPrice are not yet present
	    		  console.log(jsonUrl);
			      sortAndPaginate();
	  		  }	
	    	// Reset to page one
		  	$scope.currentPage = 1;
		  }
	    });
		
		// Initial Price Amount View
	    $( "#priceAmount" ).val( "$" + $( "#price-range" ).slider( "values", 0 ) +
	      " - $" + $( "#price-range" ).slider( "values", 1 ) );
	
	    
	/*
	 * Initally invoked by controller
	 * Main job is to call itself by fetching respective api data.
	 * called by sortBy() function each time a sorting is done.
	 */
	function sortAndPaginate(){
		// Page Scroll to the top when paginated
		$scope.scrollTop = function() {
			$('body,html').animate({
			    scrollTop: 0
			}, 600);
		};
		
		$http.get(jsonUrl)
	    .then(function (response) {
	  	  $scope.data = response.data;
	  	  //console.log($scope.data);
	  	  
	  	  // Item per page
	  	  $scope.viewBy = 20;
	  	  // total product length
	  	  $scope.totalItems = $scope.data.length;
	  	  // Initially rendered page
	  	  $scope.currentPage = $routeParams.currentPage || 1;
	  	  // Item per page
	  	  $scope.itemsPerPage = $scope.viewBy;
	  	  //Maximum number of page buttons to show
	  	  $scope.maxSize = 5; 
	  	 	  	  	  	
	  	 $scope.resetPageNumber = function(){
	  		 $scope.currentPage = 1; 
	  	 }
	  	 
	  	 $scope.setItemsPerPage = function(num) {
	  		 $scope.itemsPerPage = num;
	  		//After setting itemPage , resets to first page
	  		 $scope.currentPage = 1; 
	  	 }
	  	 
	  	 // Watch currentPage url param and change it to value
	  	 $scope.$watch("currentPage",function(value){
	  	    if (value){
	  	      $location.path("/" + value);
	  	    }
	  	  })
	  	  
	    }); // End of http get
	}
	
	// Invoking function when controller loads
	sortAndPaginate();	
}]); // End of controller

// Overriding default angular bootstrap setting for previous, next buttons
paginate.config(['paginationConfig',function(paginationConfig){
	paginationConfig.previousText="‹";
	paginationConfig.nextText="›";
	paginationConfig.firstText="«";
	paginationConfig.lastText="»";
}]);