			<div id="mac{COUNTER}Row" class="row">
				<div class="cell greyBg {MAC_IFBOTTOM}side_borders">
					<div class="cell" style="width:25%"><input name="mac{COUNTER}Delete" type="button" value="-" onclick="deleteRow(this)"></div>
					<div id="macAddress{COUNTER}" class="cell" style="width:25%">{ADDRESS}</div>
					<div id="macType{COUNTER}" class="cell" style="width:25%">{TYPE}</div>
					<div id="macForm{COUNTER}" class="cell" style="width:20%">{FORM}</div>
					<div id="macEdit{COUNTER}" class="cell float_right"><input name="macEditButton{COUNTER}" type="button" value="E" onclick="edit('mac{COUNTER}',this)"></div>
				</div>
			</div>
