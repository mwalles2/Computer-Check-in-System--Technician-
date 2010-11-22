	<form id="mainForm" name="mainForm">
		<div class="row">
			<div class="cell" style="width:33%;">
				Show:
				<select id="show" name="show" onchange="hideType(this)">
					<option value="all">All</option>
					<option value="desk">only Desktops</option>
					<option value="lap">only Laptops</option>
				</select>
			</div>
			<div class="cell" style="width:34%; text-align:center;">
				Highlight:
				<select id="highlight" name="show" onchange="highlightRow(this)">
					<option value="none">None</option>
					<option value="desk">oldest Desktops</option>
					<option value="lap">oldest Laptops</option>
				</select>
			</div>
			<div class="cell" style="width:33%; text-align:right;">
				Location:
				<select name="locationSelect" onchange="showLocation()"> <!-- onchange="showLocation()" -->
					<option value="All">All</option>
{LOCATIONSELECT}				</select>
			</div>
		</div>
	</form>
