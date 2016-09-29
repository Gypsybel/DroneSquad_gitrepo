app.controller('groupController',[ '$scope', '$http','userFactory','$location', '$routeParams', 'NgMap', function($scope, $http, userFactory, $location, $routeParams, NgMap){
  NgMap.getMap().then(function(map){
    console.log(map.getCenter());
  })
  $scope.locations = [{coordinate_x: "35.3", coordinate_y:"140.2"},
  {coordinate_x: "35.5", coordinate_y:"140.4"},{coordinate_x: "35.7", coordinate_y:"140.7"}]
  
  // $scope.group = {};
  $scope.authorization = false;
  function getGroup(id, instaFunc, getLoggedUserFunc){
    userFactory.getGroup(id, function(group){
      $scope.group=group;
      instaFunc(group.instagram_token);
      getLoggedUserFunc(group);
    });
  };
  getGroup($routeParams.id, insta, getLoggedUser);


  function getMeetups(id) {
    userFactory.getMeetups(id, function(meetups) {
      $scope.meetups=meetups;
      var count = 0;
      for(meetup in meetups){
        count ++;
      }
      $scope.meetupcount = count;
    })
  }
  getMeetups($routeParams.id);

  function insta(token){
    console.log(token);
    $http.jsonp('https://api.instagram.com/v1/users/self/media/recent/?access_token='+token+"&callback=JSON_CALLBACK")
    .success(function(data){
      $scope.insta = data;
    })
  };

  function getLoggedUser(group) {
    userFactory.getLoggedUser(function(user) {
      $scope.user = user;
      for(var i=0; i<group._organizers.length; i++){
        if(user._id==group._organizers[i]){
          $scope.authorization = true;
          console.log("user authorized for this group");
          return true;
        }
      }
      console.log("user not authorized");
    });
  };

}])
