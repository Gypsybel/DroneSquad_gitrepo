app.controller('homeController',[ '$scope', '$http','userFactory','$location', 'NgMap', function($scope, $http, userFactory, $location, NgMap){
	NgMap.getMap().then(function(map){
		console.log(map.getCenter());
	})
	$scope.locations = [
		{coordinate_x: "34.157924", coordinate_y:"-118.166216"},
		{coordinate_x: "34.270544", coordinate_y:"-118.378726"}
	]


	function getGroups(){
		userFactory.getGroups(function(groups){
			$scope.groups = groups;
		} )
	};

	getGroups();

	function getAllMeetups() {
    userFactory.getAllMeetups(function(meetups) {
      $scope.meetups=meetups;
      })
  };
	getAllMeetups();

}]);
