app.controller('loginregController',[ '$scope', '$http','userFactory','$location', function($scope, $http, userFactory, $location){
  $scope.errors = [];
  $scope.registerUser = function(user){

    count = 0;
    // Registration Validations go here
    if(user.name.length < 2){
      $scope.errors.push('Name must be at least 2 letters');
      count ++;
    }
    if(user.password.length < 8){
      $scope.errors.push('Password must be at least 8 characters');
      count ++;
    }
    if(user.passconf != user.password){
      $scope.errors.push('Password and Password Confirmation do not match');
      count ++;
    }
    if(count > 0){
      $location.url('/')
    }
    else{
      userFactory.registerUser(user)
    }
  };
  function loginError(data){
    $scope.myLoginError = data.data;
    console.log($scope.myLoginError);
  }
  $scope.loginUser = function(user){
      userFactory.loginUser(user, loginError);
  };
}])
