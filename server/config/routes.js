var userRoutes = require('../controllers/UserController.js');
module.exports = function(app){
  app.get('/groups', userRoutes.getGroups);
  app.post('/register', userRoutes.register);
  app.post('/login', userRoutes.login);
  app.get('/group/:id', userRoutes.getGroup);

  // Authenticate User For Following Routes
  app.use(userAuth);
  app.get('/getloggeduser', userRoutes.getLoggedUser)
  app.post('/addmeetup/:id', userRoutes.addMeetup);
  app.get('/logout', userRoutes.logout);
  app.post('/addgroup', userRoutes.createGroup);
}
function userAuth(req,res,next){
  if (req.session.user){
    next();
  }else{
    res.sendStatus(401);
  }
}
