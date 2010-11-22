<?php
	function arguments($argv)
	{
		$_ARG = array();
		foreach ($argv as $arg)
		{
			if (ereg('--([^=]+)=(.*)',$arg,$reg))
			{
				$_ARG[$reg[1]] = $reg[2];
			}
			elseif(ereg('-([a-zA-Z0-9])',$arg,$reg))
			{
				$_ARG[$reg[1]] = 'true';
			}
		}
		return $_ARG;
	}
?>