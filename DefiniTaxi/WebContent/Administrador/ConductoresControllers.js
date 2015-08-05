angular.module('ConductoresModule').controller('ConductoresListController', function($scope, $http, $location, $window, $routeParams) {
	
	$scope.placa = $routeParams.placa;
	
	$scope.listarConductores = function(){
		apiRoot = '//' + $window.location.host + '/_ah/api';
		gapi.client.load('conductorendpoint', 'v1',
				$scope.executeListConductores, apiRoot);
	}
	
	$scope.executeListConductores = function() {
		console.log("Listar Conductores");
		gapi.client.conductorendpoint.listTodosConductores().execute(
				function (resp){
					if(!resp.error){
						$scope.conductores = resp.result.items;
				    	$scope.$apply();
					}else{
						console.log(resp);
					}
				}
		);
	}
	
	$scope.aprobarConductor = function(id){
		console.log("Aprobar conductor "+id);
		gapi.client.conductorendpoint.updateEstadoConductor({
			'id':id,
			'estado':'APROBADO',
			'documentos':[]
		}).execute(
				function (resp){
					if(!resp.error){
						$location.path('/ConductoresList');
				    	$scope.$apply();
					}else{
						console.log(resp);
					}
				}
		);
	}
	
	$scope.listarConductores();
	
});