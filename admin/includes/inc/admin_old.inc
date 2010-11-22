<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
		"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>{TITLE}</title>
	<meta name="generator" content="BBEdit 7.1.4">
	<style type="text/css">
		<!--

		.cell_auto
		{
			float: left;
			vertical-align: top;
			margin: 0 auto 0 auto;
		}
		
		.tab_side
		{
			border-color: #000;
			border-width: 0 0 1px 0;
			border-style: solid;
			height: 26px;
		}
		
		.tab_active
		{
			border-color: #000;
			border-width: 1px 1px 0 1px;
			border-style: solid;
			text-align: center;
			height: 25px;
			cursor:pointer;
		}
		
		.tab_inactive
		{
			border-color: #000;
			border-width: 1px;
			border-style: solid;
			background-color: #CCC;
			text-align: center;
			height: 25px;
			cursor: pointer;
		}

		-->
	</style><!-- General Styles -->
	<style type="text/css">
		<!--

			.checklist_table
			{
				width: 80%;
				padding: 0px;
				margin: 0px 10% 0px 10%;
			}

			.checklist_note
			{
				clear:both;
				width: 90%;
				border-color: #000;
				border-width: 1px;
				border-style: solid;
				background-color: #39F;
				padding: 0px;
				margin: 3px 5% 10px 5%;
			}
			
			.hidden
			{
				display:none;
			}

			.attached_note
			{
				text-align: center;
				width:25px;
			}
			
			.done
			{
				background-color: #0C0;
			}
			
			.empty { background-color: #33F; }

			.add_box
			{
				clear: both;
				width: 90%;
				margin: 5px 5% 5px 5%;
				border-color: #000;
				border-width: 1px;
				border-style: solid;
				background-color: #CCC;
				padding: 5px;
			}
		-->
	</style>	<!-- Checklist Styles -->
	<link rel="stylesheet" href="../includes/css/main-style.css" type="text/css">
	<link rel="stylesheet" href="../includes/css/main-ajax.css" type="text/css">
	<link rel="stylesheet" href="../includes/css/error.css" type="text/css">
{CSS}
	<script type="text/javascript" language="javascript" src="../includes/js/xmlrequest.js"></script>
	<script type="text/javascript" language="javascript" src="includes/js/xmlrequest_auth.js"></script>
	<script type="text/javascript" language="javascript" src="includes/js/admin.js"></script>
{JAVASCRIPT}
</head>
<body>
	<div class="row">
		<div class="cell" style="float:left;">
			<a href="index.php">Main Menu</a>
		</div>
		<div class="cell" style="float:right;">
			<a href="javascript:logout()">Log Out</a>
		</div>
	</div>
	<div id="saved">Update Saved . . .</div>
	<div id="failed">Update Failed . . .</div>
{CONTENT}
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