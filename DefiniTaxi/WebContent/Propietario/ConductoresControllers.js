angular.module('ConductoresModule').controller('ConductoresVehiculoController', function($scope, $http, $location, $window, $routeParams) {
	
	$scope.placa = $routeParams.placa;
	
	$scope.listarConductores = function(){
		apiRoot = '//' + $window.location.host + '/_ah/api';
		gapi.client.load('conductorendpoint', 'v1',
				$scope.executeListVehiculo, apiRoot);
	}
	
	$scope.executeListVehiculo = function() {
		console.log("LISTAR");
		gapi.client.conductorendpoint.listConductoresVehiculo({
			'placa':$scope.placa,
			'idPropietario':$scope.$root.currentUser.id
		}).execute(
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
	
	$scope.listarConductores();
	
});


angular.module('ConductoresModule').controller('ConductoresCreateController', function($scope, $location, $routeParams, $window) {
	
	$scope.placa = $routeParams.placa;
	$scope.conductor = {
			'idPropietario':$scope.$root.currentUser.id,
			'placa':$scope.placa,
			'estado':'REGISTRADO'				
	};
	
	$scope.guardarConductor= function(){
		apiRoot = '//' + $window.location.host + '/_ah/api';
		gapi.client.load('conductorendpoint', 'v1',
				$scope.executeInsertConductor, apiRoot);
	}
	
	$scope.executeInsertConductor = function() {
		console.log("Create conductor: " + $scope.conductor.cedula);
		gapi.client.conductorendpoint.insertConductor($scope.conductor).execute(
				function (resp){
					if(!resp.error){
						$location.path('/ConductoresList/'+$scope.placa);
				    	$scope.$apply();
					}else{
						console.log(resp);
					}
				}
		);
	};
	
});