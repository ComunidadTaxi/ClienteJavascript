function GAPILoaded() {
	console.log("GAPI loaded...");
	window.loadAngularGAPI();
}

var MainModule = angular.module('MainModule');

MainModule.value('globals',{
	apiRoot: '',
	storespace: ''
});

MainModule.run(['$rootScope', '$window', '$location', '$cookies', '$log', 'globals', 'module', function ($rootScope, $window, $location, $cookies, $log, globals, module) {
	
	$rootScope.GAPILoaded = false;

	$window.loadAngularGAPI = function() {
    	$log.log("load Angular GAPI...");
    	var oauthToken = $cookies.get('oauthToken');
    	if(typeof oauthToken === 'string'){
    		gapi.auth.setToken(JSON.parse(oauthToken));	
    	}
    	$rootScope.GAPILoaded = true;
    	$rootScope.$apply();
    	$log.log("Angular GAPI Loaded: "+$rootScope.GAPILoaded);
  	}

	var host = $window.location.host;
	$log.log("host: "+host);
	if(host.indexOf('localhost')>-1){
		//globals.apiRoot = 'http://'+host+'/_ah/api';
		//globals.apiRoot = 'https://red-amarilla.appspot.com/_ah/api';
		globals.apiRoot = 'https://red-amarilla.appspot.com/_ah/api';
	}else{
		globals.apiRoot = 'https://red-amarilla.appspot.com/_ah/api';
	}
	globals.storespace = host.replace(/[^a-zA-Z0-9]/g,'_');
	
	$log.log('apiRoot: '+globals.apiRoot);
	$log.log('namespace: '+globals.storespace);
	$log.log('module: ' + module);
	var session = $cookies.get('session');
	$log.log("$cookies.session: "+session);
	if(typeof session === "string"){
		var session = JSON.parse(session);
		$rootScope.session = session;
	}
	
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
    	$log.log("currentPath: "+$location.path());
    	var noSession = true;
        if ($location.path() !== '/login') {
        	if( $rootScope.session != undefined &&
        		$rootScope.session.storespace.name === globals.storespace &&
        		$rootScope.session.storespace.module.name === module
			) {
				noSession = false;
        	}
        }
        if(noSession){
        	$log.log('No matching session found');
        	delete($rootScope.session);
			$cookies.remove('session');
			$cookies.remove('oauthToken');
			$location.path('/login');
        }
    });
}]);


MainModule.config([ '$routeProvider', 'module' , function($routeProvider, module) {
							console.log("Loading MainModule routes");
							$routeProvider.when('/login', {
								templateUrl : module+'/templates/MainLogin.html',
								controller : 'MainLoginController'
							});
							$routeProvider.when('/logout', {
								templateUrl : module+'/templates/MainLogin.html',
								controller : 'MainLogoutController'
							});
							$routeProvider.otherwise({
								redirectTo : '/EntryPoint'
							});
						}
]);

MainModule.controller('MainLogoutController', ['$scope','$location', '$cookies','$window', '$log', function($scope, $location, $cookies, $window, $log) {
			$log.log("Logout");
			//$scope.$root.session.storespace.module.user = {'loggedin' : false};
			delete($scope.$root.session);
			$cookies.remove('session');
			$cookies.remove('oauthToken');
			$window.location.href = '/';
}]);
