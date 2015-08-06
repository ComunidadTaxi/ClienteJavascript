var ServicioModule = angular.module('ServicioModule', [ 'ngRoute', 'ui.bootstrap']);

ServicioModule.config([ '$routeProvider', 
                         function($routeProvider) {
							console.log("Loading ServicioModule routes");
							$routeProvider.when('/ListServicio', {
								templateUrl : 'administrador/templates/ServicioList.html',
								controller : 'ListServicioController'
							});
							$routeProvider.when('/CreateServicio', {
								templateUrl : 'administrador/templates/ServicioForm.html',
								controller : 'CreateServicioController'
							});
							$routeProvider.when('/EditServicio/:id', {
								templateUrl : 'administrador/templates/ServicioForm.html',
								controller : 'EditServicioController'
							});
						}
]);


