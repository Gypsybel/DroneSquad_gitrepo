app.controller('loginController',[ '$scope', '$http','userFactory','$location', function($scope, $http, userFactory, $location){
  $scope.errors = [];
  
  function loginError(data){
    $scope.myLoginError = data.data;
    console.log($scope.myLoginError);
  }
  $scope.loginUser = function(user){
      userFactory.loginUser(user, loginError);
  };
}])
