		<div id="charge{ID}Row" class="row">
			<div class="cell" style="width:33%">
				<input type="checkbox" id="charge{ID}Check" name="charge{ID}Check" value="true" onclick="chargeUpdatePredefinedRateAjax(this,'{ROWID}')"{ISCHECKED}>
			</div>
			<div class="cell" style="width:34%">
				{TITLE}
			</div>
			<div class="cell" style="width:33%">
				{RATEFORMATED}
				<input type="hidden" name="charge{ID}Rate" value="{RATE}">
			</div>
		</div>
			
			