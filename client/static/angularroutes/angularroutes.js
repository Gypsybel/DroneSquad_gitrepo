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
            templateUrl:'partials/login.html'
        })
        .when('/home', {
            templateUrl:'partials/home.html'
        })
        .otherwise({
            redirectTo:'/'
        })
}])
