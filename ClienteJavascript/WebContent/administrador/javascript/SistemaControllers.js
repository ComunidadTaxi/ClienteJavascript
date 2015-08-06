var SistemaModule = angular.module('SistemaModule');

SistemaModule.controller('EditSistemaController', ['$scope', '$location', '$routeParams','$log', 'PathBuilder', function($scope, $location, $routeParams, $log, PathBuilder) {
	
	$scope.controllerInitialized = false;

   $scope.$watch(function(){
   		return $scope.$root.GAPILoaded;
   }, function() {
   		if($scope.$root.GAPILoaded){
       	var restRequest = gapi.client.request({
					'path' : PathBuilder.build('sistemaendpoint', 1) + 'getSistema',
					'method' : 'GET'
				});
		restRequest.then($scope.getCallback, $scope.getCallback);
		$log.log('Invoked getSistema...');
	}
   });

	$scope.getCallback = function(resp){
		
		if (!resp.error && !resp.result.error) {
			$scope.item = resp.result;
			$scope.controllerInitialized = true;
			$scope.$apply();
			$log.log('getSistema success.');
		} else {
			$log.log('getSistema error.');
			$log.log(resp);
		}
	};

	

	$scope.updateCallback = function(resp){
		$log.log('updateSistema returned.');
		if (!resp.error && !resp.result.error) {
			$scope.$apply();
		} else {
			console.log(resp);
		}
	};

	$scope.saveItem = function(){
		var restRequest = gapi.client.request({
			  'path' : PathBuilder.build('sistemaendpoint', 1) + 'updateSistema',
			  'method': 'PUT',
			  'body': $scope.item
			});
		
		restRequest.then($scope.updateCallback, $scope.updateCallback);
		$log.log('Invoked updateSistema...');
	};

}]);