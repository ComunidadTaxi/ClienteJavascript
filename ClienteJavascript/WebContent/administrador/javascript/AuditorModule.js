var AuditorModule = angular.module('AuditorModule', [ 'ngRoute', 'ui.bootstrap']);

AuditorModule.config([ '$routeProvider' , function($routeProvider) {
							console.log("Loading AuditorModule routes");
							$routeProvider.when('/ListAuditor', {
								templateUrl : 'administrador/templates/AuditorList.html',
								controller : 'ListAuditorController'
							});
							$routeProvider.when('/CreateAuditor', {
								templateUrl : 'administrador/templates/AuditorForm.html',
								controller : 'CreateAuditorController'
							});
							$routeProvider.when('/EditAuditor/:id', {
								templateUrl : 'administrador/templates/AuditorForm.html',
								controller : 'EditAuditorController'
							});
						}
]);

