var VehiculoModule = angular.module('VehiculoModule');

VehiculoModule.controller('ListVehiculoController', [ '$scope', '$log', 'PathBuilder', function($scope, $log, PathBuilder) {

	$scope.callback = function(resp){
		$log.log('listVehiculoAuditor returned.');
		if (!resp.error && !resp.result.error) {
			$scope.items = resp.result.items;
			$scope.$apply();
		} else {
			console.log(resp);
		}
	};

	var restRequest = gapi.client.request({
					'path' : PathBuilder.build('auditorendpoint', 1) + 'listVehiculoAuditor',
					'method' : 'GET'
				});
	restRequest.then($scope.callback, $scope.callback);
	$log.log('Invoked listVehiculoAuditor...');
}]);