	<form name="check" action="javascript:setTimeout('formCheck()',70);">

		<div class="error" id="contacterror">
			<div class="errorhead">&nbsp;</div>
			<div class="errorbody">
				Please enter your contact information.  If you don't have a phone number or email address please select the "None" option (You must have at least one way for us to contact you):
				<br>Phone #:<input type="text" name="phone" value=""> 
				None:<input type="checkbox" name="phoneNone" value="true" onclick="(document.check.phone.disabled)?document.check.phone.disabled=false:document.check.phone.disabled=true;(document.check.emailNone.disabled)?document.check.emailNone.disabled=false:document.check.emailNone.disabled=true;(document.check.phone.disabled)?document.check.phone.value='NONE':document.check.phone.value='';">
				<span class="errorNV" id="errorNVPhone">NOT VALID</span>
				<br>Email address: <input type="text" name="email" value="">
				None:<input type="checkbox" name="emailNone" value="true" onclick="(document.check.email.disabled)?document.check.email.disabled=false:document.check.email.disabled=true;(document.check.phoneNone.disabled)?document.check.phoneNone.disabled=false:document.check.phoneNone.disabled=true;(document.check.email.disabled)?document.check.email.value='NONE':document.check.email.value='';">
				<span class="errorNV" id="errorNVEmail">NOT VALID</span>
				<br><input type="button" value="Continue" onclick="checkContact(2)">
			</div>
			<div class="errorfoot">&nbsp;</div>
		</div>

		<div class="error" id="facstaffstuerror">
			<div class="errorhead">&nbsp;</div>
			<div class="errorbody">
				Please select what your current status:
				<br>
				<div class="label1">Student</div>
				<input type="radio" name="facstaffstu" class="facstaffstu" value="student" onclick="document.outForm.facstaffstu.value=this.value">
				<div class="label1">Faculty</div>
				<input type="radio" name="facstaffstu" class="facstaffstu" value="faculty" onclick="document.outForm.facstaffstu.value=this.value">
				<div class="label1">Staff</div>
				<input type="radio" name="facstaffstu" class="facstaffstu" value="staff" onclick="document.outForm.facstaffstu.value=this.value">
				<br><input type="button" value="Continue" onclick="checkFacStaffStu(2)">
			</div>
			<div class="errorfoot">&nbsp;</div>
		</div>

		<div class="error" id="computererror"><!-- style="display:inline" -->
			<div class="errorhead">&nbsp;</div>
			<div class="errorbody">
				Please enter information about your computer:
				<br>Brand of Computer:
				<select name="computer">
{BRANDSELECT}
				</select>
				<div class="row_wide">
					<div class="cell">Is the computer a</div>
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
								<select name="otherType" id="otherTypeCheck" style="visibility:hidden;">
{OTHERSELECT}
								</select>
							</div>
						</div>
					</div>
					<div class="row_wide">&nbsp;</div>
				</div>

				<br><input type="button" value="Continue" onclick="checkComp(2)">
			</div>
			<div class="errorfoot">&nbsp;</div>
		</div>

		<div class="error" id="laptoperror">
			<div class="errorhead">&nbsp;</div>
			<div class="errorbody">
				Please let us know if you are leaving your power supply:
				<br>Did you bring Laptop power supply? Yes <input type="radio" name="powersupply" value="yes"> Will bring in Later <input type="radio" name="powersupply" value="later">
				<span style="display:none;"><br>Is Laptop in a case? Yes <input type="radio" name="caseRadio" value="yes" onclick="caseSH('s','check')"> No <input type="radio" name="caseRadio" value="no" onclick="caseSH('h','check')" checked> <div class="hidden" id="case-check">Describe Case<input type="text" name="caseText"></div></span>
				<br><input type="button" value="Continue" onclick="checkLaptop(2)">
			</div>
			<div class="errorfoot">&nbsp;</div>
		</div>

		<div class="error" id="cderror">
			<div class="errorhead">&nbsp;</div>
			<div class="errorbody">
				Please:  Enter The names and/or description of the CDs that your are including.
				<br><textarea rows="10" cols="40" name="cdText"></textarea>
				<br><input type="button" value="Continue" onclick="checkCDs(2)">
			</div>
			<div class="errorfoot">&nbsp;</div>
		</div>

		<div class="error" id="accounterror">
			<div class="errorhead">&nbsp;</div>
			<div class="errorbody">
				Please enter a username and password for the computer or select "NONE".
				<br>
				<input type="button" value="None" name="none" onClick="buildUserPass('none','check')"><br>
				<div id="check-userpass">
					Username: <input type="text" name="user0" onBlur="addUserPass(this)"> 
					<br>Password: <input type="text" name="pass0" onblur="addUserPass(this)">
				</div>
				<br><input type="button" value="Continue" onclick="checkAccounts(2)"><input type="button" value="More" onclick="checkAccounts(2,'more')">
			</div>
			<div class="errorfoot">&nbsp;</div>
		</div>

		<div class="error" id="problemerror">
			<div class="errorhead">&nbsp;</div>
			<div class="errorbody">
				Please select at least one of the problems from the menu below:
				<br>
				<select name="probs" onchange="addProb('check')" id="probs-check">
					<option value="">---</option>
				</select>
				<div id="out-check"></div>
				<input type="text" name="probTextS" size="60" maxlength="255" class="hidden" id="probS-check">
				<br><input type="button" value="Continue" onclick="checkProbs(2)">
			</div>
			<div class="errorfoot">&nbsp;</div>
		</div>

		<div class="error" id="nameError">
			<div class="errorhead"></div>
			<div class="errorbody">
				<div id="errorMessage"></div>
				Please enter your NUID below:<br>
				First Name: <input name="given" type="text">
				Last Name: <input name="sur" type="text">
				<input type="button" value="Continue" onclick="checkUserName(2)">
			</div>
			<div class="errorfoot"></div>
		</div>

		<div class="error" id="confirm">
			<div class="errorhead">&nbsp;</div>
			<div class="errorbody">
				By clicking "Continue" below I hereby state that I have read and agree with the following:
				<br>I understand the Computer Help Center is not responsible for pre-existing problems, damage resulting from pre-existing problems, or damage to the computer that is not a direct result of actions of a Computer Help Center employee. I understand some work done by Computer Help Center technicians may void any warranties on my computer, and that I am responsible for knowing the terms &amp; conditions of my computer's warranty. If I am checking in an Apple computer, I acknowledge that diagnostic data, including the serial number of my computer, will be sent to and kept by Apple. Apple only uses this information to troubleshoot and address issues concerning my computer. The Computer Help Center is not responsible for lost data; I am responsible for backing up my data before bringing in the computer. We will make every effort to contact you when your computer is finished. Computers that have not been picked up for more than a year may be considered unclaimed or abandoned, and may become property of UNL Inventory.
				<br><input id="outFormSubmit" type="button" value="Continue" onclick="this.disabled=true;document.outForm.submit();">
				<input type="button" value="Review" onclick="toggleCheck('off');">
				<input type="button" value="Cancel" onclick="cancelAction()">
			</div>
			<div class="errorfoot">&nbsp;</div>
		</div>

		<div class="error" id="existingComp">
			<div class="errorhead">&nbsp;</div>
			<div class="errorbody">
				<div id="existingCompList"></div>
					<br><input type="button" value="Continue" onclick="updateComps()">
				</div>
			<div class="errorfoot">&nbsp;</div>
		</div>

		<div class="error" id="existingMail">
			<div class="errorhead">&nbsp;</div>
			<div class="errorbody">
				<div id="existingMailList"></div>
				<br><input type="button" value="Continue" onclick="updateMail()">
			</div>
			<div class="errorfoot">&nbsp;</div>
		</div>

		<div class="error" id="existingPhone">
			<div class="errorhead">&nbsp;</div>
			<div class="errorbody">
				<div id="existingPhoneList"></div>
				<br><input type="button" value="Continue" onclick="updatePhone()">
			</div>
			<div class="errorfoot">&nbsp;</div>
		</div>

		<div class="error" id="checkOut">
			<div class="errorhead">&nbsp;</div>
			<div class="errorbody">
				You have a computer(s) that is ready to be picked up.  Do you also have a computer that you are dropping off?
				<br><input type="button" value="Yes" onclick="checkOut('yes')"><input type="Submit" value="No">
			</div>
			<div class="errorfoot">&nbsp;</div>
		</div>

		<div class="error" id="backup"> <!-- style="display:inline" -->
			<div class="errorhead"></div>
			<div class="errorbody">
				Do you have a current (within the last two weeks) backup of your data?
				<br><input type="button" value="Yes" onclick="updateBackup('y')"><input type="button" value="No" onclick="updateBackup('n')">
			</div>
			<div class="errorfoot"></div>
		</div>

		<div class="error" id="streetAddress"> <!-- style="display:inline" -->
			<div class="errorhead"></div>
			<div class="errorbody">
				Due to to requirements for warranty repair work we need to have your current street address.
				<br>Address: <input name="street" type="text">
				<br>City: <input name="city" type="text">
				State: <input name="state" type="text" size="2">
				Zip: <input name="zip" type="text" size="8">
				<br><input type="button" value="Continue" onclick="checkStreeAddress(2)">
			</div>
			<div class="errorfoot"></div>
		</div>

		<div class="error" id="errorBox">
			<div class="errorhead"></div>
			<div class="errorbody">
				<div id="errorMessage"></div>
				Please enter your NUID below:<br>
				<input name="cardErrorNuid" type="text" size="8">
				<input type="button" value="Continue" onclick="invalidCard()">
			</div>
			<div class="errorfoot"></div>
		</div>

		<div class="error" id="feeAgreement">
			<div class="errorhead"></div>
			<div class="errorbody">
				<span style="font-size:14px;font-weight:bold;">There is a minimum service fee of $45 on all computers checked in.</span><br>(This fee is waived for the one free virus/spyware cleaning per year available only to current faculty, staff and students)
				<p style="passing-left:10px;"><br><input type="radio" name="feeAgreeRadio" value="1"> I agree to the fee
				<br><input type="radio" name="feeAgreeRadio" value="0"> I do not agree to the fee, and will not check-in my computer.</p>
				<br><input type="button" value="Continue" onclick="feeAgree()">
			</div>
			<div class="errorfoot"></div>
		</div>

		<div class="error" id="saveBox">
			<div class="errorhead"></div>
			<div class="errorbody">
				<div style="width:100%; text-align:center;">
					Saving...
				</div>
			</div>
			<div class="errorfoot"></div>
		</div>
	</form>
