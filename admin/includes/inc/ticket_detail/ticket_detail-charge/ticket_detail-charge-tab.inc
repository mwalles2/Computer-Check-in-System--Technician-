	<div id="tabCharges" style="display:none; width:auto;">
		<div class="row">
			<div style="color: #C00; font-size: large; font-weight: bold; text-align:center;">
				Not Currently Active
			</div>
		</div>
		<div class="row">
			<div class="cell bottom_border" style="width:100%">
				<div class="cell header" style="width:12%">
					Subtotal:
				</div>
				<div class="cell" id="chargeSubTotal" style="width:13%">
					${SUBTOTAL}
				</div>
				<div class="cell header" style="width:12%">
					Tax Exempt:
				</div>
				<div class="cell" style="width:13%">
					<input type="checkbox" name="chargeTaxable" onclick="chargeUpdateTaxAjax()"{HASTAX}>
				</div>
				<div class="cell header" style="width:12%">
					Tax:
					<input name="chargeTax" type="hidden" value="{TAX}">
				</div>
				<div class="cell" id="chargeTaxTotal" style="width:13%">
					${TAXTOTAL}
				</div>
				<div class="cell header" style="width:12%">
					Total Cost:
				</div>
				<div class="cell" id="chargeTotal" style="width:13%">
					${TOTALCOST}
				</div>
			</div>
		</div>
		<div class="row">
			<div class="cell header bottom_border top_space" style="width:100%">
				Labor Charges
			</div>
		</div>
		<div class="row">
			<div class="cell" style="width:16%">
				Hours:
			</div>
			<div class="cell" style="width:17%">
				<input name="chargeLaborHours" type="text" value="{LABORHOURS}" size="5" onKeyUp="chargeUpdateLabor()">
				<input name="chargeLaborHoursId" type="hidden" value="{LABORHOURSID}">
			</div>
			<div class="cell" style="width:17%">
				Express Rate:
				<input name="chargeExpressRate" type="hidden" value="{EXPRESSRATE}">
			</div>
			<div class="cell" style="width:17%">
				<input name="chargeIsExpressRate" type="checkbox" value="true" onchange="chargeUpdateExpress()"{ISEXPRESS}>
			</div>
			<div class="cell" style="width:17%">
				Total:
				<input name="chargeLaborRate" type="hidden" value="{LABORRATE}">
			</div>
			<div class="cell" style="width:16%">
				<div id="chargeLaborTotalDiv">{LABORTOTALFORMATED}</div>
				<input name="chargeLaborTotal" type="hidden" value="{LABORTOTAL}">
			</div>
		</div>
		<div class="row">
			<div class="cell header bottom_border top_space" style="width:100%">
				Predefined Charges
			</div>
		</div>{PREDEFINED}
		<div class="row">
			<div class="cell header bottom_border top_space" style="width:100%">
				Parts
			</div>
		</div>{PARTS}
	</div>