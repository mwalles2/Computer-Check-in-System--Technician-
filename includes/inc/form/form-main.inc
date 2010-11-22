	<form name="mainForm" action="javascript:formCheck()">
		<div id="formTable" style="width:100%">
			<fieldset class="setHeader" style="padding:0 0 0 5%; clear:both; font-weight:bold;">
				<legend>
					Personal Information
				</legend>
			</fieldset>
			<div class="row top_space">
				<div id="nameAuto"><!-- inserted from xml -->
					<div id="nameHeader" class="cell label1">Name:</div>
					<div class="cell name" id="name">{NAME}</div>
				</div>
				<div id="nameMan" style="display:none"><!-- this will be displayed if they are not in LDAP or LDAP is down -->
					<div id="givenManHeader" class="cell label1">First Name:</div>
					<div id="givenManInput" class="cell"><input type="text" name="given"></div>
					<div id="surManHeader" class="cell label1">Last name:</div>
					<div id="surManInput" class="cell"><input type="text" name="sur"></div>
				</div>
				<div class="cell label1">Date:</div> <div class="cell date" id="date">{DATE}</div>
			</div>
			<div class="row">
				<div class="cell label1">NUID#:</div><div class="nuid" id="nuid">{NUID}</div>
				<div class="cell label1">Status</div>
				<div class="cell facstaffstu" id="studentText" style="width:30%;">{STATUS}</div>
			</div>
			<div class="row">
				<div class="cell">
					Phone:<input type="text" name="phone" onchange="javascript:{chosenExistingPhoneBool=false;}" value=""> Email address:<input type="text" name="email" onchange="javascript:{chosenExistingEmailBool=false;}" value="">
				</div>
			</div>
			<div style="clear:both;">&nbsp;</div>
			<fieldset class="setHeader" style="padding:0 0 0 5%; clear:both; font-weight:bold;">
				<legend>
					Computer Information
				</legend>
			</fieldset>
			<div class="row top_space" id="computerInfo">
				<div class="cell">
					Brand of Computer
					<select name="computer" onchange="laptopSH('s')">
{BRANDSELECT}
					</select>
					Is it a
				</div>
				<div class="cell" style="padding:0 0 0 1em; width:30%;">
					<div class="row_wide">
						<div class="cell">
							<input type="radio" name="compType" value="desk" onclick="laptopSH('h');otherSH('h')"> Desktop
						</div>
					</div>
					<div class="row_wide">
						<div class="cell">
							<input type="radio" name="compType" value="laptop" onclick="laptopSH('s');otherSH('h')"> Laptop
						</div>
					</div>
					<div class="row_wide" style="width:40%">
						<div class="cell">
							<input type="radio" name="compType" value="other" onclick="otherSH('s')"> Other
							<select name="otherType" id="otherTypeMain" style="visibility:hidden;">
{OTHERSELECT}
							</select>
						</div>
					</div>
				</div>
			</div>
			<div id="otherHide">
				<div class="hidden" id="laptopRows">
					<div class="row" id="laptopR1">
						<div class="cell">
							Did you bring Laptop power supply? Yes <input type="radio" name="powersupply" value="yes"> Will bring in Later <input type="radio" name="powersupply" value="later">
						</div>
					</div>
					<div class="row" id="laptopR2">
						<div class="cell" style="white-space: nowrap;">
							Please remove your computer and any peripherals that you are leaving from your case.
						</div>
					</div>
					<div class="row" style="display:none;" id="laptopR2-old">
						<div class="cell" style="white-space: nowrap;">
							Is Laptop in a case? Yes <input type="radio" name="caseRadio" value="yes" onclick="caseSH('s','mainForm')"> No <input type="radio" name="caseRadio" value="no" onclick="caseSH('h','mainForm')" checked> <div class="hidden" id="case-mainForm">Describe Case<input type="text" name="caseText"></div>
						</div>
					</div>
				</div>
				<div class="hidden" id="laptopR3">
					<div class="row">
						<div class="cell" style="white-space: nowrap;">
							We will not need to leave your power supply or case.
						</div>
					</div>
				</div>
				<div class="row top_space">
					<div class="cell" style="margin:0 5px 0 0;">Does your computer have an:</div>
				</div>
				<div class="row">
					<div class="cell" style="width:3em">&nbsp;</div>
					<div class="cell" style="margin:0 5px 0 0;">External ethernet card?</div>
					<div class="cell" style="margin:0 5px 0 0;">Yes <input type="radio" name="ethernet" value="yes"></div>
					<div class="cell">No <input type="radio" name="ethernet" value="no" checked></div>
				</div>
				<div class="row">
					<div class="cell" style="width:3em">&nbsp;</div>
					<div class="cell" style="margin:0 5px 0 0;">External wireless card?</div>
					<div class="cell" style="margin:0 5px 0 0;">Yes <input type="radio" name="wireless" value="yes"></div>
					<div class="cell">No <input type="radio" name="wireless" value="no" checked></div>
				</div>
				<div class="row">
					<div class="cell">
						If you don't know what these are leave them as "No."
					</div>
				</div>
			</div>
			<div class="row top_space">
				<div class="cell">
					Are you leaving any CDs<span id="otherCDs"> with the computer</span>? Yes <input type="radio" name="cds" value="yes" onClick="cdSH('s')"> No <input type="radio" name="cds" value="no" onClick="cdSH('h')" checked>
				</div>
			</div>
			<div class="row hidden" id="cdL">
				<div class="cell">
					<textarea rows="10" cols="40" name="cdText"></textarea>
				</div>
			</div>
			<div class="row hidden" id="cdS">
				<div class="cell">
					A space will be provided on the print out to list the CDs.
				</div>
			</div>
			<div class="row" id="usernameAndPasswords">
				List passwords for computer logon, including administrator's account. <input type="button" value="None" name="none" onClick="buildUserPass('none','mainForm')"><br>
				<div id="mainForm-userpass">
					Username: <input type="text" name="user0" onBlur="addUserPass(this,'mainForm')">
					Password: <input type="text" name="pass0" onBlur="addUserPass(this,'mainForm')">
					<input type="button" value="-" name="sub0" onClick="buildUserPass(0,'mainForm')" disabled>
					<input type="button" value="+" onClick="buildUserPass('','mainForm')">
				</div>
			</div>
			<div style="clear:both;">&nbsp;</div>
			<fieldset class="setHeader" style="padding:0 0 0 5%; clear:both; font-weight:bold;">
				<legend>
					Problem Information
				</legend>
			</fieldset>
			<div class="row top_space">
				Please describe the problem to the best of your ability:
				<select name="probs" onchange="addProb('mainForm')" id="probs-mainForm" style="display:none;">
					<option value="">---</option>
{PROBLEMSELECT}
				</select>
			</div>
			<div class="row">
				<div class="cell" id="out-mainForm"></div>
			</div>
			<div class="row" id="probL">
				<div class="cell">
					<textarea rows="10" cols="60" name="probTextL" onfocus="if(this.value==defaultProblemText) {this.value=''}" onblur="if(this.value=='') {this.value=defaultProblemText}"></textarea>
				</div>
			</div>
			<div class="row hidden" id="probS-mainForm">
				<div class="cell">
					<input type="text" name="probTextS" size="60" maxlength="255">
				</div>
			</div>
			<div class="row">
				<input type="button" value="Continue" onclick="formCheck()"><input type="button" value="Cancel" onclick="cancelAction()">
			</div>
		</div>
	</form>