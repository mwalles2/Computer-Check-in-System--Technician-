<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
		"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>{TITLE}</title>
	<meta name="generator" content="BBEdit 7.1.4">
	<link rel="stylesheet" href="../includes/css/main-style.css" type="text/css">
	<link rel="stylesheet" href="../includes/css/main-ajax.css" type="text/css">
	<link rel="stylesheet" href="includes/css/error.css" type="text/css">
	<link rel="stylesheet" href="includes/css/general.css" type="text/css">
{CSS}
	<script type="text/javascript" language="javascript" src="../includes/js/xmlrequest.js"></script>
	<script type="text/javascript" language="javascript" src="includes/js/xmlrequest_auth.js"></script>
	<script type="text/javascript" language="javascript" src="includes/js/admin.js"></script>
{JAVASCRIPT}
</head>
<body class="adminbody"{BODYOPTIONS}>
	<div id="saved">Update Saved . . .</div>
	<div id="failed">Update Failed . . .</div>
	<div id="updating">Updating . . .</div>
	<div style="position: fixed; top: 0px; left: 0px; width: 200px; heigh: 30px; padding: 5px 5px 5px 0;  background-color: #1560BD; float:left; height: 100%;">
		<div id="nav">
			Welcome, {TECH}
			<ul>
{NAV}
				<li><a href="javascript:logout()">Log Out</a></li>
			</ul>
		</div>
	</div>
	<div style="float:left; width:100%">
		<div style="padding:20px 0 0 200px;">
{CONTENT}		</div>
	</div>
	<form action="javascript:null" method="get" id="loginForm" name="loginForm">
		<div class="error" id="authLogin">
			<div class="errorhead">&nbsp;</div>
			<div class="errorbody">
				Your session has timed out, please login again.
				<br>Username: <input type="text" name="username">
				<br>Password: <input type="password" name="password">
				<input type="text" value="" name="uri">
				<br><input type="submit" value="Login" onclick="login()">
			</div>
			<div class="errorfoot">&nbsp;</div>
		</div>
	</form>

	<div id="shadow" class="shadow"></div>

	<div id="log" class="row_wide top_space hidden"></div>
</body>
</html>