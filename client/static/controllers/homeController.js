app.controller('homeController',[ '$scope', '$http','userFactory','$location', 'NgMap', function($scope, $http, userFactory, $location, NgMap){
	NgMap.getMap().then(function(map){
		map.getCenter();
	})
	$scope.locations = [{coordinates: "34.0697535999999985, -118.362128600000005"}, {coordinates: "34.157924, -118.166216"}, {coordinates: "34.270544, -118.378726"}, {coordinates: "34.1790877999999978, -118.319483000000005"}, {coordinates: "34.1144110400000002, -118.157018629999996"}]


	function getLoggedUser(group) {
    userFactory.getLoggedUser(function(user) {
      $scope.user = user;
    });
  };

	function getGroups(){
		userFactory.getGroups(function(groups){
			$scope.groups = groups;
			$scope.membercount = 0;
			for(var i=0; i<group._members.length; i++){
				$scope.membercount ++;
			}
		})
	};

	getGroups();

	function getAllMeetups() {
    userFactory.getAllMeetups(function(meetups) {
      $scope.meetups=meetups;
		})
  };
	getAllMeetups();

	function getLoggedUser() {
		userFactory.getLoggedUser(function(user){
			$scope.user = user;
		})
	};
	getLoggedUser();
}]);
