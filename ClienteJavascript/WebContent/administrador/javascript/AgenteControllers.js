var AgenteModule = angular.module('AgenteModule');

AgenteModule.controller('ListAgenteController', [ '$scope', '$log', 'PathBuilder', function($scope, $log, PathBuilder) {

	$scope.callback = function(resp){
		$log.log('listAgente returned.');
		if (!resp.error && !resp.result.error) {
			$scope.items = resp.result.items;
			$scope.$apply();
		} else {
			console.log(resp);
		}
	};

	var restRequest = gapi.client.request({
					'path' : PathBuilder.build('agenteendpoint', 1) + 'listAgente',
					'method' : 'GET'
				});
	restRequest.then($scope.callback, $scope.callback);
	$log.log('Invoked listAgente...');
}]);

AgenteModule.controller('CreateAgenteController', ['$scope', '$location', '$log', 'PathBuilder', function($scope, $location, $log, PathBuilder) {
	
	$scope.callback = function(resp){
		$log.log('insertAgente returned.');
		if (!resp.error && !resp.result.error) {
			$location.path('/ListAgente');
			$scope.$apply();
		} else {
			console.log(resp);
		}
	};

	$scope.saveItem = function(){
		var restRequest = gapi.client.request({
			  'path' : PathBuilder.build('agenteendpoint', 1) + 'insertAgente',
			  'method': 'POST',
			  'body': $scope.item
			});
		
		restRequest.then($scope.callback, $scope.callback);
		$log.log('Invoked insertAgente...');
	};

}]);

AgenteModule.controller('EditAgenteController', ['$scope', '$location', '$routeParams','$log', 'PathBuilder', function($scope, $location, $routeParams, $log, PathBuilder) {
	
	$scope.getCallback = function(resp){
		$log.log('getAgente returned.');
		if (!resp.error && !resp.result.error) {
			$scope.item = resp.result;
			$scope.$apply();
		} else {
			console.log(resp);
		}
	};

	var restRequest = gapi.client.request({
					'path' : PathBuilder.build('agenteendpoint', 1) + 'getAgente',
					'method' : 'GET',
					'params': {'id':$routeParams.id}
				});
	restRequest.then($scope.getCallback, $scope.getCallback);
	$log.log('Invoked getAgente...');

	$scope.updateCallback = function(resp){
		$log.log('updateAgente returned.');
		if (!resp.error && !resp.result.error) {
			$location.path('/ListAgente');
			$scope.$apply();
		} else {
			console.log(resp);
		}
	};

	$scope.saveItem = function(){
		var restRequest = gapi.client.request({
			  'path' : PathBuilder.build('agenteendpoint', 1) + 'updateAgente',
			  'method': 'PUT',
			  'body': $scope.item
			});
		
		restRequest.then($scope.updateCallback, $scope.updateCallback);
		$log.log('Invoked updateAgente...');
	};

}]);