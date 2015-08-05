angular.module('VehiculosModule').controller('VehiculosListController', function($scope, $http, $location, $window) {
	
	$scope.listarVehiculos = function(){
		apiRoot = '//' + $window.location.host + '/_ah/api';
		gapi.client.load('vehiculoendpoint', 'v1',
				$scope.executeListVehiculo, apiRoot);
	}
	
	$scope.executeListVehiculo = function() {
		console.log("LISTAR");
		gapi.client.vehiculoendpoint.listMisVehiculos({
			'idPropietario':$scope.$root.currentUser.id
		}).execute(
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
	
	$scope.listarVehiculos();
	
});


angular.module('VehiculosModule').controller('VehiculosCreateController', function($scope, $location, $routeParams, $window) {
	
	
	$scope.vehiculo = {
			'idPropietario': $scope.$root.currentUser.id,
			'documentos':[],
			'estado':'REGISTRADO'
	};
	
	var tarjetaPropiedadPicker = new FilePicker({
		buttonEl: document.getElementById('tarjetaPropiedadPicker'),
		onSelect: function(file) {
			$scope.tarjetaPropiedad = file.originalFilename;
			var documento = {'idDocumento':0, 'id':file.id, 'originalFilename':file.originalFilename, 'webContentLink':file.webContentLink};
			$scope.vehiculo.documentos.splice(0,1,documento);
			$scope.$apply();
		}
	});
	
	var soatPicker = new FilePicker({
		buttonEl: document.getElementById('soatPicker'),
		onSelect: function(file) {
			$scope.soat = file.originalFilename;
			var documento = {'idDocumento':1, 'id':file.id, 'originalFilename':file.originalFilename, 'webContentLink':file.webContentLink};
			$scope.vehiculo.documentos.splice(1,1,documento);
			$scope.$apply();
			//window.open('https://drive.google.com/uc?export=download&id='+file.id);
		}
	});
	
	$scope.guardarVehiculo = function(){
		apiRoot = '//' + $window.location.host + '/_ah/api';
		gapi.client.load('vehiculoendpoint', 'v1',
				$scope.executeInsertVehiculo, apiRoot);
	}
	
	$scope.executeInsertVehiculo = function() {
		console.log("Create vehiculo: " + $scope.vehiculo.placa);
		gapi.client.vehiculoendpoint.insertVehiculo($scope.vehiculo).execute(
				function (resp){
					if(!resp.error){
						$location.path('/VehiculosList');
				    	$scope.$apply();
					}else{
						console.log(resp);
					}
				}	
		);
	};
	
});