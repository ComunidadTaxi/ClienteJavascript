var PropietarioModule = angular.module('PropietarioModule', [ 'ngRoute', 'ui.bootstrap']);

PropietarioModule.config([ '$routeProvider', 
                         function($routeProvider) {
							console.log("Loading PropietarioModule routes");
							$routeProvider.when('/ListPropietario', {
								templateUrl : 'administrador/templates/PropietarioList.html',
								controller : 'ListPropietarioController'
							});
							$routeProvider.when('/CreatePropietario', {
								templateUrl : 'administrador/templates/PropietarioForm.html',
								controller : 'CreatePropietarioController'
							});
							$routeProvider.when('/EditPropietario/:id', {
								templateUrl : 'administrador/templates/PropietarioForm.html',
								controller : 'EditPropietarioController'
							});
							$routeProvider.when('/DashboardPropietario/:id', {
								templateUrl : 'administrador/templates/PropietarioDashboard.html',
								controller : 'DashboardPropietarioController'
							});
						}
]);
