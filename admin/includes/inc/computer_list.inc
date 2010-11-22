	<div class="row">
		<div class="cell" style="width:50%">
			Show:
			<select id="show" name="show" onchange="hideType(this)">
				<option value="all">All</option>
				<option value="desk">only Desktops</option>
				<option value="lap">only Laptops</option>
			</select>
		</div>
		<div class="cell" style="width:50%">
			Highlight:
			<select id="highlight" name="show" onchange="highlightRow(this)">
				<option value="none">None</option>
				<option value="desk">oldest Desktops</option>
				<option value="lap">oldest Laptops</option>
			</select>
		</div>
	</div>
	<div class="row">
		<div class="cell header bottom_border" style="width:100%">
			<div class="cell">New</div>
			<div class="cell float_right"><input name="new" type="button" value="Hide" onclick="hideShow(this)"></div>
		</div>
	</div>
	<div id="tech">
		<div class="row">
			<div class="cell header" style="width:2%">#</div>
			<div class="cell header" style="width:18%">TID</div>
			<div class="cell header" style="width:20%">User</div>
			<div class="cell header" style="width:20%">In Date</div>
			<div class="cell header" style="width:20%">Brand</div>
			<div class="cell header" style="width:20%">Type</div>
		</div>
{TECH}	</div>
	<div id="new">
		<div class="row">
			<div class="cell header" style="width:2%">#</div>
			<div class="cell header" style="width:18%">TID</div>
			<div class="cell header" style="width:20%">User</div>
			<div class="cell header" style="width:20%">In Date</div>
			<div class="cell header" style="width:20%">Brand</div>
			<div class="cell header" style="width:20%">Type</div>
		</div>
{NEW}	</div>
	<div class="row top_space">
		<div class="cell header bottom_border" style="width:100%">
			<div class="cell">Waiting on Tech</div>
			<div class="cell float_right"><input name="tech" type="button" value="Hide" onclick="hideShow(this)"></div>
		</div>
	</div>
	<div class="row top_space">
		<div class="cell header bottom_border" style="width:100%">
			<div class="cell">Waiting on Part</div>
			<div class="cell float_right"><input name="part" type="button" value="Show" onclick="hideShow(this)"></div>
		</div>
	</div>
	<div id="part" class="hidden">
		<div class="row">
			<div class="cell header" style="width:2%">#</div>
			<div class="cell header" style="width:18%">TID</div>
			<div class="cell header" style="width:20%">User</div>
			<div class="cell header" style="width:20%">In Date</div>
			<div class="cell header" style="width:20%">Brand</div>
			<div class="cell header" style="width:20%">Type</div>
		</div>
{PART}	</div>
	<div class="row top_space">
		<div class="cell header bottom_border" style="width:100%">
			<div class="cell">Waiting on Quote</div>
			<div class="cell float_right"><input name="price" type="button" value="Show" onclick="hideShow(this)"></div>
		</div>
	</div>
	<div id="price" class="hidden">
		<div class="row">
			<div class="cell header" style="width:2%">#</div>
			<div class="cell header" style="width:18%">TID</div>
			<div class="cell header" style="width:20%">User</div>
			<div class="cell header" style="width:20%">In Date</div>
			<div class="cell header" style="width:20%">Brand</div>
			<div class="cell header" style="width:20%">Type</div>
		</div>
{PRICE} </div>
	<div class="row top_space">
		<div class="cell header bottom_border" style="width:100%">
			<div class="cell">Work in Progress</div>
			<div class="cell float_right"><input name="work" type="button" value="Show" onclick="hideShow(this)"></div>
		</div>
	</div>
	<div id="work" class="hidden">
		<div class="row">
			<div class="cell header" style="width:2%">#</div>
			<div class="cell header" style="width:18%">TID</div>
			<div class="cell header" style="width:20%">User</div>
			<div class="cell header" style="width:20%">In Date</div>
			<div class="cell header" style="width:20%">Brand</div>
			<div class="cell header" style="width:20%">Type</div>
		</div>
{WORK}	</div>
	<div class="row top_space">
		<div class="cell header bottom_border" style="width:100%">
			<div class="cell">Waiting on User</div>
			<div class="cell float_right"><input name="wait" type="button" value="Show" onclick="hideShow(this)"></div>
		</div>
	</div>
	<div id="wait" class="hidden">
		<div class="row">
			<div class="cell header" style="width:2%">#</div>
			<div class="cell header" style="width:18%">TID</div>
			<div class="cell header" style="width:20%">User</div>
			<div class="cell header" style="width:20%">In Date</div>
			<div class="cell header" style="width:20%">Brand</div>
			<div class="cell header" style="width:20%">Type</div>
		</div>
{USER}	</div>
	<div class="row top_space">
		<div class="cell header bottom_border" style="width:100%">
			<div class="cell">At Repair Center</div>
			<div class="cell float_right"><input name="repair" type="button" value="Show" onclick="hideShow(this)"></div>
		</div>
	</div>
	<div id="repair" class="hidden">
		<div class="row">
			<div class="cell header" style="width:2%">#</div>
			<div class="cell header" style="width:18%">TID</div>
			<div class="cell header" style="width:20%">User</div>
			<div class="cell header" style="width:20%">In Date</div>
			<div class="cell header" style="width:20%">Brand</div>
			<div class="cell header" style="width:20%">Type</div>
		</div>
{REPAIR} </div>
	<div class="row top_space">
		<div class="cell header bottom_border" style="width:100%">
			<div class="cell">DONE</div>
			<div class="cell float_right"><input name="done" type="button" value="Show" onclick="hideShow(this)"></div>
		</div>
	</div>
	<div id="done" class="hidden">
		<div class="row">
			<div class="cell header" style="width:2%">#</div>
			<div class="cell header" style="width:18%">TID</div>
			<div class="cell header" style="width:20%">User</div>
			<div class="cell header" style="width:20%">In Date</div>
			<div class="cell header" style="width:20%">Brand</div>
			<div class="cell header" style="width:20%">Type</div>
		</div>
{DONE} </div>