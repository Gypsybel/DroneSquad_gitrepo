var userRoutes = require('../controllers/UserController.js');
module.exports = function(app){
  app.post('/register', userRoutes.register);
  app.post('/login', userRoutes.login);
  // app.use(userAuth);
  // app.get('/customers', userRoutes.getCustomers);

  // app.delete('/product/:id', userRoutes.deleteProduct);
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
