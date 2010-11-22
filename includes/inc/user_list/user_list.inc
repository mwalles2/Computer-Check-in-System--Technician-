			<form name="mainForm" action="javascript:checkout()" method="post">
				<div class="row" style="text-align:center;">
					You have the following computers currently checked into our system.
					Please select any that you would like to pick up or select the checkbox
					at the bottom if you would like to drop off another computer.
				</div>
				<div id="errorMessage" style="display:none; border: 3px red solid; padding: 10px; width: 80%; margin: 0 10% 20px 10%; text-align:center;"></div>
{CONTENTS}
				<br />
				<fieldset class="setHeader" style="padding:0 0 0 5%; clear:both; font-weight:bold;">
					<legend style="color:#c00;">
						Leaving a computer
					</legend>
					<div class="row_wide">
						<div class="cell" style="width:5%">
							<input type="checkbox" value="new" name="newcomputer" onclick="updateNewBox(this)" />
						</div>
						<div class="cell" style="width:95%">
							I am dropping off a new computer.
						</div>
					</div>
				</fieldset>
				<div class="row top_space">
					<input type="submit" value="Continue" />
					<input type="button" value="Cancel" onclick="cancelAction()" />
				</div>
			</form>
			<form name="outForm" action="checkout.php" method="post">
				<div class="error" id="checkout">
					<div class="errorhead"></div>
					<div class="errorbody">
						<div class="cell bottom_space" style="clear:both; width:100%;">
							{USERNAME} is checking out the following <span>computer</span>:
						</div>
						<div class="cell top_space" style="clear:both; width:470px;">
							<div class="cell bottom_border" style="width:100%;">
								<div class="cell" style="width:33%">Ticket Number</div>
								<div class="cell" style="width:33%;">Computer</div>
								<div class="cell" style="width:33%;">Serial Number</div>
							</div>
						</div>
{OUTCOMPUTERS}
						<div class="cell top_space" style="width:100%">If this is correct please please wait for one of our techs to retrieve <span>it</span>, and finish the check out process.  Otherwise please click on cancel below to change.</div>
							<input type="button" value="Cancel" onclick="toggleOut('off')">
						</div>
					<div class="errorfoot"></div>
				</div>
				<input type="hidden" name="newcomputer" value="false">
				<input type="hidden" name="techid" value="">
			</form>
			<div id="card" style="display:none;"></div>


