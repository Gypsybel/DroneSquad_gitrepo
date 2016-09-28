var userRoutes = require('../controllers/UserController.js');
module.exports = function(app){
  app.get('/groups', userRoutes.getGroups);
  app.post('/register', userRoutes.register);
  app.post('/login', userRoutes.login);
  app.get('/group/:id', userRoutes.getGroup);
  app.post('/addmeetup/:id', userRoutes.addMeetup);
  app.get('/meetups/:id', userRoutes.getMeetups);
  app.get('/meetups', userRoutes.getAllMeetups);
  // app.use(userAuth);

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
