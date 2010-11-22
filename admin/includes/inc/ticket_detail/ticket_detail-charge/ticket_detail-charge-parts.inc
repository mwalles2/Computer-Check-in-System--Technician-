		<div class="row">
			<div class="cell greyBg side_borders">
				<div class="cell header" style="width:10%">
					Part #
				</div>
				<div class="cell header" style="width:40%">
					Description
				</div>
				<div class="cell header" style="display:none">
					Manuf. Part #
				</div>
				<div class="cell header" style="display:none">
					Cost
				</div>
				<div class="cell header" style="width:20%">
					Price
				</div>
				<div class="cell header" style="width:16%">
					Qty.
				</div>
				<div class="cell header" style="width:4%">
					&nbsp;
				</div>
			</div>
		</div>
		<div class="row">
			<div class="cell greyBg bottom_side_borders">
				<div class="cell" style="width:10%">
					<input name="chargeNewPartNum" type="text" size="6" onkeyup="if(this.value.length==6) {chargeGetPartNum()}">
				</div>
				<div class="cell" style="width:40%"> <!-- style="width:28%" -->
					<div id="chargeNewDescriptionDiv">&nbsp;</div><input name="chargeNewDescription" type="text" size="20" style="display:none">
				</div>
				<div class="cell" style="display:none"> <!-- style="width:19%"> -->
					<input name="chargeNewManPartNum" type="text" size="10">
				</div>
				<div class="cell" style="display:none"> <!-- style="width:10%" -->
					$<input name="chargeNewCost" type="text" size="7">
				</div>
				<div class="cell" style="width:20%"> <!-- style="width:10%" -->
					<div id="chargeNewPriceDiv">&nbsp;</div><input name="chargeNewPrice" type="text" size="7" style="display:none">
				</div>
				<div class="cell" style="width:16%">
					<input name="chargeNewQty" type="text" size="3">
				</div>
				<div class="cell" style="width:4%">
					<input name="chargeNewAddButton" type="button" value="add" onclick="chargeAddPartAjax()">
				</div>
			</div>
		</div>
		<div id="chargeParts">
			<div class="row_narrow top_space">
				<div class="cell bottom_border" style="width:100%">
					<div class="cell header" style="width:10%">
						Part #
					</div>
					<div class="cell header" style="width:60%">
						Description
					</div>
					<div class="cell header" style="width:10%">
						Price
					</div>
					<div class="cell header" style="width:5%">
						Qty.
					</div>
					<div class="cell header" style="width:10%">
						Total
					</div>
					<div class="cell header" style="width:5%">
						&nbsp;
					</div>
				</div>
			</div>
{PARTS}		</div>