var VehiculoModule = angular.module('VehiculoModule');

VehiculoModule.controller('ListVehiculoController', [ '$scope', '$log', 'PathBuilder', function($scope, $log, PathBuilder) {

	$scope.callback = function(resp){
		$log.log('listVehiculo returned.');
		if (!resp.error && !resp.result.error) {
			$scope.items = resp.result.items;
			$scope.$apply();
		} else {
			console.log(resp);
		}
	};

	var restRequest = gapi.client.request({
					'path' : PathBuilder.build('vehiculoendpoint', 1) + 'listVehiculo/'+$scope.$root.session.storespace.module.user.id,
					'method' : 'GET'
				});
	restRequest.then($scope.callback, $scope.callback);
	$log.log('Invoked listVehiculo...');
}]);

VehiculoModule.controller('CreateVehiculoController', ['$scope', '$location', '$parse','$log','PathBuilder', function($scope, $location, $parse, $log, PathBuilder) {
	
	$scope.item = {'idPropietario':$scope.$root.session.storespace.module.user.id};
	
	$scope.format = 'dd-MMMM-yyyy';

	$scope.openCalendar = function($event, flag) {	
	    $event.preventDefault();
	    $event.stopPropagation();
	    var opened = $parse(flag);
	    opened.assign($scope, true);
	    //$scope.$apply();
	};
	
	var soatPicker = new FilePicker({
		buttonEl: document.getElementById('soatPicker'),
		onSelect: function(file) {
			$scope.item.soat = file;
			$scope.$apply();
		}
	});
	
	var revisionPicker = new FilePicker({
		buttonEl: document.getElementById('revisionPicker'),
		onSelect: function(file) {
			$scope.item.revision = file;
			$scope.$apply();
		}
	});
	
	var tarjetaOperacionPicker = new FilePicker({
		buttonEl: document.getElementById('tarjetaOperacionPicker'),
		onSelect: function(file) {
			$scope.item.tarjetaOperacion = file;
			$scope.$apply();
		}
	});

	$scope.callback = function(resp){
		$log.log('insertVehiculo returned.');
		if (!resp.error && !resp.result.error) {
			$location.path('/ListVehiculo');
			$scope.$apply();
		} else {
			console.log(resp);
		}
	};

	$scope.saveItem = function(){
		var restRequest = gapi.client.request({
			  'path' : PathBuilder.build('vehiculoendpoint', 1) + 'insertVehiculo',
			  'method': 'POST',
			  'body': $scope.item
			});
		
		restRequest.then($scope.callback, $scope.callback);
		$log.log('Invoked insertVehiculo...');
	};

}]);

VehiculoModule.controller('EditVehiculoController', ['$scope', '$location', '$parse','$log','$routeParams', 'PathBuilder', function($scope, $location, $parse, $log, $routeParams, PathBuilder) {
	
	
	$scope.format = 'dd-MMMM-yyyy';
	
	$scope.openCalendar = function($event, flag) {	
	    $event.preventDefault();
	    $event.stopPropagation();
	    var opened = $parse(flag);
	    opened.assign($scope, true);
	    //$scope.$apply();
	};
	
	var soatPicker = new FilePicker({
		buttonEl: document.getElementById('soatPicker'),
		onSelect: function(file) {
			$scope.item.soat = file;
			$scope.$apply();
		}
	});
	
	var revisionPicker = new FilePicker({
		buttonEl: document.getElementById('revisionPicker'),
		onSelect: function(file) {
			$scope.item.revision = file;
			$scope.$apply();
		}
	});
	
	var tarjetaOperacionPicker = new FilePicker({
		buttonEl: document.getElementById('tarjetaOperacionPicker'),
		onSelect: function(file) {
			$scope.item.tarjetaOperacion = file;
			$scope.$apply();
		}
	});
	
	
		
	$scope.getCallback = function(resp){
		$log.log('getVehiculo returned.');
		if (!resp.error && !resp.result.error) {
			$scope.item = resp.result;
			$scope.$apply();
		} else {
			console.log(resp);
		}
	};

	var restRequest = gapi.client.request({
					'path' : PathBuilder.build('vehiculoendpoint', 1) + 'getVehiculo',
					'method' : 'GET',
					'params': {'id':$routeParams.id}
				});
	restRequest.then($scope.getCallback, $scope.getCallback);
	$log.log('Invoked getVehiculo...');
	
	$scope.updateCallback = function(resp){
		$log.log('updateVehiculo returned.');
		if (!resp.error && !resp.result.error) {
			$location.path('/ListVehiculo');
			$scope.$apply();
		} else {
			console.log(resp);
		}
	};

	$scope.saveItem = function(){
		var restRequest = gapi.client.request({
			  'path' : PathBuilder.build('vehiculoendpoint', 1) + 'updateVehiculo',
			  'method': 'PUT',
			  'body': $scope.item
			});
		
		restRequest.then($scope.updateCallback, $scope.updateCallback);
		$log.log('Invoked updateVehiculo...');
	};

}]);