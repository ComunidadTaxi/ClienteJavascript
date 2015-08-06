var ConductorModule = angular.module('ConductorModule', [ 'ngRoute', 'ui.bootstrap']);

ConductorModule.config([ '$routeProvider', 
                         function($routeProvider) {
							console.log("Loading ConductorModule routes");
							$routeProvider.when('/ListConductor/:idVehiculo', {
								templateUrl : '/templates/ConductorList.html',
								controller : 'ListConductorController'
							});
							$routeProvider.when('/CreateConductor/:idVehiculo', {
								templateUrl : '/templates/ConductorForm.html',
								controller : 'CreateConductorController'
							});
							$routeProvider.when('/EditConductor/:id', {
								templateUrl : '/templates/ConductorForm.html',
								controller : 'EditConductorController'
							});
						}
]);
