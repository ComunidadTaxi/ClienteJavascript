var AgenteModule = angular.module('AgenteModule', [ 'ngRoute', 'ui.bootstrap']);

AgenteModule.config([ '$routeProvider', 
                         function($routeProvider) {
							console.log("Loading AgenteModule routes");
							$routeProvider.when('/ListAgente', {
								templateUrl : 'administrador/templates/AgenteList.html',
								controller : 'ListAgenteController'
							});
							$routeProvider.when('/CreateAgente', {
								templateUrl : 'administrador/templates/AgenteForm.html',
								controller : 'CreateAgenteController'
							});
							$routeProvider.when('/EditAgente/:id', {
								templateUrl : 'administrador/templates/AgenteForm.html',
								controller : 'EditAgenteController'
							});
						}
]);
