var ConductoresModule = angular.module('ConductoresModule', [ 'ngRoute', 'ui.bootstrap']);

ConductoresModule.config([ '$routeProvider', 
                         function($routeProvider) {
							console.log("Loading ConductoresModule routes");
							$routeProvider.when('/VehiculosConductorList', {
								templateUrl : '/Conductor/ConductoresList.html',
								controller : 'VehiculosConductorListController'
							});
							$routeProvider.when('/VehiculoConductorUpdate/:registro', {
								templateUrl : '/Conductor/ConductorForm.html',
								controller : 'VehiculoConductorUpdate'
							});
						}
]);
