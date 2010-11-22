<?php
	setcookie("TECHID","",time()-1,"/admin/");
	setcookie("TECHNAME","",time()-1,"/admin/");
	setcookie("TECHHASH","",time()-1,"/admin/");
	header("Cache-Control: no-cache");
	header("Location: http://".$_SERVER['HTTP_HOST']."/admin/");
?>