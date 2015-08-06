var ServicioModule = angular.module('ServicioModule', [ 'ngRoute', 'ui.bootstrap']);

ServicioModule.config([ '$routeProvider', 
                         function($routeProvider) {
							console.log("Loading ServicioModule routes");
							$routeProvider.when('/EntryPoint', {
								templateUrl : 'agente/templates/ServicioList.html',
								controller : 'ListServicioController'
							});
							$routeProvider.when('/CreateServicio', {
								templateUrl : 'agente/templates/ServicioForm.html',
								controller : 'CreateServicioController'
							});
							$routeProvider.when('/EditServicio/:id', {
								templateUrl : 'agente/templates/ServicioForm.html',
								controller : 'EditServicioController'
							});
						}
]);
