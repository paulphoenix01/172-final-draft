var router = require('express').Router();

// api router will mount other routers
// for all our resources

//This is the initial API Endpoint 
router.get("/",function(req,res){
    res.json({"error" : false,"message" : "This is the /api/ default page"});
});
router.use('/users', require('./user/userRoutes'));
router.use('/posts', require('./user.postRouters'));
 
module.exports = router;
