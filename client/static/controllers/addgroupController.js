app.controller('addgroupController',[ '$scope', '$http','userFactory','$location', function($scope, $http, userFactory, $location){
	function getLoggedUser() {
		userFactory.getLoggedUser(function(user){
			$scope.user = user;
		});
	};
	getLoggedUser();
	$scope.createGroup = function(newgroup) {
		userFactory.createGroup (newgroup)
	};
}])
