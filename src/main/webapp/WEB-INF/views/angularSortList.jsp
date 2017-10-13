<%@ include file="includes/header.jsp"%>
	<div class="container" ng-app="angularPanigate" ng-controller="angularSortCtrl">
		<h2 class="page-header">Product List filter using pure AngularJs</h2>
		<!-- 
			-- Passes current page number to $routeParams.currentPage
			-- Do not delete the ng-view -->
		<div ng-view>
		</div>
		<div class="col-md-2">
			<div class="row">
				<div class="col-md-12">
					<p>
					  <label for="amountPrice">Price range:</label>
					  <input type="text" id="amountPrice" readonly style="border:0; color:#f6931f; font-weight:bold;">
					</p>
					<div id="range-price"></div>
				</div>
			</div>
			<div style="width: 100%;height:30px"></div>
			<label for="priceAmount">Brands</label>
			<div class="row">
				<div class="col-md-12" ng-repeat="brand in brands">
					 <input type="checkbox" ng-model="checkboxModel.value2"
	           ng-true-value="'{{brand}}'" ng-false-value="''" ng-change="filterByBrand()"> {{brand}}
				</div>
			</div>
		</div>
		<div class="col-md-10">
			<div class="row" style="display: flex; flex-wrap: wrap;">
				<!-- 
				-- AngularJS product loop 
				-- In page one data.slice(0,20) which means fetch from index 0 upto 19 
				 -->
				<div ng-repeat="row in data.slice(((currentPage-1)*itemsPerPage), ((currentPage)*itemsPerPage))"
				class="col-md-3 col-sm-6 col-xs-6 menu-items space-bottom">
					<div class="panel panel-warning">
						<div class="panel-heading">
							<h3 class="panel-title">{{row.productName}}</h3>
						</div>
						<div class="panel-body">
							<span>NRS {{row.productPrice}}</span><span class="pull-right text-muted">{{row.productManufacturer}}</span>
						</div>
					</div>
				</div>
			</div>
			<!-- Pagination -->
			<div ng-hide="totalItems <= itemsPerPage">
				<div class="pagination-wrapper text-center">
					<!-- Limit the maximum visible buttons -->
					<pagination total-items="totalItems" ng-model="currentPage"
						ng-change="scrollTop()" max-size="maxSize" class="pagination-sm"
						boundary-links="true" rotate="false" num-pages="numPages"
						items-per-page="itemsPerPage"> </pagination>
				</div>
			</div>
		</div>
	</div>
<%@ include file="includes/footer.jsp"%>
