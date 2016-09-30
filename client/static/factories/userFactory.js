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
        $location.url('/group/'+res.data._id)
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
    factory.validateLoggedIn = function(callback) {
      $http({
        url: '/validateLoggedIn',
        method: 'GET',
      }).then(function(res){
        callback(res.data);
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

    factory.getLoggedUser = function(callback) {
      $http({
        url:'/getLoggedUser',
        method: 'GET',
      }).then(function(res){
        callback(res.data);
      })
    };

    factory.joinGroup = function (groupId, userId) {
      console.log(groupId+'***********'+userId);
      var data = {data: groupId}
      $http({
        url:'/joingroup/'+userId,
        method: "POST",
        data: data,
      }).then(function(res){
        $location.url('/group/'+groupId);
      })
    };

    factory.getUsers = function (callback) {
      $http({
        url:'/admingetUsers',
        method: "GET",
      }).then(function(users){
        callback(users.data);
      })
    };

    factory.deleteUser = function(id, callback) {
      $http({
        url:'/adminDeleteUser/'+id,
        method: "DELETE",
      }).then(function(res){
        callback();
      })
    };

    return factory;
}])
