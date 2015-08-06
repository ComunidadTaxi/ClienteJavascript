var ConductorModule = angular.module('ConductorModule');

ConductorModule.controller('ListConductorController', ['$scope', '$location', '$log','$routeParams', 'PathBuilder', function($scope, $location, $log, $routeParams, PathBuilder) {

	$scope.idVehiculo = $routeParams.idVehiculo;

	$scope.callback = function(resp){
		$log.log('listConductor returned.');
		if (!resp.error && !resp.result.error) {
			$scope.items = resp.result.items;
			$scope.$apply();
		} else {
			console.log(resp);
		}
	};

	var restRequest = gapi.client.request({
					'path' : PathBuilder.build('conductorendpoint', 1) + 'listConductor/'+$routeParams.idVehiculo,
					'method' : 'GET'
				});
	restRequest.then($scope.callback, $scope.callback);
	$log.log('Invoked listConductor...');

}]);

ConductorModule.controller('CreateConductorController', ['$scope', '$location', '$parse','$log','$routeParams','PathBuilder', function($scope, $location, $parse, $log,$routeParams, PathBuilder) {

	$scope.callback = function(resp){
		$log.log('insertConductor returned.');
		if (!resp.error && !resp.result.error) {
			$location.path('/ListConductor/'+$routeParams.idVehiculo);
			$scope.$apply();
		} else {
			console.log(resp);
		}
	};

	$scope.saveItem = function(){
		var restRequest = gapi.client.request({
			  'path' : PathBuilder.build('conductorendpoint', 1) + 'insertConductor/'+$routeParams.idVehiculo,
			  'method': 'POST',
			  'body': $scope.item
			});
		
		restRequest.then($scope.callback, $scope.callback);
		$log.log('Invoked insertConductor...');
	};

}]);

ConductorModule.controller('EditConductorController', ['$scope', '$location', '$parse','$log','$routeParams', 'PathBuilder', function($scope, $location, $parse, $log, $routeParams, PathBuilder) {
		
	$scope.getCallback = function(resp){
		$log.log('getConductor returned.');
		if (!resp.error && !resp.result.error) {
			$scope.item = resp.result;
			$scope.$apply();
		} else {
			console.log(resp);
		}
	};

	var restRequest = gapi.client.request({
					'path' : PathBuilder.build('conductorendpoint', 1) + 'getConductor',
					'method' : 'GET',
					'params': {'id':$routeParams.id}
				});
	restRequest.then($scope.getCallback, $scope.getCallback);
	$log.log('Invoked getConductor...');
	
	$scope.updateCallback = function(resp){
		$log.log('updateConductor returned.');
		if (!resp.error && !resp.result.error) {
			$location.path('/ListConductor');
			$scope.$apply();
		} else {
			console.log(resp);
		}
	};

	$scope.saveItem = function(){
		var restRequest = gapi.client.request({
			  'path' : PathBuilder.build('conductorendpoint', 1) + 'updateConductor',
			  'method': 'PUT',
			  'body': $scope.item
			});
		
		restRequest.then($scope.updateCallback, $scope.updateCallback);
		$log.log('Invoked updateConductor...');
	};


}]);