var router = require('express').Router();
var user = require('./userModel');


router.param('username', function(req,res,next,id){
	user.findOne({'username': req.params.username }, 
		function(err, theUser){
			if(theUser){
				console.log(">> Found User" + theUser);
				req.theUser = theUser;
				next();
			}else{
				req.username = req.params.username;
				console.log(req.username);
				console.log("Username Middleware: " + req.username);
				next();
			}
		}
	);
	

});

// Router.route
router.route('/')
  .get(function(req, res){
	console.log('User /GET executed');
    	// Return users list
   	getUsers(res);
  })
;

router.route('/:username')
	.get(function(req,res){
		// Get the user from the middleware above
		console.log("In the /:username /GET");	
		var theUser = req.theUser;
		res.json(theUser || {});		
	})
	.delete(function(req,res){
		console.log("In the /:username /DELETE");
		user.remove({username: req.param.username}, function(err){})
	})
	.post(function(req,res){
		console.log("In the /:username /POST");
		console.log("Username: " + req.username);
		user.create({username : req.username}
		,function(err, user){
			if(err) res.send(err);
			// Return users list
			console.log("Created new user " + req.username);
			getUsers(res);
		});
	})
;

// Return users list
function getUsers(res){
	// Look into database, return all as json
	user.find(function(err, users){
		if(err) res.send(err);
		res.json(users||{});
	});
};

module.exports = router;
