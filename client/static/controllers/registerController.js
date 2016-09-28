app.controller('registerController',[ '$scope', '$http','userFactory','$location', function($scope, $http, userFactory, $location){
  $scope.errors = [];

  $scope.registerUser = function(user){
    console.log(user);
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
      console.log(user);
      userFactory.registerUser(user)
    }
  };

}])
