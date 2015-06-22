var ref = new Firebase("https://intense-inferno-6719.firebaseio.com/");

var error = function(msg) {
	$("#result").html("<h2 class='red'>" + msg + "</h2>");
};

var success = function(msg) {
	$("#result").html("<h2 class='green'>" + msg + "</h2>");
};

var printResult = function(successOrError, msg) {
	$("#result").empty();
	if (successOrError) {
		success(msg);
	} else {
		error(msg);
	}
};

var create_account = function(form) {
	var user = form.userid.value;
	var pass = form.pswrd.value;
	var repeatpass = form.repeatpswrd.value;
	if (pass === repeatpass) {
		ref.createUser({
		  email    : user,
		  password : pass
		}, function(error, userData) {
		  if (error) {
		    console.log("Error creating user:", error);
		    printResult(false, "Error creating user:" + error);
		  } else {
		    console.log("Successfully created user account with uid:", userData.uid);
		    printResult(true, "Successfully created user account with uid:" + userData.uid);
		  }
		});	
	} else {
	    console.log("The passwords you put in are not the same! Try again!");
	    printResult(false, "The passwords you put in are not the same! Try again!");		
	}

};

var login = function(form) {
	var user = form.userid.value;
	var pass = form.pswrd.value;
	ref.authWithPassword({
	  email    : user,
	  password : pass
	}, function(error, authData) {
	  if (error) {
	    console.log("Login Failed!", error);
	    printResult(false, "Login Failed!" + error);
	  } else {
	    console.log("Authenticated successfully with payload:", authData);
	    printResult(true, "Authenticated successfully with payload:" + authData);
	  }
	}, {
		remember: "sessionOnly"
	});
};

var changePassword = function(form) {
	var newFirstPassword = form.newpswrd.value;
	var newSecondPassword = form.repeatnewpswrd.value;
	if (newFirstPassword === newSecondPassword) {
		ref.changePassword({
		  email       : form.userid.value,
		  oldPassword : form.oldpswrd.value,
		  newPassword : form.newpswrd.value
		}, function(error) {
		  if (error === null) {
		    console.log("Password changed successfully");
		    printResult(true, "Password changed successfully");
		  } else {
		    console.log("Error changing password:", error);
		    printResult(false, "Error changing password:" + error);
		  }
		});			
	} else {
		console.log("Sorry, the new passwords are not the same!");
		printResult(false, "Sorry, the new passwords are not the same!");
	}

};

var changeEmail = function(form) {
	ref.changeEmail({
	  oldEmail : form.oldemail.value,
	  newEmail : form.newemail.value,
	  password : form.pswrd.value
	}, function(error) {
	  if (error === null) {
	    console.log("Email changed successfully");
	    printResult(true, "Email changed successfully");
	  } else {
	    console.log("Error changing email:", error);
	    printResult(false, "Error changing email:" + error);
	  }
	});
};

var sendPasswordReset = function(form) {
	ref.resetPassword({
	    email : form.useremail.value
	  }, function(error) {
	  if (error === null) {
	    console.log("Password reset email sent successfully");
	    printResult(true, "Password reset email sent successfully");
	  } else {
	    console.log("Error sending password reset email:", error);
	    printResult(false, "Error sending password reset email:" + error);
	  }
	});
};

var removeMyAccount = function(form) {
	ref.removeUser({
	  email    : form.useremail.value,
	  password : form.userpassword.value
	}, function(error) {
	  if (error === null) {
	    console.log("User removed successfully");
	    printResult(true, "User removed successfully");
	  } else {
	    console.log("Error removing user:", error);
	    printResult(false, "Error removing user:" + error);
	  }
	});
}