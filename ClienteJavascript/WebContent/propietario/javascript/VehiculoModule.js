var VehiculoModule = angular.module('VehiculoModule', [ 'ngRoute', 'ui.bootstrap']);

VehiculoModule.config([ '$routeProvider' , function($routeProvider) {
							console.log("Loading VehiculoModule routes");
							$routeProvider.when('/EntryPoint', {
								templateUrl : 'propietario/templates/VehiculoList.html',
								controller : 'ListVehiculoController'
							});
														$routeProvider.when('/CreateVehiculo', {
								templateUrl : 'propietario/templates/VehiculoForm.html',
								controller : 'CreateVehiculoController'
							});
							$routeProvider.when('/EditVehiculo/:id', {
								templateUrl : 'propietario/templates/VehiculoForm.html',
								controller : 'EditVehiculoController'
							});
						}
]);

