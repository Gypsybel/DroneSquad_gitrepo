app.controller('groupController',[ '$scope', '$http','userFactory','$location', '$routeParams', 'NgMap', function($scope, $http, userFactory, $location, $routeParams, NgMap){
  NgMap.getMap().then(function(map){
    console.log(map.getCenter());
  })
  $scope.locations = [{coordinate_x: "35.3", coordinate_y:"140.2"},
  {coordinate_x: "35.5", coordinate_y:"140.4"},{coordinate_x: "35.7", coordinate_y:"140.7"}]

  $scope.group = {};
  function getGroup(id){
    userFactory.getGroup(id, function(group){
      $scope.group=group;
    });
  };

  getGroup($routeParams.id);

  function insta(token){
    $http.jsonp('https://api.instagram.com/v1/users/self/media/recent/?access_token='+token+"&callback=JSON_CALLBACK")
    .success(function(data){
      $scope.insta = data;
    })
  };


  insta("2227039481.eec5c8b.bcc5f8c4c8ff4e3894df7cf3bce973c7");
}])
