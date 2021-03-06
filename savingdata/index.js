var myFirebaseRef = new Firebase("https://intense-inferno-6719.firebaseio.com/");
var ref = myFirebaseRef;
var helloWord = function() {
	myFirebaseRef.set({
	  title: "Hello World!",
	  author: "Kevin",
	  location: {
	    city: "San Jose",
	    state: "California",
	    zip: 94103
	  }
	});
}

var getCity = function() {
	myFirebaseRef.child("location/city").on("value", function(snapshot) {
	  alert(snapshot.val());  // Alerts "San Francisco"
	});
}

var usersRef = myFirebaseRef.child("users");

var setBasicUsers = function() {
	usersRef.set({
	  alanisawesome: {
	    date_of_birth: "June 23, 1912",
	    full_name: "Alan Turing"
	  },
	  gracehop: {
	    date_of_birth: "December 9, 1906",
	    full_name: "Grace Hopper"
	  }
	});

	usersRef.child("alanisawesome").set({
	  date_of_birth: "June 23, 1912",
	  full_name: "Alan Turing"
	});
	usersRef.child("gracehop").set({
	  date_of_birth: "December 9, 1906",
	  full_name: "Grace Hopper"
	});	
}

var updateSomeInfo = function() {
	var hopperRef = usersRef.child("gracehop");
	hopperRef.update({
	  "extra": "changed"
	});	
}

var dataRef = myFirebaseRef.child("data");
var writingDataWithErrorChecking = function() {
	dataRef.set("I'm writing data", function(error) {
	  if (error) {
	    alert("Data could not be saved." + error);
	  } else {
	    alert("Data saved successfully.");
	  }
	});
}

var postsRef = ref.child("posts");

var pushAnotherUser =function() {
	postsRef.push({
		author: "gracehop",
		title: "Announcing COBOL, a New Programming Language"
	});
	postsRef.push({
		author: "alanisawesome",
		title: "The Turing Machine"
	});
}

var pushAndAlertKey = function() {
	var newPostRef = postsRef.push({
		author: "gracehop",
		title: "Announcing COBOL, a New Programming Language"
	});

	var postID = newPostRef.key();
	alert(postID);
}

// // These two methods are equivalent
// postsRef.push().set({
//   author: "gracehop",
//   title: "Announcing COBOL, a New Programming Language"
// });
// postsRef.push({
//   author: "gracehop",
//   title: "Announcing COBOL, a New Programming Language"
// });

var incrementNumPosts = function () {
	var numPosts = postsRef.child("numPosts");

	numPosts.transaction(function (current_value) {
	  	return (current_value || 0) + 1;
	});
}

var getValueOfPost = function () {
	// value returns entire contents of the location
	// Get a database reference to our posts
	var ref = new Firebase("https://docs-examples.firebaseio.com/web/saving-data/fireblog/posts");
	// Attach an asynchronous callback to read the data at our posts reference
	ref.on("value", function(snapshot) {
	  console.log(snapshot.val());
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});	
}
var getAddedChildren = function() {
	// child_Added is triggered once for each existing child and 
	// then again every time a new child is added to the specified path
	// Gets all data
	// Get a reference to our posts
	var ref = new Firebase("https://docs-examples.firebaseio.com/web/saving-data/fireblog/posts");
	// Retrieve new posts as they are added to our database
	ref.on("child_added", function(snapshot, prevChildKey) {
	  var newPost = snapshot.val();
	  console.log("Author: " + newPost.author);
	  console.log("Title: " + newPost.title);
	  console.log("Previous Post ID: " + prevChildKey);
	});
}

var getChangedChildren = function () {
	// Get a reference to our posts
	var ref = new Firebase("https://docs-examples.firebaseio.com/web/saving-data/fireblog/posts");
	// Get the data on a post that has changed
	ref.on("child_changed", function(snapshot) {
	  var changedPost = snapshot.val();
	  console.log("The updated post title is " + changedPost.title);
	});
}

var getRemovedChildren = function () {
	// Get a reference to our posts
	var ref = new Firebase("5/web/saving-data/fireblog/posts");
	// Get the data on a post that has been removed
	ref.on("child_removed", function(snapshot) {
	  var deletedPost = snapshot.val();
	  console.log("The blog post titled '" + deletedPost.title + "' has been deleted");
	});	
}

var proofChildAddedAndValue = function () {
	var ref = new Firebase("https://docs-examples.firebaseio.com/web/saving-data/fireblog/posts");
	var count = 0;
	ref.on("child_added", function(snap) {
	  count++;
	  console.log("added", snap.key());
	});
	// length will always equal count, since snap.val() will include every child_added event
	// triggered before this point
	ref.once("value", function(snap) {
	  console.log("initial data loaded!", Object.keys(snap.val()).length === count);
	});
}

