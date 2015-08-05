function init() {
	//window.init();
}

var MainModule = angular.module('MainModule', [ 'ngRoute', 'ngCookies', 'ui.bootstrap', 'VehiculosModule', 'ConductoresModule' ]);

MainModule.config([ '$routeProvider', 
                         function($routeProvider) {
							console.log("Loading MainModule routes");
							$routeProvider.when('/login', {
								templateUrl : '/Propietario/MainLogin.html',
								controller : 'MainLoginController'
							});
							$routeProvider.when('/logout', {
								templateUrl : '/Propietario/MainLogin.html',
								controller : 'MainLogoutController'
							});
							$routeProvider.otherwise({
								redirectTo : '/VehiculosList'
							});
						}
]);

MainModule.run(['$rootScope', '$location', '$cookies', function ($rootScope, $location, $cookies) {
	
	var currentUserString = $cookies.currentUser;
	console.log("Run - $cookies.currentUser: "+currentUserString);
	if(typeof currentUserString === "string"){
		var currentUser = JSON.parse(currentUserString);
		$rootScope.currentUser = currentUser;
		console.log("Run - $rootScope.currentUser.displayName: "+$rootScope.currentUser.displayName);
	}
	
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
    	console.log("Current path: "+$location.path());
        // redirect to login page if not logged in
        if ($location.path() !== '/login' && $rootScope.currentUser === undefined) {
        	$location.path('/login');
        }
    });
    
}]);
