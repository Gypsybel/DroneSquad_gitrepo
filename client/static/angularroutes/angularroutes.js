var app = angular.module('app', ['ngRoute', 'ngMap']);

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
        .when('/register', {
            templateUrl:'partials/register.html'
        })
        .when('/group/:id', {
            templateUrl:'partials/group.html'
        })
        .when('/addmeetup/:id', {
            templateUrl:'partials/addmeetup.html'
        })
        // access_token=:token
        // .when('/access_token=:token', {
        //     templateUrl:'', controller: function($location) {
        //       console.log("test");
              // console.log($location.hash());
        //     }
        // })
        .otherwise({
            redirectTo:'/'
        })
}])
