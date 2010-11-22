		<div id="chargePart{ID}Row" class="row_narrow">
			<div class="cell" style="width:10%">
				{PARTNUM}
				<input type="hidden" name="chargePart{ID}Rate" value="{PRICE}">
				<input type="hidden" name="chargePart{ID}Qty" value="{QTY}">
			</div>
			<div class="cell" style="width:60%">
				{DESCRIPTION}
			</div>
			<div class="cell" style="width:10%">
				{PRICEFORMATED}
			</div>
			<div class="cell" style="width:5%">
				{QTY}
			</div>
			<div class="cell" style="width:10%">
				{TOTAL}
			</div>
			<div class="cell" style="width:5%">
				<input type="button" value="-" onclick="chargeRemovePartAjax('{ID}')">
			</div>
		</div>
