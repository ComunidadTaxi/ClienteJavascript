var ServicioModule = angular.module('ServicioModule');

ServicioModule.controller('ListServicioController', [ '$scope', '$log', 'PathBuilder', function($scope, $log, PathBuilder) {

	$scope.callback = function(resp){
		$log.log('listServicio returned.');
		if (!resp.error && !resp.result.error) {
			$scope.items = resp.result.items;
			$scope.$apply();
		} else {
			console.log(resp);
		}
	};

	var restRequest = gapi.client.request({
					'path' : PathBuilder.build('servicioendpoint', 1) + 'listServicio',
					'method' : 'GET'
				});
	restRequest.then($scope.callback, $scope.callback);
	$log.log('Invoked listServicio...');
}]);

ServicioModule.controller('CreateServicioController', ['$scope', '$location', '$log', 'PathBuilder', function($scope, $location, $log, PathBuilder) {
	
	$scope.callback = function(resp){
		$log.log('insertServicio returned.');
		if (!resp.error && !resp.result.error) {
			$location.path('/ListServicio');
			$scope.$apply();
		} else {
			console.log(resp);
		}
	};

	$scope.saveItem = function(){
		var restRequest = gapi.client.request({
			  'path' : PathBuilder.build('servicioendpoint', 1) + 'insertServicio',
			  'method': 'POST',
			  'body': $scope.item
			});
		
		restRequest.then($scope.callback, $scope.callback);
		$log.log('Invoked insertServicio...');
	};

}]);

ServicioModule.controller('EditServicioController', ['$scope', '$location', '$routeParams','$log', 'PathBuilder', function($scope, $location, $routeParams, $log, PathBuilder) {
	
	$scope.getCallback = function(resp){
		$log.log('getServicio returned.');
		if (!resp.error && !resp.result.error) {
			$scope.item = resp.result;
			$scope.$apply();
		} else {
			console.log(resp);
		}
	};

	var restRequest = gapi.client.request({
					'path' : PathBuilder.build('servicioendpoint', 1) + 'getServicio',
					'method' : 'GET',
					'params': {'id':$routeParams.id}
				});
	restRequest.then($scope.getCallback, $scope.getCallback);
	$log.log('Invoked getServicio...');

	$scope.updateCallback = function(resp){
		$log.log('updateServicio returned.');
		if (!resp.error && !resp.result.error) {
			$location.path('/ListServicio');
			$scope.$apply();
		} else {
			console.log(resp);
		}
	};

	$scope.saveItem = function(){
		var restRequest = gapi.client.request({
			  'path' : PathBuilder.build('servicioendpoint', 1) + 'updateServicio',
			  'method': 'PUT',
			  'body': $scope.item
			});
		
		restRequest.then($scope.updateCallback, $scope.updateCallback);
		$log.log('Invoked updateServicio...');
	};

}]);