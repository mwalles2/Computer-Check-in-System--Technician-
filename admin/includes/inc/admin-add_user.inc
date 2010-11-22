	<form name="mainForm" action="javascript:techSearch()" method="post" style="clear:both;">
		<div class="row">
			<div class="cell" style="width:25%;">
				<select name="searchField">
					<option value="given">First Name</option>
					<option value="sur">Last Name</option>
					<option value="username" selected="selected">Blackboard Username</option>
					<option value="nuid">NUID</option>
				</select>
			</div>
			<div class="cell" style="width:50%; text-align:center;">
				<input type="text" name="seachText" size="40">
			</div>
			<div class="cell" style="width:25%; text-align:center;">
				<input type="submit" value="Submit">
			</div>
		</div>
	</form>
	<form name="techForm">
		<div id="techs" style="clear:both;">
		</div>
		<div id="addTechRow" class="row" style="display:none;"><input type="button" value="Add" onclick="javascript:addTeach()"></div>
	</form>