app.controller('addgroupController',[ '$scope', '$http','userFactory','$location', function($scope, $http, userFactory, $location){
	function validateLoggedIn() {
		userFactory.validateLoggedIn(function(user){
			$scope.user = user;
		});
	};
	validateLoggedIn();
	$scope.createGroup = function(newgroup) {
		userFactory.createGroup (newgroup)
	};
}])
