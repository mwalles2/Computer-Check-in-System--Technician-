	<div class="four_col" style="clear:both; text-align:center; padding:0 0 20px 0;">
		Welcome to the University of Nebraska&ndash;Lincoln Computer Help Center electronic check-in system.
	</div>
	<div id="error" style="border:3px #c00 solid; padding:10px; width:100%; text-align:center; margin: 0 0 20px 0; display: none;"></div>
	<div id="cardSwipe" style="float:left; text-align:center; width:46%;">
		Please scan your NCard.
		<div id="card"></div>
	</div>
	<div style="float: left; width:8%; text-align:center; font-weight:bold;">
		-OR-
	</div>
	<div id="userName" style="float:left; text-align:center; width:46%;">
		If you wish to login with your username and password please click: <input type="button" name="" value="Here"  onclick="toggleLogin('on')">
	</div>
	<div style="text-align:center; padding:20px 0 0 0; clear:both;">
		<span style="height:40px; font-size:40px; color: #666; font-weight:bold; text-outline: 1px 1px #C00;">The approximate wait is <span style="color:#F00">{MEDIANTURNAROUND} days</span></span>
		<br /><span style="line-height:2;">The wait times vary by type of problem.  Estimate is based on median return time for the last four weeks.</span>
		<br /><span style="font-style: italic; font-size:13pt;">Speak to a technician about <span style="color:#F00">Rush Service</span>.</span>
		<br /><span	style=" font-size:13pt;">There are currently <span style="color:#F00; font-weight:bold;">{CURRENTNOTDONE}</span> computers in our work queue and we finished <span style="color:#F00; font-weight:bold;">{DONETHISWEEK}</span> computers in the last week.</span>
	</div>

	<div class="error" id="loginDiv">
		<div class="errorhead">&nbsp;</div>
		<div class="errorbody">
			<form name="login" action="javascript:runCard()" method="get">
				Please enter your username and password below.
				<div>Username: <input type="text" name="username" value="" /></div>
				<div>Password: <input type="password" name="password" value="" /></div>
				<div><input type="submit" name="submit" value="Login" /><input type="button" value="Cancel" onclick="toggleLogin('off')" /></div>
			</form>
		</div>
		<div class="errorfoot">&nbsp;</div>
	</div>
