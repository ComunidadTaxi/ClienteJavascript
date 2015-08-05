var ConductoresModule = angular.module('ConductoresModule', [ 'ngRoute', 'ui.bootstrap']);

ConductoresModule.config([ '$routeProvider', 
                         function($routeProvider) {
							console.log("Loading ConductoresModule routes");
							$routeProvider.when('/ConductoresList/:placa', {
								templateUrl : '/Propietario/ConductoresList.html',
								controller : 'ConductoresVehiculoController'
							});
							$routeProvider.when('/ConductoresList', {
								templateUrl : '/Propietario/ConductoresList.html',
								controller : 'ConductoresPropietarioController'
							});
							$routeProvider.when('/ConductoresCreate/:placa', {
								templateUrl : '/Propietario/ConductoresForm.html',
								controller : 'ConductoresCreateController'
							});
						}
]);
