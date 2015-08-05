angular.module('VehiculosModule').controller('VehiculosListController', function($scope, $http, $location, $window) {
	
	$scope.listarVehiculos = function(){
		apiRoot = '//' + $window.location.host + '/_ah/api';
		gapi.client.load('vehiculoendpoint', 'v1',
				$scope.executeListVehiculo, apiRoot);
	}
	
	$scope.executeListVehiculo = function() {
		console.log("LISTAR");
		gapi.client.vehiculoendpoint.listTodosVehiculos().execute(
				function (resp){
					if(!resp.error){
						$scope.vehiculos = resp.result.items;
						$scope.$apply();
					}else{
						console.log(resp);
					}
				}
		);
	}
	
	$scope.aprobarVehiculo = function(id){
		console.log("Aprobar vehiculo "+id);
		gapi.client.vehiculoendpoint.updateEstadoVehiculo({
			'id':id,
			'estado':'APROBADO',
			'documentos':[]
		}).execute(
				function (resp){
					if(!resp.error){
						$location.path('/VehiculosList');
				    	$scope.$apply();
					}else{
						console.log(resp);
					}
				}
		);
	}
	
	$scope.listarVehiculos();
	
});