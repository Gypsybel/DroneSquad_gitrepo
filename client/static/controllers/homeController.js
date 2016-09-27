app.controller('homeController',[ '$scope', '$http','userFactory','$location', function($scope, $http, userFactory, $location){

	function getGroups(){
		userFactory.getGroups(function(groups){
			$scope.groups = groups;
		} )
	};

	getGroups();

}]);
