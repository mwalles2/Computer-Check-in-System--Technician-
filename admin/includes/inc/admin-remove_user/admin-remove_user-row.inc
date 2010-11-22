		<div class="row cell" id="row{TECHID}" style="background:{ROWCOLOR}">
			<div id="fade{TECHID}" class="cell" style="width:100%;">
				<div class="cell" style="width:25%" id="name{TECHID}">{NAME}</div>
				<div class="cell" style="width:25%; text-align:center;" id="username{TECHID}">{USERNAME}</div>
				<div class="cell" style="width:25%; text-align:center;" id="nuid{TECHID}">{NUID}</div>
				<div class="cell" style="width:25%; text-align:right;" id="remove{TECHID}">
					<input type="button" id="remove{TECHID}" value="Remove" onclick="updateTechDelete({TECHID})" />
				</div>
			</div>
		</div>