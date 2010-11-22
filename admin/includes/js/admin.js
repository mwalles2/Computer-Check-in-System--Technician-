	function logout()
	{
		window.location=protocol+server+"/admin/logout.php";
	}

	function toggleShadow(toggle)
	{
		shadow=document.getElementById("shadow");
		(toggle=="on")?shadow.style.display="inline":shadow.style.display="none";
	}
