

app.factory("userFactory", ["$http", '$q', '$location', function($http, $q, $location){
    var users = {data:[]};
    var factory = {};

    // start admin user functions
    factory.registerUser = function(user){
      console.log(user);
        $http({
            method:"POST",
            url:'/register',
            data:user
        }).then(function(res){
              $location.url('/home')
        })
    };
    factory.loginUser = function(user, callback){
      $http({
        url:'/login',
        method:'POST',
        data: user
      }).then(function(res){
          $location.url('/home')
      },function(res){
        callback(res);
      })
    };
    // end admin user functions

    factory.createGroup = function (group) {
      $http({
        url: '/addgroup',
        method: 'POST',
        data: group
      }).then(function(res){

        $location.url('/home')
      })
    };

    return factory;
}])
