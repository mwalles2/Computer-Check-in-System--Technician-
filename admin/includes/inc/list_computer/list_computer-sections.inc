	<div class="row top_space">
		<div class="cell header bottom_border" style="width:100%">
			<div class="cell">{LONGNAME}</div>
			<div class="cell float_right"><input name="{SHORTNAME}" type="button" value="{HIDESHOWTEXT}" onclick="hideShow(this)"></div>
		</div>
	</div>
	<div id="{SHORTNAME}" class="{HIDESHOWCLASS}">
		<div class="row">
			<div class="cell header" style="width:2%">#</div>
			<div class="cell header" style="width:18%">TID</div>
			<div class="cell header" style="width:20%">User</div>
			<div class="cell header" style="width:20%">In Date</div>
			<div class="cell header computer_type_col">Brand</div>
			<div class="cell header computer_type_col">Type</div>
			<div class="cell header location_col">Location</div>
		</div>
		<div class="computer_list">
{COMPUTERS}		</div>
	</div>
