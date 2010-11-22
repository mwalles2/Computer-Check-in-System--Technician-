					<div class="row" id="tab{TABNUMBER}">
						<div class="cell round_top_tab darkBlueBackground" style="width:25%; text-align:center;" id="tab{TABNUMBER}Tab" onclick="editTabOptions('tab{TABNUMBER}')">
							<span id="tab{TABNUMBER}Label" onclick="editTabName('tab{TABNUMBER}')">
								<span id="tab{TABNUMBER}LabelName">{TABNAME}</span>
								<span id="tab{TABNUMBER}LabelNameEdit" style="display:none">
									<input type="text" name="tab{TABNUMBER}LabelNameEditTextbox" value="{TABNAME}" onblur="saveTabName('tab{TABNUMBER}')" />
								</span>
								<span id="tab{TABNUMBER}LabelDefault" style="{DEFAULTTAB}">*</span>
							</span>
						</div>
					</div>
					<div class="row cell side_borders darkBlueBackground" style="padding:0; display:none;" id="tab{TABNUMBER}Options">
						<div class="cell" style="width:98%; margin:0 auto;">
							<div class="cell" id="tab{TABNUMBER}OptionsDefault" onclick="saveDefaultTab('tab{TABNUMBER}')" style="cursor:pointer;">
								<input type="checkbox" name="tab{TABNUMBER}OptionsDefaultCheckbox" id="tab{TABNUMBER}OptionsDefaultCheckbox" {TABDEFAULTCHECKED}/> Default
							</div>
							<div class="remove" id="tab{TABNUMBER}OptionsRemove" onclick="removeTab('tab{TABNUMBER}')">Remove</div>
							<div class="add" id="tab{TABNUMBER}OptionsAdd" onclick="addIpRange('tab{TABNUMBER}')">Add IP Range</div>
							<div class="add" id="tab{TABNUMBER}OptionsAdd" onclick="setTickets('tab{TABNUMBER}')">Update Tickets With This Location</div>
						</div>
					</div>
					<div class="row cell top_border bottom_space" id="tab{TABNUMBER}IpRanges">
						<div class="cell greyBg bottom_side_borders" id="tab{TABNUMBER}IpRangesCell">
{IPRANGES}						</div> 
					</div>
