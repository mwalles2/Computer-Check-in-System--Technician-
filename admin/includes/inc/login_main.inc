<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
        "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
	<title>Login</title>
	<meta name="generator" content="BBEdit 8.6">
</head>
<body>
	<form action="/admin/includes/php/auth.php" method="post">
		Please login below
		<br>Username: <input type="text" name="username">
		<br>Password: <input type="password" name="password">
		<br><input type="submit" value="Submit">
		<input type="hidden" name="uri" value="{URI}">
	</form>
</body>
</html>
