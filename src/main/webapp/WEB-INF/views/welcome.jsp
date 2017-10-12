 <%@include file="includes/header.jsp" %>
 <div class="container">
  	<h1 style="color:blue"> Hello ${pageContext.request.userPrincipal.name}! This is Welcome Page!</h1>
     
     <a style="color:blue" href="/">Go to Home Page!</a>
     <br/>
     
     <form action="/logout" method="get">
         <input type="submit" value="Sign Out"/>
     </form>
 </div>
 <%@include file="includes/footer.jsp" %>
