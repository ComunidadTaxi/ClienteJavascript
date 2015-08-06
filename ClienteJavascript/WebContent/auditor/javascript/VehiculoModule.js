var VehiculoModule = angular.module('VehiculoModule', [ 'ngRoute', 'ui.bootstrap']);

VehiculoModule.config([ '$routeProvider' , function($routeProvider) {
							console.log("Loading VehiculoModule routes");
							$routeProvider.when('/EntryPoint', {
								templateUrl : 'auditor/templates/VehiculoList.html',
								controller : 'ListVehiculoController'
							});
						}
]);

