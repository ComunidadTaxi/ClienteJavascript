angular.module('ConductoresModule').controller('VehiculosConductorListController', function($scope, $http, $location, $window, $routeParams) {
	
	$scope.placa = $routeParams.placa;
	
	$scope.listarConductores = function(){
		apiRoot = '//' + $window.location.host + '/_ah/api';
		gapi.client.load('conductorendpoint', 'v1',
				$scope.executeListVehiculo, apiRoot);
	}
	
	$scope.executeListVehiculo = function() {
		console.log("LISTAR");
		gapi.client.conductorendpoint.listVehiculosConductor({
			'email':$scope.$root.currentUser.email
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


angular.module('ConductoresModule').controller('VehiculoConductorUpdate', function($scope, $location, $routeParams, $window) {
	
	$scope.conductor = {
			'id':$routeParams.registro,
			'imageUrl':$scope.$root.currentUser.imageUrl,
			'documentos':[],
			'estado':'DILIGENCIADO'				
	};
	
	var cedulaPicker = new FilePicker({
		buttonEl: document.getElementById('cedulaPicker'),
		onSelect: function(file) {
			$scope.cedula = file.originalFilename;
			var documento = {'idDocumento':0, 'id':file.id, 'originalFilename':file.originalFilename, 'webContentLink':file.webContentLink};
			$scope.conductor.documentos.splice(0,1,documento);
			$scope.$apply();
		}
	});
	
	var licenciaPicker = new FilePicker({
		buttonEl: document.getElementById('licenciaPicker'),
		onSelect: function(file) {
			$scope.licencia = file.originalFilename;
			var documento = {'idDocumento':1, 'id':file.id, 'originalFilename':file.originalFilename, 'webContentLink':file.webContentLink};
			$scope.conductor.documentos.splice(1,1,documento);
			$scope.$apply();
			//window.open('https://drive.google.com/uc?export=download&id='+file.id);
		}
	});
	
	$scope.guardarConductor= function(){
		apiRoot = '//' + $window.location.host + '/_ah/api';
		gapi.client.load('conductorendpoint', 'v1',
				$scope.executeUpdateDocumentosConductor, apiRoot);
	}
	
	$scope.executeUpdateDocumentosConductor = function() {
		console.log("Update conductor: " + $scope.conductor.id);
		gapi.client.conductorendpoint.updateDocumentosConductor($scope.conductor).execute(
				function (resp){
					if(!resp.error){
						$location.path('/VehiculosConductorList');
				    	$scope.$apply();
					}else{
						console.log(resp);
					}
				}
		);
	};
	
});