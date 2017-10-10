 <%@include file="includes/header.jsp" %>
     <c:if test="${param.error!=null}">
        <h1 style="color:red">Username or Password is wrong. Please check again</h1>
     </c:if>
 	<h1>Custom Login Page</h1>
   
     <form action="/login" method="POST">
         <div><label> User Name :</label> <input type="text" name="username"/> </div>
         <div><label> Password:</label> <input type="password" name="password"/> </div>
         <div><input type="submit" value="Sign In"/></div>
         <input type="hidden" name="${_csrf.parameterName}"
			value="${_csrf.token}" />
     </form>
 <%@include file="includes/footer.jsp" %>
