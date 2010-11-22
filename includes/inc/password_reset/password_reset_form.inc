		<div id="resetSection" style="display:none;">
			<div id="errorMessageReset" style="display:none; border: 3px red solid; padding: 10px; width: 80%; margin: 0 10% 20px 10%; text-align:center;"></div>
			<form name="resetForm" action="javascript:resetPasword()">
				<div class="row">
					<div class="cell" style="width:100%;">
						<span id="resetFormName">NAME</span>, Please entery your password twice below to reset your password.
					</div>
				</div>
				<div class="row top_space">
					<div class="cell" style="width:20%;">
						Password
					</div>
					<div class="cell" style="width:30%;">
						<input type="password" name="password">
					</div>
					<div class="cell" style="width:20%;">
						Reenter Password
					</div>
					<div class="cell" style="width:30%;">
						<input type="password" name="repassword">
					</div>
				</div>
				<div class="row top_space">
					<input type="submit" value="Continue" /><input type="button" value="Cancel" onclick="cancelAction()" /><input type="hidden" name="new" value="true" /><input type="hidden" value="" name="resetFormNuid">
				</div>
			</form>
		</div>
