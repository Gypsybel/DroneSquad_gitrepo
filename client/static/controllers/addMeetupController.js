app.controller('addMeetupController',[ '$scope', '$http','userFactory','$location', '$routeParams', function($scope, $http, userFactory, $location, $routeParams){

	$scope.today = new Date ();
	console.log($scope.today);
	
	$scope.addMeetup = function(meetup) {
    console.log(meetup);
		userFactory.addMeetup ($routeParams.id, meetup)
	};

	function validateLoggedIn() {
		userFactory.validateLoggedIn();
	}
	validateLoggedIn();

}])
