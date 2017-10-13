$(document).ready(function(){
	var getPageUrl = window.location.href;
	var currentPage = $('.pagination').attr('data-current-page');
	var totalPages = $('.pagination').attr('data-totalPages');

	//Read Url Params
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
	//console.log("Url Params",parseQueryString(getPageUrl));
	// console.log(parseQueryString(getPageUrl).page);	
	
	/*
	 * Building Pagination Links
	 */
	if(currentPage>1){
		if(parseQueryString(getPageUrl).size != null){
			$('.pagination').append(`<li class="paginatePrev"><a href="?page=${currentPage-1}&size=${parseQueryString(getPageUrl).size}">&lsaquo;</a></li>`);
		}else{
			$('.pagination').append(`<li class="paginatePrev"><a href="?page=${currentPage-1}">&lsaquo;</a></li>`);
		}
	}
	for(var i=1; i<=totalPages; i++){	
		if(parseQueryString(getPageUrl).size != null){
			$('.pagination').append(`
					<li><a href="?page=${i}&size=${parseQueryString(getPageUrl).size}">${i}</a></li>
				`);
		}else{
			$('.pagination').append(`
					<li><a href="?page=${i}">${i}</a></li>
				`);
			}
		}
		
	if(currentPage<totalPages){
		if(parseQueryString(getPageUrl).size != null){
			$('.pagination').append(`<li class="paginateNext"><a href="?page=${eval(currentPage)+1}&size=${parseQueryString(getPageUrl).size}">&rsaquo;</a></li>`);
		}else{
			$('.pagination').append(`<li class="paginateNext"><a href="?page=${eval(currentPage)+1}">&rsaquo;</a></li>`);
		}
	}
	
	// Adding active class to current page link
	$('.pagination li').children('a').each(function () {
		if($(this).text() == currentPage){
			$(this).parent().addClass('active');
		}
	});
	
	//hide sibling links around active link
	var $activeLink = ($('.pagination .active'));
	$activeLink.prevUntil().eq(1).prevUntil('.paginatePrev').addClass('hidden');
	$activeLink.nextUntil().eq(1).nextUntil('.paginateNext').addClass('hidden');
});