var getDinosaursSortedByHeight = function () {
	var ref = new Firebase("https://dinosaur-facts.firebaseio.com/dinosaurs");
	ref.orderByChild("height").on("child_added", function(snapshot) {
	  console.log(snapshot.key() + " was " + snapshot.val().height + " meters tall");
	});
}

var getDinosaursSortedAlphabetically = function () {
	var ref = new Firebase("https://dinosaur-facts.firebaseio.com/dinosaurs");
	ref.orderByKey().on("child_added", function(snapshot) {
	  console.log(snapshot.key());
	});
}

var getEachDinosaurScoreOrdered = function () {
	var scoresRef = new Firebase("https://dinosaur-facts.firebaseio.com/scores");
	scoresRef.orderByValue().on("value", function(snapshot) {
	  snapshot.forEach(function(data) {
	    console.log("The " + data.key() + " dinosaur's score is " + data.val());
	  });
	});	
}

var getTallestDinosaurShorterThanStegosaurs = function() {
	var ref = new Firebase("https://dinosaur-facts.firebaseio.com/dinosaurs");
	ref.child("stegosaurus").child("height").on("value", function(stegosaurusHeightSnapshot) {
	  var favoriteDinoHeight = stegosaurusHeightSnapshot.val();
	  console.log(favoriteDinoHeight);
	  var queryRef = ref.orderByChild("height").endAt(favoriteDinoHeight).limitToLast(2);
	  console.log(queryRef);
		queryRef.on("value", function(querySnapshot) {
		  console.log(querySnapshot);
	      if (querySnapshot.numChildren() == 2) {
	        // Data is ordered by increasing height, so we want the first entry
	        querySnapshot.forEach(function(dinoSnapshot) {
	          console.log("The dinosaur just shorter than the stegasaurus is " + dinoSnapshot.key());
	          // Returning true means that we will only loop through the forEach() one time
	          return true;
	        });
	      } else {
	        console.log("The stegosaurus is the shortest dino");
	      }
	  });
	});
}

var checkIfMaryIsInAlpha = function () {
	// see if Mary is in the 'alpha' group
	var ref = new Firebase("https://docs-examples.firebaseio.com/web/org/users/mchen/groups/alpha");
	ref.once('value', function(snap) {
	  var result = snap.val() === null? 'is not' : 'is';
	  console.log('Mary ' + result + ' a member of alpha group');
	});	
}

// // we would probably save a profile when we register new users on our site
// // we could also read the profile to see if it's null
// // here we will just simulate this with an isNewUser boolean
// var isNewUser = true;

// var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
// ref.onAuth(function(authData) {
//   if (authData && isNewUser) {
//     // save the user's profile into Firebase so we can list users,
//     // use them in Security and Firebase Rules, and show profiles
//     ref.child("users").child(authData.uid).set({
//       provider: authData.provider,
//       name: getName(authData)
//     });
//   }
// });

// // Get username
// // find a suitable name based on the meta info given by each provider
// function getName(authData) {
//   switch(authData.provider) {
//      case 'password':
//        return authData.password.email.replace(/@.*/, '');
//      case 'twitter':
//        return authData.twitter.displayName;
//      case 'facebook':
//        return authData.facebook.displayName;
//   }
// }

// // POPUP PRIORITIZED OVER REDIRECT, BOTH IN CASE POPUP FAILS
// // prefer pop-ups, so we don't navigate away from the page
// ref.authWithOAuthPopup("google", function(error, authData) {
//   if (error) {
//     if (error.code === "TRANSPORT_UNAVAILABLE") {
//       // fall-back to browser redirects, and pick up the session
//       // automatically when we come back to the origin page
//       ref.authWithOAuthRedirect("google", function(error) { /* ... */ });
//     }
//   } else if (authData) {
//     // user authenticated with Firebase
//   }
// });


// // ERROR CHECKING FOR LOGIN
// var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
// ref.authWithPassword({
//   email    : "bobtony@firebase.com",
//   password : "invalid-password"
// }, function(error, authData) {
//   if (error) {
//     switch (error.code) {
//       case "INVALID_EMAIL":
//         console.log("The specified user account email is invalid.");
//         break;
//       case "INVALID_PASSWORD":
//         console.log("The specified user account password is incorrect.");
//         break;
//       case "INVALID_USER":
//         console.log("The specified user account does not exist.");
//         break;
//       default:
//         console.log("Error logging user in:", error);
//     }
//   } else {
//     console.log("Authenticated successfully with payload:", authData);
//   }
// });


