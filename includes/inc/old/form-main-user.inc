				<div class="row">
					<div id="nameAuto"><!-- inserted from xml -->
					<div id="nameHeader" class="cell label1">Name:</div>
					<div class="cell name" id="name"></div>
				</div>
					<div id="nameMan" style="display:none"><!-- this will be displayed if they are not in LDAP or LDAP is down -->
						<div id="givenManHeader" class="cell label1">First Name:</div>
						<div id="givenManInput" class="cell"><input type="text" name="given"></div>
						<div id="surManHeader" class="cell label1">Last name:</div>
						<div id="surManInput" class="cell"><input type="text" name="sur"></div>
					</div>
					<div class="cell label1">Date:</div> <div class="cell date" id="date"></div> <!-- inserted from javascript -->
				</div>
				<div class="row">
					<div class="cell">
						Phone:<input type="text" name="phone" value=""> Email address:<input type="text" name="email" value="">
					</div>
				</div>
				<div class="row">
					<div class="cell label1">NUID#:</div><div class="nuid" id="nuid"></div>
					<div class="cell label1">Student</div>
					<div class="cell facstaffstu" id="studentText">&nbsp;</div><input type="radio" name="facstaffstu" class="facstaffstu" id="studentRadio" value="student" onclick="document.outForm.facstaffstu.value=this.value">
					<div class="cell label1">Faculty</div>
					<div class="cell facstaffstu" id="facultyText">&nbsp;</div><input type="radio" name="facstaffstu" class="facstaffstu" id="facultyRadio" value="faculty" onclick="document.outForm.facstaffstu.value=this.value">
					<div class="cell label1">Staff</div>
					<div class="cell facstaffstu" id="staffText">&nbsp;</div><input type="radio" name="facstaffstu" class="facstaffstu" id="staffRadio" value="staff" onclick="document.outForm.facstaffstu.value=this.value">
					<div id="otherDiv" style="display:none">
						<div class="cell label1">Other</div>
						<div class="cell facstaffstu" id="otherText">X</div>
					</div>
				</div>
