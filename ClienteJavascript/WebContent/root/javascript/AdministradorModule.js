function GAPILoaded() {
	console.log("GAPI loaded...");
	window.loadAngularGAPI();
}

var AdministradorModule = angular.module('AdministradorModule', [ 'ngRoute', 'ui.bootstrap']);

AdministradorModule.config([ '$routeProvider', 
                         function($routeProvider) {
							console.log("Loading AdministradorModule routes");
							$routeProvider.when('/EntryPoint', {
								templateUrl : 'root/templates/AdministradorList.html',
								controller : 'ListAdministradorController'
							});
							$routeProvider.when('/CreateAdministrador', {
								templateUrl : 'root/templates/AdministradorForm.html',
								controller : 'CreateAdministradorController'
							});
							$routeProvider.when('/EditAdministrador/:id', {
								templateUrl : 'root/templates/AdministradorForm.html',
								controller : 'EditAdministradorController'
							});
							$routeProvider.otherwise({
								redirectTo : '/EntryPoint'
							});
						}
]);

AdministradorModule.run(['$rootScope', '$window', '$log',  function ($rootScope, $window, $log) {
	
	$rootScope.GAPILoaded = false;

	$window.loadAngularGAPI = function() {
    	$log.log("load Angular GAPI...");
    	$rootScope.GAPILoaded = true;
    	$rootScope.$apply();
    	$log.log("Angular GAPI Loaded: "+$rootScope.GAPILoaded);
  	}
}]);
