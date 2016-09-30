app.controller('addMeetupController',[ '$scope', '$http','userFactory','$location', '$routeParams', function($scope, $http, userFactory, $location, $routeParams){

	$scope.today = new Date ();
	$scope.currentTime = new Date ();
	console.log($scope.today);

	$scope.addMeetup = function(meetup) {
    console.log(meetup);
		userFactory.addMeetup ($routeParams.id, meetup)
	};

	function validateLoggedIn() {
		userFactory.validateLoggedIn();
	}

	$scope.month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	$scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	$scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	$scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	$scope.today = 'Today';
	$scope.clear = 'Clear';
	$scope.close = 'Close';
	var days = 0;
	var futuredays = 365;
	$scope.minDate = (new Date($scope.currentTime.getTime() - ( 1000 * 60 * 60 *24 * days ))).toISOString();
	$scope.maxDate = (new Date($scope.currentTime.getTime() + ( 1000 * 60 * 60 *24 * futuredays ))).toISOString();
	$scope.onStart = function () {
	    console.log('onStart');
	};
	$scope.onRender = function () {
	    console.log('onRender');
	};
	$scope.onOpen = function () {
	    console.log('onOpen');
	};
	$scope.onClose = function () {
	    console.log('onClose');
	};
	$scope.onSet = function () {
	    console.log('onSet');
	};
	$scope.onStop = function () {
	    console.log('onStop');
	};








	validateLoggedIn();

}])
