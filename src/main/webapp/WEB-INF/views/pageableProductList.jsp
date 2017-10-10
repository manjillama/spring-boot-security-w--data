 <%@include file="includes/header.jsp" %>
 <div class="container">
 	<div class="row">
 		<div class="col-xs-12">
 			<h2 class="page-header">Pageable Product List</h2>
 			<h4>Pagination Info:</h4>
 			<p>Total Pages: ${totalPages}</p>
 			<p>Total Products: ${totalProducts}</p>
 			<p>Size: ${size}</p>
 			<p>Current Page: ${currentPage}</p>
 		</div>
 		<!-- Backend Loop Start -->
 		<c:forEach var="product" items="${products}">
	 		<div class="col-md-3">
	 			<div class="panel panel-warning">
				  <div class="panel-heading">
				    <h3 class="panel-title">${product.productId}</h3>
				  </div>
				  <div class="panel-body">
				  	${product.productName}
				  </div>
				</div>
	 		</div>
 		</c:forEach>
 		
 		<!-- Backend Loop End -->
 	</div>
 </div>
 <%@include file="includes/footer.jsp" %>
 