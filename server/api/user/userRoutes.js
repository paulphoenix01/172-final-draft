var router = require('express').Router();
var user = require('./userModel');


router.param('username', function(req,res,next,id){
	var theUser = user.findOne({'username': req.body.username});
	if(theUser){
		// Put the found user  in the request
		req.theUser = theUser;
		next();
	}else{
		res.send();
	}
});

// Router.route
router.route('/')
  .get(function(req, res){
	console.log('User /GET executed');
    	// Return users list
   	getUsers(res);
  })
  // Post = CREATE new user 
  .post(function(req, res){
	console.log("User /POST executed");
	user.create({username : req.body.username}
		,function(err, user){
			if(err) res.send(err);
			// Return users list
			getUsers(res);
  })
;

router.route('/:username')
	.get(function(req,res){
		// Get the user from the middleware above
		var theUser = req.theUser;
		res.json(theUser || {});		
	})
	.delete(function(req,res){
		user.remove({username: req.body.username}, function(err){})
	})
;

// Return users list
function getUsers(res){
	// Look into database, return all as json
	user.find(function(err, users){
		if(err) res.send(err);
		res.json(users);
	});
};

module.exports = router;
