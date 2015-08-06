var VehiculoModule = angular.module('VehiculoModule');

VehiculoModule.controller('ListVehiculoController', [ '$scope', 'PathBuilder', function($scope, PathBuilder) {



}]);

VehiculoModule.controller('CreateVehiculoController', ['$scope', '$location', '$parse','PathBuilder', function($scope, $location, $parse, PathBuilder) {
	
	$scope.item = {};
	
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
		if (!resp.error && !resp.result.error) {
			$location.path('/ListVehiculo');
			$scope.$apply();
		} else {
			console.log(resp);
		}
	};

	$scope.saveItem = function(){
		RestService.initialize({'endpoint':'vehiculoendpoint', 'version':1 ,'method':'insertVehiculo', 'item': $scope.item});
		RestService.insertEntity($scope.callback);
	}

}]);

VehiculoModule.controller('EditVehiculoController', ['$scope', '$location', '$routeParams','PathBuilder', function($scope, $location, $routeParams, PathBuilder) {
	
	
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
		if (!resp.error && !resp.result.error) {
			$scope.item = resp.result;
			$scope.$apply();
		} else {
			console.log(resp);
		}
	};

	RestService.initialize({'endpoint':'vehiculoendpoint', 'version':1 ,'method':'getVehiculo', 'id': $routeParams.id});
	RestService.getEntity($scope.getCallback);
	
	$scope.updateCallback = function(resp){
		if (!resp.error && !resp.result.error) {
			$location.path('/ListVehiculo');
			$scope.$apply();
		} else {
			console.log(resp);
		}
	};

	$scope.saveItem = function(){
		RestService.initialize({'endpoint':'vehiculoendpoint', 'version':1 ,'method':'updateVehiculo', 'item': $scope.item});
		RestService.insertEntity($scope.updateCallback);
	};

}]);