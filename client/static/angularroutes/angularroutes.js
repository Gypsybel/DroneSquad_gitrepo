var app = angular.module('app', ['ngRoute', 'ngMap']);

app.config(['$httpProvider', '$routeProvider', '$routeParams', function($httpProvider, $routeProvider, $routeParams){
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
        .when('/register', {
            templateUrl:'partials/register.html'
        })
        .when('/group/:id', {
            templateUrl:'partials/group.html'
        })
        .when('/addmeetup/:id', {
            templateUrl:'partials/addmeetup.html'
        })
        .when('access_token=:token', {
            templateUrl:'', controller: function($location) {
              console.log($location.path());
              console.log("test");
              console.log($routeParams.token);
              console.log(token);
            }
        })
        .otherwise({
            redirectTo:'/'
        })
}])
