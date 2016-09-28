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

    factory.getGroups = function (callback) {
      $http({
        url: '/groups',
        method: 'GET'
      }).then(function(res){
        callback(res.data)
      })
    };
    factory.getGroup = function (id, callback) {
      $http({
        url: '/group/'+id,
        method: 'GET'
      }).then(function(group){
        callback(group.data);
      })
    };
    factory.addMeetup = function (id, meetup) {
      console.log(id,meetup);
      $http({
        url: '/addmeetup/'+id,
        method: 'POST',
        data: meetup
      }).then(function(res){
        $location.url('/group/'+id);
      })
    };

    factory.getMeetups = function(id, callback) {
      $http({
        url:'/meetups/'+id,
        method: 'GET',
      }).then(function(res){
        callback(res.data);
      })
    };

    factory.getAllMeetups = function(callback) {
      $http({
        url:'/meetups',
        method: 'GET',
      }).then(function(res){
        callback(res.data);
      })
    };

    return factory;
}])
