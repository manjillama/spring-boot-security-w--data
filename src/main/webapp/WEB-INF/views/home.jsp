 <%@include file="includes/header.jsp" %>
 <div class="container">
  <h1 style="color: green">Hello! This is Home Page!</h1>
	  <sec:authorize access="hasRole('ROLE_ADMIN')">
	  	<h2>You are Admin</h2>
	  </sec:authorize>
	  <sec:authorize access="hasRole('ROLE_USER')">
	  	<h2>You are User</h2>
	  </sec:authorize>
     <a style="color:blue" href="/welcome">Go to User Welcome Page!</a>
     <br/>
     <a style="color:blue" href="/admin">Go to Admin Page!</a>
 </div>
    
 <%@include file="includes/footer.jsp" %>
