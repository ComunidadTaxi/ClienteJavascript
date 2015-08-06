var PropietarioModule = angular.module('PropietarioModule');

PropietarioModule.controller('DashboardPropietarioController', [ '$scope', '$log', 'PathBuilder', function($scope, $log, PathBuilder) {
}]);

PropietarioModule.controller('ListPropietarioController', [ '$scope', '$log', 'PathBuilder', function($scope, $log, PathBuilder) {

	$scope.callback = function(resp){
		$log.log('listPropietario returned.');
		if (!resp.error && !resp.result.error) {
			$scope.items = resp.result.items;
			$scope.$apply();
		} else {
			console.log(resp);
		}
	};

	var restRequest = gapi.client.request({
					'path' : PathBuilder.build('propietarioendpoint', 1) + 'listPropietario',
					'method' : 'GET'
				});
	restRequest.then($scope.callback, $scope.callback);
	$log.log('Invoked listPropietario...');
}]);

PropietarioModule.controller('CreatePropietarioController', ['$scope', '$location', '$log', 'PathBuilder', function($scope, $location, $log, PathBuilder) {
	
	$scope.callback = function(resp){
		$log.log('insertPropietario returned.');
		if (!resp.error && !resp.result.error) {
			$location.path('/ListPropietario');
			$scope.$apply();
		} else {
			console.log(resp);
		}
	};

	$scope.saveItem = function(){
		var restRequest = gapi.client.request({
			  'path' : PathBuilder.build('propietarioendpoint', 1) + 'insertPropietario',
			  'method': 'POST',
			  'body': $scope.item
			});
		
		restRequest.then($scope.callback, $scope.callback);
		$log.log('Invoked insertPropietario...');
	};

}]);

PropietarioModule.controller('EditPropietarioController', ['$scope', '$location','$routeParams','$log', 'PathBuilder', function($scope, $location, $routeParams, $log, PathBuilder) {
	
	$scope.getCallback = function(resp){
		$log.log('getPropietario returned.');
		if (!resp.error && !resp.result.error) {
			$scope.item = resp.result;
			$scope.$apply();
		} else {
			console.log(resp);
		}
	};

	var restRequest = gapi.client.request({
					'path' : PathBuilder.build('propietarioendpoint', 1) + 'getPropietario',
					'method' : 'GET',
					'params': {'id':$routeParams.id}
				});
	restRequest.then($scope.getCallback, $scope.getCallback);
	$log.log('Invoked getPropietario...');

	$scope.updateCallback = function(resp){
		$log.log('updatePropietario returned.');
		if (!resp.error && !resp.result.error) {
			$location.path('/ListPropietario');
			$scope.$apply();
		} else {
			console.log(resp);
		}
	};

	$scope.saveItem = function(){
		var restRequest = gapi.client.request({
			  'path' : PathBuilder.build('propietarioendpoint', 1) + 'updatePropietario',
			  'method': 'PUT',
			  'body': $scope.item
			});
		
		restRequest.then($scope.updateCallback, $scope.updateCallback);
		$log.log('Invoked updatePropietario...');
	};

}]);