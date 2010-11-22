<?php
	function typeOut($type)
	{
		if($type=="desk")
		{
			return "Desktop";
		}
		else if($type=="laptop")
		{
			return "Laptop";
		}
		else
		{
			return $type;
		}
	}

	function iptolong($ip)
	{
		list($oct1,$oct2,$oct3,$oct4) = explode(".",$ip);
		return 16777216*$oct1+35536*$oct2+256*$oct3+$oct4;
	}

	function setConfig($connect)
	{
		global $CONFIG;
		$config_query = mysql_query("select * from config",$connect);
		//echo mysql_errno().": ".mysql_error();
		while($config_row = mysql_fetch_array($config_query))
		{
			$CONFIG[$config_row['name']]=$config_row['value'];
		}
	}

	function setLocations($connect)
	{
		global $LOCATIONS;
		$LOCATIONS = array();
		$locations_query = mysql_query("select * from locations where active = 1",$connect);
		while($location_row = mysql_fetch_array($locations_query))
		{
			$LOCATIONS[] = $location_row;
		}
	}

	function get_location($connect)
	{
		$current_ip = iptolong($_SERVER['REMOTE_ADDR']);

		$default_location_query = mysql_query("select * from locations where primary_range = 1 and active = 1",$connect);
		if(mysql_num_rows($default_location_query) != 0)
		{
			$location_query = mysql_query("select * from location_range where startiplong <= ".$current_ip." and endiplong >=".$current_ip." and locid != 0",$connect);
	
			if(mysql_num_rows($location_query) == 0)
			{
				$default_location_row = mysql_fetch_array($default_location_query);
				$locid = $default_location_row['locid'];
			}
			else
			{
				$location_row = mysql_fetch_array($location_query);
				$locid = $location_row['locid'];
			}
		}
		else
		{
			$locid = 0;
		}
		return $locid;
	}

	function normalizeContact($data, $type)
	{
		switch($type)
		{
			case "phone":
				$out = normalizePhone($data);
				break;
			case "email":
				$out = normalizeEmail($data);
				break;
			case "other":
				$out = normalizeOther($data);
				break;
		}
		return $out;
	}

	function normalizePhone($data)
	{
		$data = preg_replace("/\D/", "", $data);
		if(strlen($data) == 7)
		{
			$data = "402".$data; 
		}
		else if(strlen($data) == 11 && substr($data,0,1) == "1")
		{
			$data = substr($data,1); 
		}
		return $data;
	}

	function normalizeEmail($data)
	{
		return strtolower($data);
	}

	function normalizeOther($data)
	{
		return strtolower($data);
	}
?>