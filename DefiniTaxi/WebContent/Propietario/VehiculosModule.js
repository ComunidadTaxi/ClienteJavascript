var VehiculosModule = angular.module('VehiculosModule', [ 'ngRoute', 'ui.bootstrap']);

VehiculosModule.config([ '$routeProvider', 
                         function($routeProvider) {
							console.log("Loading VehiculosModule routes");
							$routeProvider.when('/VehiculosList', {
								templateUrl : '/Propietario/VehiculosList.html',
								controller : 'VehiculosListController'
							});
							$routeProvider.when('/VehiculosCreate', {
								templateUrl : '/Propietario/VehiculosForm.html',
								controller : 'VehiculosCreateController'
							});
						}
]);
