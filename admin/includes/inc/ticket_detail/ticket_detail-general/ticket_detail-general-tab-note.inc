			<div id="{TYPE}Note{COUNTER}" class="row">
				<div id="{TYPE}Note{COUNTER}Info" class="cell top_border" style="width: 25%">
					{TECH}
					<div id="{TYPE}Note{COUNTER}Date">{DATE}</div>
				</div>
				<div id="{TYPE}Note{COUNTER}Note" class="cell top_border" style="width: 70%">
					{NOTE}
				</div>
				<div class="cell top_border" style="width: 5%; text-align:right;{EXTARSTYLE}">
					<input type="checkbox" id="{TYPE}Note{COUNTER}Button" name="{TYPE}Note{COUNTER}Button" onclick="moveNote(this)"{EXTARSTYLE}>
				</div>
			</div>
