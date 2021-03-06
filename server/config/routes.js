var userRoutes = require('../controllers/UserController.js');
module.exports = function(app){
  app.get('/groups', userRoutes.getGroups);
  app.post('/register', userRoutes.register);
  app.post('/login', userRoutes.login);
  app.get('/group/:id', userRoutes.getGroup);
  app.get('/meetups/:id', userRoutes.getMeetups);
  app.get('/meetups', userRoutes.getAllMeetups);
  app.get('/getLoggedUser', userRoutes.getLoggedUser);
  app.get('/logout', userRoutes.logout);
	app.get('/instagram/', userRoutes.updateInstagram);

  // Authenticate User For Following Routes
  app.use(userAuth);
  app.get('/validateLoggedIn', userRoutes.getLoggedUser);
  app.post('/addmeetup/:id', userRoutes.addMeetup);
  app.post('/addgroup', userRoutes.createGroup);
  app.get('/instagramauth', userRoutes.instagramauth);
  app.post('/joingroup/:userid', userRoutes.joinGroup);

  // Authenticate Admin For Following Routes
  app.use(adminAuth);
  app.get('/admingetUsers', userRoutes.getUsers);
  app.delete('/adminDeleteUser/:id', userRoutes.deleteUser);
}
function userAuth(req,res,next){
  if (req.session.user){
    next();
  }else{
    res.sendStatus(401);
  }
}
function adminAuth(req,res,next){
  if (req.session.user.email=='admin@dronesquad.com'){
    next();
  }else{
    res.sendStatus(401);
  }
}
