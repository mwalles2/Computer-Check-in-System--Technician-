	<form action="ldap_search.php" method="post" style="clear:both;">
		<div style="width:50%; float:left;">
			<div class="row">
				<div class="cell" style="width:25%;">
					First Name:
				</div>
				<div class="cell" style="width:75%; text-align:right;">
					<input type="text" name="given" size="40">
				</div>
			</div>
			<div class="row">
				<div class="cell" style="width:25%;">
					Last Name:
				</div>
				<div class="cell" style="width:75%; text-align:right;">
					<input type="text" name="sur" size="40">
				</div>
			</div>
			<div class="row">
				<div class="cell" style="width:25%;">
					Blackboard Username:
				</div>
				<div class="cell" style="width:75%; text-align:right;">
					<input type="text" name="username" size="40">
				</div>
			</div>
			<div class="row">
				<div class="cell" style="width:25%;">
					NUID:
				</div>
				<div class="cell" style="width:75%; text-align:right;">
					<input type="text" name="nuid" size="40">
				</div>
			</div>
		</div>
		<div style="width:50%; float:left;">
		</div>
		<div class="row">
			<div class="cell" style="width:50%; text-align:center;">
				<input type="submit" value="Submit">
			</div>
			<div class="cell" style="width:50%; text-align:center;">
				<input type="reset" value="Reset">
			</div>
		</div>
	</form>