app.controller('registerController',[ '$scope', '$http','userFactory','$location', function($scope, $http, userFactory, $location){
  $scope.errors = [];

  $scope.registerUser = function(user){
    count = 0;
    $scope.errors=[];
    // Registration Validations go here
    if(!user){
      $scope.errors.push("Please fill out the form to register")
      $location.url('/register')
    }
    else{
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
        $location.url('/register')
      }
      else if(count==0){
        console.log(user);
        userFactory.registerUser(user)
      }
    }

  };

}])
