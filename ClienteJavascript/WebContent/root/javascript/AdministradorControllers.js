var AdministradorModule = angular.module('AdministradorModule');

AdministradorModule.controller('ListAdministradorController', [ '$scope', '$log', function($scope, $log) {

	$scope.controllerInitialized = false;

	$scope.callback = function(resp){
		$log.log('listAdministrador returned.');
		if (!resp.error && !resp.result.error) {
			$scope.items = resp.result.items;
			$scope.controllerInitialized = true;
			$scope.$apply();
			$log.log('listAdministrador success.');
		} else {	
			console.log(resp);
			$log.log('listAdministrador error.');
		}
	};


   	$scope.$watch(function(){
   		return $scope.$root.GAPILoaded;
   	}, function() {
   		$log.log("Watch function invoked...");
   		if($scope.$root.GAPILoaded){
       		var restRequest = gapi.client.request({
					'path' : 'https://red-amarilla.appspot.com/_ah/api/administradorendpoint/1/listAdministrador',
					'method' : 'GET'
				});
			restRequest.then($scope.callback, $scope.callback);
			$log.log('Invoked listAdministrador...');
		}
   	});

}]);

AdministradorModule.controller('CreateAdministradorController', ['$scope', '$location', '$log', function($scope, $location, $log) {
	
	$scope.controllerInitialized = true;

	$scope.callback = function(resp){
		$log.log('insertAdministrador returned.');
		if (!resp.error && !resp.result.error) {
			$location.path('/ListAdministrador');
			$scope.$apply();
			$log.log('insertAdministrador success.');
		} else {
			console.log(resp);
			$log.log('insertAdministrador error.');
		}
	};

	$scope.saveItem = function(){
		var restRequest = gapi.client.request({
			  'path' : 'https://red-amarilla.appspot.com/_ah/api/administradorendpoint/1/insertAdministrador',
			  'method': 'POST',
			  'body': $scope.item
			});
		
		restRequest.then($scope.callback, $scope.callback);
		$log.log('Invoked insertAdministrador...');
	};

}]);

AdministradorModule.controller('EditAdministradorController', ['$scope', '$location', '$routeParams','$log', function($scope, $location, $routeParams, $log) {
	
	$scope.getCallback = function(resp){
		$log.log('getAdministrador returned.');
		if (!resp.error && !resp.result.error) {
			$scope.item = resp.result;
			$scope.controllerInitialized = true;
			$scope.$apply();
			$log.log('getAdministrador success.');
		} else {
			console.log(resp);
			$log.log('getAdministrador error.');
		}
	};

	$scope.$watch(function(){
   		return $scope.$root.GAPILoaded;
   	}, function() {
   		if($scope.$root.GAPILoaded){
       		var restRequest = gapi.client.request({	
					'path' : 'https://red-amarilla.appspot.com/_ah/api/administradorendpoint/1/getAdministrador',
					'method' : 'GET',
					'params': {'id':$routeParams.id}
				});
			restRequest.then($scope.getCallback, $scope.getCallback);
			$log.log('Invoked getAdministrador...');
		}
   	});

	$scope.updateCallback = function(resp){
		$log.log('updateAdministrador returned.');
		if (!resp.error && !resp.result.error) {
			$location.path('/ListAdministrador');
			$scope.$apply();
		} else {
			console.log(resp);
		}
	};

	$scope.saveItem = function(){
		var restRequest = gapi.client.request({
			  'path' : 'https://red-amarilla.appspot.com/_ah/api/administradorendpoint/1/updateAdministrador',
			  'method': 'PUT',
			  'body': $scope.item
			});
		
		restRequest.then($scope.updateCallback, $scope.updateCallback);
		$log.log('Invoked updateAdministrador...');
	};

}]);