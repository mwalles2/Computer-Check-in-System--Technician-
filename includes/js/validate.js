	function validatePhone(phone,output)
	{
		out = document.getElementById(output);
		if(chosenExistingPhone==phone.value&&existingPhoneBool)
		{
			out.style.display="none";
			return true;
		}
		else
		{
			re = /^(1?-?\ ?\(?(\d{3})?\)?[\.\-\/ ]?(\d{3}|[1-6])[\.\-\/ ]?(\d{4}))$|^NONE$/;
			if(re.test(phone.value))
			{
				outText=phone.value;
				validPhoneA=re.exec(phone.value);
				if (validPhoneA[0]==validPhoneA[1])
				{
					if (validPhoneA[2]==undefined)
					{
						switch(validPhoneA[3])
						{
							case "1":
							case "2":
								outText="47"+validPhoneA[3]+"-";
								break;
							case "3":
								outText="1 (402) 584-";
								break;
							case "4":
								outText="1 (402) 624-";
								break;
							case "5":
								outText="1 (402) 370-";
								break;
							case "6":
								outText="436-";
								break;
							default:
								outText=validPhoneA[3]+"-";
						}
						outText+=validPhoneA[4];
					}
					else
					{
						outText="1 ("+validPhoneA[2]+") "+validPhoneA[3]+"-"+validPhoneA[4];
					}
				}
				out.style.display="none";
				phone.value=outText;
				return true;
			}
			else
			{
				out.style.display="inline";
				return false;
			}
		}
	}

	function validateEmail(email,output)
	{
		out = document.getElementById(output);
		if(chosenExistingEmail==email.value&&existingMailBool)
		{
			out.style.display="none";
			return true;
		}
		else
		{
			re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$|^NONE$/;
			if(re.test(email.value))
			{
				out.style.display="none";
				return true;
			}
			else
			{
				out.style.display="inline";
				return false;
			}
		}
	}
	
	function validatePhoneAndEmail(phone, pOut, email,eOut)
	{
		bPhone=validatePhone(phone,pOut);
		bEmail=validateEmail(email,eOut);
		if(bPhone&&bEmail)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
