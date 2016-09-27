app.controller('homeController',[ '$scope', '$http','userFactory','$location', 'NgMap', function($scope, $http, userFactory, $location, NgMap){
	NgMap.getMap().then(function(map){
		console.log(map.getCenter());
	})
	$scope.locations = [{coordinate_x: "35.3", coordinate_y:"140.2"},
	{coordinate_x: "35.5", coordinate_y:"140.4"},{coordinate_x: "35.7", coordinate_y:"140.7"}]

	function getGroups(){
		userFactory.getGroups(function(groups){
			$scope.groups = groups;
		} )
	};

	getGroups();

}]);
