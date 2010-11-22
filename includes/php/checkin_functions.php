<?php

function flowerDayNumber($MySQLLink)

/* This function will return how many
   computers are currently in the system
   and not yet in a "DONE" status */

{
    $result = mysql_query("select * from ticket where status!='done' AND outdate= '0000-00-00 00:00:00'", $MySQLLink);	//selects not done statuses from database and sets $result to that dataset
    $numberNotDone = mysql_num_rows($result); //sets numberNotDone to the total rows in the dataset
    return $numberNotDone;	//will return the number of computers not done
//    echo($numberNotDone);	//output for testing only - to be removed later -
}

function doneThisWeek($MySQLLink,$days = 7)

/* This function will determin how many
   computers were set to done in the system
   over the last week or number of days */

{
    $lastWeek = date("Y-m-d", mktime(0,0,0,date("n"),date("j") - $days,date("Y")));	//determines that the first date of the last week is (current - number of days)
    $result = mysql_query("select * from ticket where donedate >= '".$lastWeek."'", $MySQLLink);	//selects the last weeks tickets
    $numberDoneThisWeek = mysql_num_rows($result);	//sets numberCheckedInThisWeek to the total rows in the dataset
//    echo "query = select * from ticket where donedate > ".$lastWeek."<br>";
//    echo "error: ".mysql_errno().": ".mysql_error()."<br>";
    return $numberDoneThisWeek;	//will return the number of computers checked in this last week
//    echo($numberDoneThisWeek);	//output for testing only - to be removed later -
}


function medianTurnAround($MySQLLink)
{
	$median_query = mysql_query("select * from pre_comp_val where pcv_name = 'median_turn_around'");
	$median_results = mysql_fetch_array($median_query);
	return (int) $median_results["value"];
}
?>
