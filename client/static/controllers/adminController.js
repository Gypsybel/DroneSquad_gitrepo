app.controller('adminController',[ '$scope', '$http','userFactory','$location', '$routeParams', function($scope, $http, userFactory, $location, $routeParams){
  function getUsers(){
    $scope.users = {};
    userFactory.getUsers(function(users){
      $scope.users = users;
    });
  }
  getUsers();

  function getAllMeetups(){
    $scope.meetups = {};
    userFactory.getAllMeetups(function(meetups){
      $scope.meetups = meetups;
    });
  }
  getAllMeetups();

  function getGroups(){
    $scope.meetups = {};
    userFactory.getGroups(function(groups){
      $scope.groups = groups;
    });
  }
  getGroups();

  $scope.deleteUser = function(id){
    userFactory.deleteUser(id, getUsers);
  }

}])
