paginate
.controller('angularSortCtrl', 
		['$scope','$location','$routeParams','$http','$filter',
			function($scope,$location,$routeParams,$http,$filter) {
			
			var jsonUrl = '/filter/angular/api';	
			
			/*
			 * Filter By Brand
			 */
			$scope.checkboxModel = {
 		       value2 : ''
	    	};
			$scope.filterByBrand = function(){
				// Re-Initializing $scope.data
				$scope.data = $scope.constData;
				// Assigning tempData to empty
				$scope.tempData=[];
	    		// If brand checkbox is checked
	    		if($scope.checkboxModel.value2.length > 0){
	    			angular.forEach($scope.data, function(data) {
//						// Append only if unique, returns -1 if element doesn't exist
						if(data.productManufacturer === $scope.checkboxModel.value2){
							$scope.tempData.push(data);
						}
					});
	    			// Re-assigning new api data
	    			$scope.data = $scope.tempData;
	    			// Re-assigning new totalItems
		    		$scope.totalItems = $scope.data.length;
	    		}else{
	    			/*
	    			 * on unchecked
	    			 * Reset api data
	    			 * Reset total items
	    			 */
	    			$scope.data = $scope.constData;
	    			
	    			$scope.totalItems = $scope.data.length;
	    		}
	    		
	    		// Reset to page one
			  	$scope.currentPage = 1;
	    	};
			
			/*
			 * filter By Price Range
			 */ 
			$( "#range-price" ).slider({
			      range: true,
			      min: 0,
			      max: 4000,
			      values: [ 0, 4000 ],
			      slide: function( event, ui ) {
			        $( "#amountPrice" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
			      },
			      stop: function(event, ui){
			    	// Reset to page one
				  	$scope.currentPage = 1;
				  }
			  });
				
			// Initial Price Amount View
		    $( "#amountPrice" ).val( "$" + $( "#range-price" ).slider( "values", 0 ) +
			      " - $" + $( "#range-price" ).slider( "values", 1 ) );
			
			
			function angularSortAndPaginate(){
				$http.get(jsonUrl).then(function(response){
					// Constant Full Api Data
					$scope.constData = response.data;
					// Dynamin Api Data
					$scope.data = response.data;
					
					
					$scope.brands = [];
					// Initializing with all the unique brands
					angular.forEach($scope.data, function(data) {
						// Append only if unique, returns -1 if element doesn't exist
						if($scope.brands.indexOf(data.productManufacturer) == -1){
							$scope.brands.push(data.productManufacturer);
						}
					});
					
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
				  	 });					
				});
			};
			
			angularSortAndPaginate();
}]); // End of controller
