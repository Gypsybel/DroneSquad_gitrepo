app.controller('homeController',[ '$scope', '$http','userFactory','$location', function($scope, $http, userFactory, $location){
  function test(data){
    $scope.insta = data;
    console.log(data);
  };
  function insta(){
    $http.jsonp('https://api.instagram.com/v1/users/self/media/recent/?access_token=2227039481.eec5c8b.bcc5f8c4c8ff4e3894df7cf3bce973c7&callback=JSON_CALLBACK')
    .success(function(data){
      console.log("testing ************");
      console.log(data.data);
      $scope.insta = [];
      for (var i = 0; i < 3; i++) {
        $scope.insta.push(data.data[i].images.standard_resolution.url)
      }
      console.log($scope.insta);
    });
  };
  insta();
}])
