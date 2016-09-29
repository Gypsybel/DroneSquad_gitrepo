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

  // Authenticate User For Following Routes
  app.use(userAuth);
  app.get('/validateLoggedIn', userRoutes.getLoggedUser)
  app.post('/addmeetup/:id', userRoutes.addMeetup);
  app.post('/addgroup', userRoutes.createGroup);
  app.get('/instagram/?code=:instacode', userRoutes.updateInstagram);
}
function userAuth(req,res,next){
  if (req.session.user){
    next();
  }else{
    res.sendStatus(401);
  }
}
