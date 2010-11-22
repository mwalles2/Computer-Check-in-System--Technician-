							<div class="row" style="width:98%; margin:0 auto;" id="tab{TABNUMBER}IpRange{RANGENUMBER}">
								<span class="ipRange cell" id="tab{TABNUMBER}IpRange{RANGENUMBER}Span" onclick="editIpRange('tab{TABNUMBER}IpRange{RANGENUMBER}')">
									<div class="cell" id="tab{TABNUMBER}IpRange{RANGENUMBER}StartIp">
										{STARTIP}
									</div>
									<div class="cell" id="tab{TABNUMBER}IpRange{RANGENUMBER}StartIpEdit" style="display:none;">
										<input type="text" size="15" name="tab{TABNUMBER}IpRange{RANGENUMBER}StartIpEditTextbox" value="{STARTIP}" />
									</div>
									<div class="cell" style="width:3em; text-align:center;" id="tab{TABNUMBER}IpRange{RANGENUMBER}Dash">
										-
									</div>
									<div class="cell" id="tab{TABNUMBER}IpRange{RANGENUMBER}EndIp">
										{ENDIP}
									</div>
									<div class="cell" id="tab{TABNUMBER}IpRange{RANGENUMBER}EndIpEdit" style="display:none;">
										<input type="text" size="15" name="tab{TABNUMBER}IpRange{RANGENUMBER}EndIpEditTextbox" value="{ENDIP}" />
									</div>
									<div class="cell save" id="tab{TABNUMBER}IpRange{RANGENUMBER}Save" onclick="saveIpRange('tab{TABNUMBER}IpRange{RANGENUMBER}')" style="display:none;">Save</div>
								</span>
								<div class="remove" id="tab{TABNUMBER}IpRange{RANGENUMBER}Remove" onclick="removeIpRange('tab{TABNUMBER}IpRange{RANGENUMBER}')">Remove</div>
							</div>
