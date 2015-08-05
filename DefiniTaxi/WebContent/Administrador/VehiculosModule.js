var VehiculosModule = angular.module('VehiculosModule', [ 'ngRoute', 'ui.bootstrap']);

VehiculosModule.config([ '$routeProvider', 
                         function($routeProvider) {
							console.log("Loading VehiculosModule routes");
							$routeProvider.when('/VehiculosList', {
								templateUrl : '/Administrador/VehiculosList.html',
								controller : 'VehiculosListController'
							});
						}
]);
