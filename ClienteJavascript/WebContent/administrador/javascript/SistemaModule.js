var SistemaModule = angular.module('SistemaModule', [ 'ngRoute', 'ui.bootstrap']);

SistemaModule.config([ '$routeProvider', 
                         function($routeProvider) {
							console.log("Loading SistemaModule routes");
							$routeProvider.when('/EntryPoint', {
								templateUrl : 'administrador/templates/SistemaForm.html',
								controller : 'EditSistemaController'
							});
						}
]);
