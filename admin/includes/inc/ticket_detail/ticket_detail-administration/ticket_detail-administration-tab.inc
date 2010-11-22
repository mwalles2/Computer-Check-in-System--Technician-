	<div id="tabAdministration" style="display:none">
		<div class="row">
			<fieldset class="setHeader" style="padding:0 0 0 5%; clear:both; font-weight:bold;">
				<legend>
					Ticket Options
				</legend>
			</fieldset>
		</div>
		<div class="row" id="">
			<div class="cell" style="width: 33%">
				<div class="cell">
					Rush Service:
				</div>
				<div class="cell">
					<input name="administrationExpressCheckBox" type="checkbox" onclick="administrationSetExpressAjax()"{RUSHBOX}>
				</div>
			</div>
			<div class="cell" style="width: 34%;">
				<div class="cell" style="text-align:right; width:50%;">
					Repair Type:
				</div>
				<div class="cell" style="width:50%;">
					<select name="administrationRepairTypeSelect" onchange="administrationSetRepairStatusAjax()">
						<option></option>
{REPAIRTYPEOPTIONS}
					</select>
				</div>
			</div>
			<div class="cell" style="width: 33%">
				<input type="button" name="administrationcCheckInOutButton" value="{BUTTONTEXT}" onclick="administrationCheckInOutAjax()" style="float:right;">
			</div>
		</div>
		<div class="row" id="">
			<div class="cell" style="width: 33%">
				<div class="cell">
					Warranty Work:
				</div>
				<div class="cell">
					<input name="administrationWarrantyCheckBox" type="checkbox" onclick="administrationSetWarrantyAjax()"{WARRANTYBOX}>
				</div>
			</div>
			<div class="cell" style="width: 34%">
				<div class="cell" style="width:50%; text-align:right;">
					Serial Number:&nbsp;
				</div>
				<div class="cell" style="width:50%">
					<div class="cell" id="serialnum-administration">
						{SERIALNUM}
					</div>
					<div class="cell" style="float: right;">
						<input name="email" type="button" value="E" onclick="editMultiTab('serialnum','administration',this)">
					</div>
				</div>
			</div>
		</div>
		<div class="row top_space">
			<fieldset class="setHeader" style="padding:0 0 0 5%; clear:both; font-weight:bold;">
				<legend>
					History
				</legend>
			</fieldset>
		</div>
		<div class="row">
			<div class="cell bottom_border" style="width:100%;">
				User
			</div>
		</div>
{USERHIST}
		<div class="row">
			<div class="cell bottom_border" style="width:100%;">
				Computer
			</div>
		</div>
{COMPHIST}
	</div>
