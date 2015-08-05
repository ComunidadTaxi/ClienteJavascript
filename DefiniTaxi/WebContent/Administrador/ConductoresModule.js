var ConductoresModule = angular.module('ConductoresModule', [ 'ngRoute', 'ui.bootstrap']);

ConductoresModule.config([ '$routeProvider', 
                         function($routeProvider) {
							console.log("Loading ConductoresModule routes");
							$routeProvider.when('/ConductoresList', {
								templateUrl : '/Administrador/ConductoresList.html',
								controller : 'ConductoresListController'
							});
						}
]);
