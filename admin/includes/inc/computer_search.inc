	<div id="updating">Updating . . .</div>
	<form action="javascript:ticketSearch()" name="searchForm">
		<div class="row">
			<div id="search" class="cell" style="width:100%">
				<div class="cell" style="width:10%">
					<input type="button" value="Search" onclick="ticketSearch()" />
				</div>
				<div class="cell" style="width:55%">
					<input name="search" type="text" size="40" />
				</div>
				<div class="cell" style="width:20%">
					Sort by:
					<select onclick="sortSearch(this[this.selectedIndex].value)">
						<option value="last">Last Name</option>
						<option value="first">First Name</option>
					</select>
				</div>
				<div class="cell" style="width:15%">
					Advanced:
					<input type="checkbox" onclick="advShowHide('search','advSearch',this)" disabled>
				</div>
			</div>
		</div>
		<div id="advSearch" style="display:none;">
			<div class="row">
				<div class="cell" style="border: #000 solid; border-width: 0 1px 0 1px; width:98%; margin:0 1% 0 1%; background:#ccc;">
					<div class="cell" style="width:15%;">
						Last Name:
					</div>
					<div class="cell">
						<input type="text" size="20" />
					</div>
				</div>
				<div class="cell" style="border: #000 solid; border-width: 0 1px 0 1px; width:98%; margin:0 1% 0 1%; background:#ccc;">
					<div class="cell" style="width:15%;">
						First Name:
					</div>
					<div class="cell">
						<input type="text" size="20" />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="cell" style="border: #000 solid; border-width: 0 1px 0 1px; width:98%; margin:0 1% 0 1%; background:#ccc;">
					<div class="cell" style="width:15%">
						Status:
					</div>
					<div class="cell">
						<select>
							<option value="">Is</option>
							<option value="" selected>Is Not</option>
							<option value="">Was</option>
						</select>
					</div>
					<div class="cell">
						<select>
							<option value="new">New</option>
							<option value="work">Work in progress</option>
							<option value="user">Waiting for user</option>
							<option value="done">Done</option>
							<option value="done" selected>Picked Up</option>
						</select>
					</div>
					<div class="cell" style="width:7%; float:right; text-align:right;">
						<input type="button" value="-">
					</div>
				</div>
			</div>
			<div class="row" style="">
				<div class="cell" style="border: #000 solid; border-width: 0 1px 0 1px; width:98%; margin:0 1% 0 1%; background:#ccc;">
					<div class="cell" style="width:15%; text-align:right;">
						<select>
							<option value="">and</option>
							<option value="" selected>or</option>
						</select
					</div>
					<div class="cell">
						<select>
							<option value="">Is</option>
							<option value="">Is Not</option>
							<option value="" selected>Was</option>
						</select>
					</div>
					<div class="cell">
						<select>
							<option value="new">New</option>
							<option value="work">Work in progress</option>
							<option value="user">Waiting for user</option>
							<option value="done">Done</option>
							<option value="done" selected>Picked Up</option>
						</select>
					</div>
					<div class="cell">
						<select>
							<option value="">After</option>
							<option value="">Before</option>
							<option value="" selected>In the Last</option>
						</select>
						<input type="text" size="2" value="30"> Days
					</div>
					<div class="cell" style="width:7%; float:right; text-align:right;">
						<input type="button" value="-">
						<input type="button" value="+">
					</div>
				</div>
			</div>
			<div class="row">
				<div class="cell" style="border: #000 solid; border-width: 0 1px 0 1px; width:98%; margin:0 1% 0 1%; background:#ccc;">
					<div class="cell" style="width:15%">
						Computer Type
					</div>
					<div class="cell" style="width:25%">
						<select>
							<option value="">Any</option>
							<option value="">Desktop</option>
							<option value="">Laptop</option>
						</select>
					</div>
					<div class="cell" style="width:55%">
						<br>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="cell" style="border: #000 solid; border-width: 0 1px 0 1px; width:98%; margin:0 1% 0 1%; background:#ccc;">
					<div class="cell" style="width:15%">
						NUID
					</div>
					<div class="cell">
						<input type="text" size="20" />
					</div>
					<div class="cell">
						<br>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="cell" style="border: #000 solid; border-width: 0 1px 0 1px; width:98%; margin:0 1% 0 1%; background:#ccc;">
					<div class="cell" style="width:15%">
						MAC Address
					</div>
					<div class="cell">
						<input type="text" size="20" />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="cell" style="border: #000 solid; border-width: 0 1px 0 1px; width:98%; margin:0 1% 0 1%; background:#ccc;">
					<div class="cell" style="width:15%">
						E-Mail
					</div>
					<div class="cell">
						<input type="text" size="20" />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="cell" style="border: #000 solid; border-width: 0 1px 1px 1px; width:98%; margin:0 1% 0 1%; background:#ccc;">
					<div class="cell" style="width:15%">
							Ticket Number
					</div>
					<div class="cell">
						<input type="text" size="20" />
					</div>
				</div>
			</div>
		</div>
	</form>

	<div class="row top_space"></div>

	<div id="searchResults"></div>