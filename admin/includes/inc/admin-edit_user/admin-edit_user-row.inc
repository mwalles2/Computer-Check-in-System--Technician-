		<div class="row cell" id="row{TECHID}" style="background:{ROWCOLOR}">
			<div id="fade{TECHID}" class="cell" style="width:100%;">
				<div class="cell" style="width:25%" id="name{TECHID}">{NAME}</div>
				<div class="cell" style="width:25%; text-align:center;" id="username{TECHID}">{USERNAME}</div>
				<div class="cell" style="width:25%; text-align:center;" id="nuid{TECHID}">{NUID}</div>
				<div class="cell" style="width:25%; text-align:right;" id="status{TECHID}">
					<select name="statusSelect{TECHID}" onchange="updateTechStatus({TECHID},this)">
						<option value="none"{NONESELECT}>None</option>
						<option value="view"{VIEWSELECT}>Viewer</option>
						<option value="tech"{TECHSELECT}>Tech</option>
						<option value="manager"{MANAGERSELECT}>Manager</option>
						<option value="all"{ALLSELECT}>All</option>
					</select>
				</div>
			</div>
		</div>