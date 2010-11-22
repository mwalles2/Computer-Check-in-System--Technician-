	<div id="tabGeneral">
		<div class="row">
			<div class="cell bottom_border" style="width:100%;">
				<div class="cell" style="width:{DATEWIDTH};">
					{DATE}
				</div>
				<div class="cell" style="width:{PRINTWIDTH}; text-align: center;">
					<input type="button" value="Print Ticket" onclick="printTicket('{TID}')">
				</div>
				<div class="cell" style="width:25%; text-align: center;{LOCATIONSTYLE}">
					Location:
					<select name="locationSelect" onchange="generalTabChangeLocationAjax()" style="{LOCATIONSELECTSTYLE}">
 {LOCATIONSELECT}					</select><div style="{LOCATIONNAMESTYLE}">{LOCATIONNAME}</div>
				</div>
				<div class="cell" style="width:{STATUSWIDTH}; text-align: right;">
					<select name="statusSelect" onchange="updateStatus(1)"{PICKEDUP}>
{STATUS}
{PICKEDUPSELECT}
					</select>{WORKINGTECH}
					<input name="currentStatus" type="hidden" value="{CURRENTSTAT}">
				</div>
			</div>
		</div>
		<div class="row">
			<div class="cell top_space" style="width:100%;">
				<div class="cell header" style="width:25%">
					Name
				</div>
				<div class="cell" style="width:25%">
					{USERNAME} <input type="button" class="hidden" value="Address" onclick="toggleAddress('on')"{SHOWADDRESS}>
				</div>
				<div class="cell header" style="width:25%">
					NUID
				</div>
				<div id="nuid" class="cell" style="width:25%">
					{NUID}
				</div>
			</div>
		</div>
		<div class="row">
			<div class="cell header" style="width:25%">
				Phone
			</div>
			<div  id="phone" class="cell" style="width:24%" ondbclick="edit('phone',this)">
				<div class="cell">
					{PHONENUMBER}
				</div>
			</div>
			<div class="cell" style="width:1%">&nbsp;</div>
			<div  class="cell header" style="width:25%">
				E-Mail
			</div>
			<div class="cell" style="width:25%">
				<div class="cell" id="email">
					{EMAILADDRESS}
				</div>
				<div class="cell" style="float: right;">
					<input name="email" type="button" value="E" onclick="edit('email',this)" disabled>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="cell header" style="width:25%">
				Brand
			</div>
			<div class="cell" style="width:25%">
				{BRAND}
			</div>
			<div  class="cell header" style="width:25%">
				Type
			</div>
			<div class="cell" style="width:25%">
				{TYPE}
			</div>
		</div>
		<div class="row top_space">
			<div class="cell header" style="width:25%">
				Serial Number
			</div>
			<div class="cell" style="width:24%">
				<div class="cell" id="serialnum-general">
					{SERIALNUM}
				</div>
				<div class="cell" style="float: right;">
					<input name="email" type="button" value="E" onclick="editMultiTab('serialnum','general',this)">
				</div>
			</div>
			<div class="cell" style="width:1%">&nbsp;</div>
			<div class="cell header" style="width:25%">
				Backup
			</div>
			<div class="cell">
				{BACKUP}
			</div>
		</div>
		<div class="row top_space">
			<div class="cell bottom_border" style="width:100%">
				<div class="cell header" style="width:25%">
					Network Cards
				</div>
				<div class="cell" style="width:25%">Address</div>
				<div class="cell" style="width:25%">Type</div>
				<div class="cell" style="width:20%">Form Factor</div>
				<div class="cell float_right">
					<input name="macAdd" type="button" value="+" onclick="addRow(this)">
				</div>
			</div>
		</div>
		<div id="macs">
{MACADDRESSES}		</div>
		<div class="row bottom_space">&nbsp;</div>
		<div class="row">
			<div class="cell header" style="width:33%">External Cards</div>
			<div class="cell" style="width:33%">
				<div class="cell">
					Ethernet:
				</div>
				<div id="cardEth" class="cell" style="padding:0 0 0 5px;">{CARDETH}</div>
 				<div class="cell" style="float: right;">
					<input type="button" value="E" onclick="edit('cardEth',this)">
				</div>
			</div>
			<div class="cell" style="width:1%">
				&nbsp;
			</div>
			<div class="cell" style="width:33%">
				<div class="cell">
					Wireless:
				</div>
				<div id="cardWireless" class="cell" style="padding:0 0 0 5px;">{CARDWIRELESS}</div>
				<div class="cell" style="float: right;">
					<input type="button" value="E" onclick="edit('cardWireless',this)">
				</div>
			</div>
		</div>
{LAPTOP}		<div class="row top_space">
			<div class="cell bottom_border" style="width:100%">
				<div class="cell header" style="width:33%">
					Accounts
				</div>
				<div class="cell" style="width:33%">Username</div>
				<div class="cell" style="width:29%">Password</div>
				<div class="cell float_right">
					<input name="accountAdd" type="button" value="+" onclick="addRow(this)">
				</div>
			</div>
		</div>
		<div id="accounts">
{ACCOUNTS}		</div>
		<div class="row bottom_space">&nbsp;</div>
		<div id="problemsHeader" class="row">
			<div class="cell header bottom_border" style="width:100%">
				Problems
			</div>
		</div>
		<div id="problemsData" class="row">
			<div class="cell greyBg bottom_side_borders">
{PROBLEMS}
			</div>
		</div>
		<div class="row bottom_space">&nbsp;</div>
		<div id="cdsHeader" class="row">
			<div class="cell header bottom_border" style="width:100%">
				CDs
			</div>
		</div>
		<div id="cdsData" class="row">
			<div class="cell greyBg bottom_side_borders">
{CDS}
			</div>
		</div>
		<div class="row bottom_space">&nbsp;</div>
		<div id="addNote">
			<div id="addNoteHeader" class="row">
				<div class="cell header bottom_border" style="width:100%">
					Add Notes
				</div>
			</div>
		</div>
		<div id="addNoteText" class="row">
			<div class="cell" style="width:100%; text-align: center;">
				<textarea rows="10" cols="80" name="comment"></textarea>
			</div>
		</div>
		<div id="addNoteButtons" class="row">
			<div class="cell" style="width:50%; text-align: center;">
				<select name="commentType">
					<option>Tech</option>
					<option>User</option>
				</select>
			</div>
			<div class="cell" style="width:50%; text-align: center;">
				<input type="button" value="Save" onclick="saveNote()">
			</div>
		</div>
		<div class="row top_space">
			<div id="userNotesHeader" class="{USERNOTEHEADERCLASS}" style="width:100%">
				<div class="cell header" style="width:50%">
					User Notes
				</div>
				<div class="cell float_right">
					<input name="userNotesHide" type="button" value="Hide" onclick="hideShow(this)">
				</div>
			</div>
		</div>
		<div id="userNotes">
{USERNOTES}		</div>
		<div class="row top_space">
			<div id="fromUserNotesHeader" class="{FROMUSERNOTEHEADERCLASS}" style="width:100%">
				<div class="cell header" style="width:50%">
					Notes From User
				</div>
				<div class="cell float_right">
					<input name="fromUserNotesHide" type="button" value="Hide" onclick="hideShow(this)">
				</div>
			</div>
		</div>
		<div id="fromUserNotes">
{FROMUSERNOTES}		</div>
		<div class="row top_space">
			<div id="techNotesHeader" class="{TECHNOTEHEADERCLASS}" style="width:100%">
				<div class="cell header" style="width:50%">
					Tech Notes
				</div>
				<div class="cell float_right">
					<input name="techNotesHide" type="button" value="Hide" onclick="hideShow(this)">
				</div>
			</div>
		</div>
		<div id="techNotes">
{TECHNOTES}		</div>
		<div class="row top_space">
			<div id="logNotesHeader" class="{LOGNOTEHEADERCLASS}" style="width:100%">
				<div class="cell header" style="width:50%">
					Log Notes
				</div>
				<div class="cell float_right">
					<input name="logNotesHide" type="button" value="Hide" onclick="hideShow(this)">
				</div>
			</div>
		</div>
		<div id="logNotes">
{LOGNOTES}		</div>
		<div class="row" style="display:none;">
			<input type="button" value="Saved" onclick="fade2('saved')">
			<input type="button" value="Failed" onclick="fade2('failed')">
		</div>

		<div class="error" id="streetAddress"> <!-- style="display:inline" -->
			<div class="errorhead"></div>
			<div class="errorbody">
				Address: {STREET}
				<br>City: {CITY}
				State: {STATE}
				Zip: {ZIP}
				<br><input type="button" value="Close" onclick="toggleAddress('off')">
			</div>
			<div class="errorfoot"></div>
		</div>

		<div class="error" id="waitUntil"> <!-- style="display:inline" -->
			<div class="errorhead"></div>
			<div class="errorbody">
				Wait until <input name="waitUntilDate" type="text" value="{UNTILDATE}"> <input name="waitUntilDateDefault" type="hidden" value="{UNTILDATE}">
				<br><input type="button" value="Continue" onclick="updateStatus(2)"> <input type="button" value="Cancel" onclick="updateStatus(3)">
			</div>
			<div class="errorfoot"></div>
		</div>
	</div>
	<div class="error" id="selectLocation"> <!-- style="display:inline" -->
		<div class="errorhead"></div>
		<div class="errorbody">
			Please select a valid location:
			<select name="locationSelectError">
 {LOCATIONSELECT}			</select>

			<br><input type="button" value="Continue" onclick="updateLocation()">
		</div>
		<div class="errorfoot"></div>
	</div>
