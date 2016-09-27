var app = angular.module('app', ['ngRoute']);

app.config(['$httpProvider', '$routeProvider', function($httpProvider, $routeProvider){
  $httpProvider.interceptors.push(
        function($q, $location) {
        return {
            'responseError':function(rejection){
            if (rejection.status == 401){
                $location.url('/login');
            }
            return $q.reject(rejection);
        }
        };
    });
    $routeProvider
        .when('/', {
            templateUrl:'partials/home.html'
        })
        .when('/group', {
            templateUrl:'partials/group.html'
        })
        .when('/addgroup', {
            templateUrl:'partials/addgroup.html'
        })
        .when('/login', {
            templateUrl:'partials/login.html'
        })
        .otherwise({
            redirectTo:'/'
        })
}])
