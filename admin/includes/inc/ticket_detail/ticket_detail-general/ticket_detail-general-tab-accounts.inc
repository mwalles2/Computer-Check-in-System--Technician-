			<div id="account{COUNTER}Row" class="row">
				<div class="cell greyBg {ACCOUNT_IFBOTTOM}side_borders">
					<div class="cell" style="width:33%"><input name="account{COUNTER}Delete" type="button" value="-" onclick="deleteRow(this)"></div>
					<div id="accountUsername{COUNTER}" class="cell" style="width:33%">{USERNAME}</div>
					<div id="accountPassword{COUNTER}" class="cell" style="width:29%">{PASSWORD}</div>
					<div id="accountEdit{COUNTER}" class="cell float_right"><input name="accountEditButton{COUNTER}" type="button" value="E" onclick="edit('account{COUNTER}',this)"></div>
				</div>
			</div>
