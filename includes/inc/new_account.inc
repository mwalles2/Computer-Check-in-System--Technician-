				<form action="javascript:newAccountCheckForm()" name="mainForm" method="post">
					<div  style="width:80%; margin: 0 10% 0 10%; padding: 0 0 20px 0;">
						<div style="padding: 0 0 20px 0;">
							We do not currently have an account for you on record.  
							To help insure the ablity for us to contact you when your
							computer is ready or if we have any questions about the 
							repair(s) to your computer please enter current contact 
							information below.  Also, the email address and the 
							password that you enter below will be need for you to 
							login to our system when you pick-up your computer or if 
							you ever leave another computer with us.
						</div>

						<div id="errorMessage" style="display:none; border: 3px red solid; padding: 10px; width: 80%; margin: 0 10% 20px 10%; text-align:center;"></div>

						<div style="float:left; width: 15%;" id="first">First Name:</div>
						<div style="float:left; padding:0 2% 0 2%;"><input type="text" name="first" /></div>
						<div style="float:left; width: 15%;" id="last">Last Name:</div>
						<div style="float:left; padding:0 2% 0 2%;"><input type="text" name="last" /></div>

						<br style="clear:both" />
						<div style="float:left; width: 15%;" id="email">Email:</div>
						<div style="float:left; padding:0 2% 0 2%;"><input type="text" name="email" /></div>

						<br style="clear:both" />
						<div style="float:left; width: 15%;" id="reemail">Verify Email:</div>
						<div style="float:left; padding:0 2% 0 2%;"><input type="text" name="reemail" /></div>
			
						<br style="clear:both" />
						<div style="float:left; width: 15%;" id="password">Password:</div>
						<div style="float:left; padding:0 2% 0 2%;"><input type="password" name="password" /></div>

						<div style="clear:both" />
						<div style="float:left; width: 15%;" id="repassword">Re-Enter Password:</div>
						<div style="float:left; padding:0 2% 0 2%;"><input type="password" name="repassword" /></div>

						<br style="clear:both" />
						{TEST}<input type="submit" value="Continue" /><input type="button" value="Cancel" onclick="cancelAction()" /><input type="hidden" name="new" value="true" />
					</div>
				</form>
