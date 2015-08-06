var AuditorModule = angular.module('AuditorModule');

AuditorModule.controller('ListAuditorController', [ '$scope', '$log', 'PathBuilder', function($scope, $log, PathBuilder) {

	$scope.callback = function(resp){
		$log.log('listAuditor returned.');
		if (!resp.error && !resp.result.error) {
			$scope.items = resp.result.items;
			$scope.$apply();
		} else {
			console.log(resp);
		}
	};

	var restRequest = gapi.client.request({
					'path' : PathBuilder.build('auditorendpoint', 1) + 'listAuditor',
					'method' : 'GET'
				});
	restRequest.then($scope.callback, $scope.callback);
	$log.log('Invoked listAuditor...');
}]);

AuditorModule.controller('CreateAuditorController', ['$scope', '$location', '$log', 'PathBuilder', function($scope, $location, $log, PathBuilder) {
	
	$scope.callback = function(resp){
		$log.log('insertAuditor returned.');
		if (!resp.error && !resp.result.error) {
			$location.path('/ListAuditor');
			$scope.$apply();
		} else {
			console.log(resp);
		}
	};

	$scope.saveItem = function(){
		var restRequest = gapi.client.request({
			  'path' : PathBuilder.build('auditorendpoint', 1) + 'insertAuditor',
			  'method': 'POST',
			  'body': $scope.item
			});
		
		restRequest.then($scope.callback, $scope.callback);
		$log.log('Invoked insertAuditor...');
	};

}]);

AuditorModule.controller('EditAuditorController', ['$scope', '$location', '$routeParams','$log','PathBuilder', function($scope, $location, $routeParams, $log, PathBuilder) {
	
	$scope.getCallback = function(resp){
		$log.log('getAuditor returned.');
		if (!resp.error && !resp.result.error) {
			$scope.item = resp.result;
			$scope.$apply();
		} else {
			console.log(resp);
		}
	};

	var restRequest = gapi.client.request({
					'path' : PathBuilder.build('auditorendpoint', 1) + 'getAuditor',
					'method' : 'GET',
					'params': {'id':$routeParams.id}
				});
	restRequest.then($scope.getCallback, $scope.getCallback);
	$log.log('Invoked getAuditor...');

	$scope.updateCallback = function(resp){
		$log.log('updateAuditor returned.');
		if (!resp.error && !resp.result.error) {
			$location.path('/ListAuditor');
			$scope.$apply();
		} else {
			console.log(resp);
		}
	};

	$scope.saveItem = function(){
		var restRequest = gapi.client.request({
			  'path' : PathBuilder.build('auditorendpoint', 1) + 'updateAuditor',
			  'method': 'PUT',
			  'body': $scope.item
			});
		
		restRequest.then($scope.updateCallback, $scope.updateCallback);
		$log.log('Invoked updateAuditor...');
	};

}]);