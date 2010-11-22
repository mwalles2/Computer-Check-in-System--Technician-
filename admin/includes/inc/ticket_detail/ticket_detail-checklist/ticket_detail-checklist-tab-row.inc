			<tr id="checklistItem{COUNTER}Row" class="{STATUS}" onmouseover="checlistNoteHideShow('checklistItem{COUNTER}Note','s')" onmouseout="checlistNoteHideShow('checklistItem{COUNTER}Note','h')">
				<td widht="5%">
					<select name="checklistItem{COUNTER}Select" onchange="checklistStatus(this)">
						<option value=""></option>
						<option value="empty"{SELECTEMPTY}>&#8709;</option>
						<option value="done"{SELECTDONE}>&radic;</option>
					</select>
				</td>
				<td width="90%">
					<div class="cell" id="checklistItem{COUNTER}NoteStatus" style="width:2%">{NOTESTATUS}</div>
					<div class="cell" style="width:98%">
						{CHECKLISTTEXT}
					</div>
					<div class="hidden" id="checklistItem{COUNTER}Note">{NOTES}</div>
					<div class="hidden" id="checklistItem{COUNTER}Add">
						<input type="text" size="60" id="checklistItem{COUNTER}AddBox">
						<input type="button" style="float:right" name="checklistItem{COUNTER}AddCancel" value="Cancel" onclick="addNote(this,'cancel')">
						<input type="button" style="float:right" name="checklistItem{COUNTER}AddAdd" value="Add" onclick="addNote(this,'add')">
					</div>
				</td>
				<td width="5%" style="text-align:right;">
					<input type="button" name="checklistItem{COUNTER}AddButton" value="+" onclick="addNote(this,'show')">
				</td>
			</tr>
