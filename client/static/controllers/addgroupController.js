app.controller('addgroupController',[ '$scope', '$http','userFactory','$location', function($scope, $http, userFactory, $location){

	$scope.createGroup = function(newgroup) {
		userFactory.createGroup (newgroup)
	};

}])
