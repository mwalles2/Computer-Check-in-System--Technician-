			<div class="row">
				<div class="cell header bottom_border" style="width:100%;">Survey</div>
			</div>
			<div class="row">
				<div class="cell" style="width:100%">
					<div id="urlEditBox" class="cell editbox" onclick="startEdit(this)">
						<label for="urlTextInput" style="margin-right: 5px;">URL:</label>
						<span id="urlTextDiv" class="displayText">{URLTEXT}</span>
						<input type="text" name="urlTextInput" id="urlTextInput" size="80" value="{URLTEXT}" />
						<input type="button" name="save" value="Save" style="float:right;" class="saveButton" onclick="saveEdit('urlEditBox','urlText')" />
						<input type="button" name="cancel" value="Cancel" style="float:right;" onclick="cancelEdit('urlEditBox','urlText')" />
					</div>
				</div>
			</div>
			<div class="row top_space">
				<div class="cell header bottom_border" style="width:100%;">Schedule</div>
			</div>
			<div class="row">
				<div class="cell" style="width:100%">
					<div class="warning">Feature Not Yet Implemented</div>
				</div>
			</div>
			<div class="row top_space">
				<div class="cell header bottom_border" style="width:100%;">Email Message</div>
			</div>
			<div class="row">
				<div class="cell" style="width:100%">
					<div id="subjectEditBox" class="cell editbox" onclick="startEdit(this)">
						<label for="subjectTextInput" style="margin-right: 5px;">Subject:</label>
						<span id="subjectTextDiv" class="displayText">{SUBJECTTEXT}</span>
						<input type="text" name="subjectTextInput" id="subjectTextInput" size="80" value="{SUBJECTTEXT}" />
						<input type="button" name="save" value="Save" style="float:right;" class="saveButton" onclick="saveEdit('subjectEditBox','subjectText')" />
						<input type="button" name="cancel" value="Cancel" style="float:right;" onclick="cancelEdit('subjectEditBox','subjectText')" />
					</div>
					<div id="returnEditBox" class="cell editbox" onclick="startEdit(this)">
						<label for="returnTextInput" style="margin-right: 5px;">Return Address:</label>
						<span id="returnTextDiv" class="displayText">{RETURNHTML}</span>
						<input type="text" name="returnTextInput" id="returnTextInput" size="80" value="{RETURNTEXT}" />
						<input type="button" name="save" value="Save" style="float:right;" class="saveButton" onclick="saveEdit('returnEditBox','returnText')" />
						<input type="button" name="cancel" value="Cancel" style="float:right;" onclick="cancelEdit('returnEditBox','returnText')" />
					</div>
				</div>
				<div class="cell" style="width:60%">
					<div id="emailEditBox" class="cell editbox" onclick="startEdit(this)">
						<div id="emailTextDiv" class="displayText" wstyle="margin: 2%; width:96%;">{EMAILHTML}</div>
						<textarea name="emailTextInput" id="emailTextInput" style="margin: 2%; width:96%; height:140px;">{EMAILTEXT}</textarea>
						<br><input type="button" name="cancel" value="Cancel" onclick="cancelEdit('emailEditBox','emailText')" />
						<input type="button" name="save" value="Save" class="saveButton" onclick="saveEdit('emailEditBox','emailText')" />
					</div>
				</div>
				<div class="cell" style="width:36%; padding: 2%;">
					<span style="font-weight:bold;text-decoration:underline;">Place holders</span>
					<ul style="list-style-type:none; margin:0; padding:0;">
						<li>
							<dt onclick="addText('{CUSTOMERNAME}','emailTextInput')">
								&#123;CUSTOMERNAME&#125;
							</dt>
							<dd>
								The customer's full name
							</dd>
						</li>
						<li>
							<dt onclick="addText('{CUSTOMERCOMPUTER}','emailTextInput')">
								&#123;CUSTOMERCOMPUTER&#125;
							</dt>
							<dd>
								The brand and type of computer that this repair is about
							</dd>
						</li>
						<li>
							<dt onclick="addText('{SURVEYLINK}','emailTextInput')">
								&#123;SURVEYLINK&#125;
							</dt>
							<dd>
								The link to the survey
							</dd>
						</li>
					</ul>
				</div>
			</div>
