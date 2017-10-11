<%@ include file="includes/header.jsp"%>

<div class="container">
	<h1 class="page-header">Price Slider Check</h1>
	<div class="row">
		<div class="col-md-2">
			<div id="fetchDataPrice" data-max-price="${maxPrice}" data-min-price="${minPrice}"></div>
			<p>
				<label for="amount">Price range:</label> 
				<input type="text" id="amount" readonly style="border: 0; color: #f6931f; font-weight: bold;">
			</p>
			<div id="slider-range"></div>
		</div>
		<div class="col-md-10">
			<div class="row productLoop">
				
			</div>
		</div>
	</div>
	
</div>

<script>
  $( function() {
	var maxPrice = $('#fetchDataPrice').attr('data-max-price');
	var minPrice = $('#fetchDataPrice').attr('data-min-price');
	var jsonUrl = 'http://localhost:8080/range_slider/range/api';
    $( "#slider-range" ).slider({
      range: true,
      min: Number(minPrice),
      max: Number(maxPrice),
      values: [ Number(minPrice), Number(maxPrice) ],
      slide: function( event, ui ) {
        $( "#amount" ).val("$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ]);
      },
      change: function( event, ui){
          var min = ui.values[ 0 ];
          var max = ui.values[ 1 ];
          jsonUrl = 'http://localhost:8080/range_slider/range/api?minPrice='+min+'&maxPrice='+max;
          console.log(jsonUrl);
          $('.productLoop').html('');
          fetchProducts();
      }
    });

    // Initial State
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
	//console.log($( "#slider-range" ).slider("option","max"));
	//console.log($( "#slider-range" ).slider("option","min",minPrice));

	function fetchProducts(){
		$.getJSON(jsonUrl, function(products){
			$.each(products, function(index, product){
				$('.productLoop').append('<div class="col-md-3"><div class="panel panel-warning"><div class="panel-heading"><h3 class="panel-title">'+product.productId+'</h3></div><div class="panel-body">'+product.productName+'</div></div></div>');
			});
		});
		console.log("Ready");
	}
	fetchProducts();
	
  } );
</script>

<%@ include file="includes/footer.jsp"%>