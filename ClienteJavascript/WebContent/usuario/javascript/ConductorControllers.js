var ConductorModule = angular.module('ConductorModule');

ConductorModule.value("requestValues",
	{
		endpoint : 'conductorendpoint',
		version : 1
	}
);

ConductorModule.controller('ListConductorController', function($scope, $routeParams, PathBuilder, requestValues) {

	$scope.idVehiculo = $routeParams.idVehiculo;
	
			$scope.listConductor = function() {

				var restRequest = gapi.client.request({
					'path' : PathBuilder.build(requestValues, 'listConductor') + '/' +$scope.idVehiculo,
					'method' : 'GET'
				});

				restRequest.then(function(resp) {
					if (!resp.error) {
						$scope.items = resp.result.items;
						$scope.$apply();
					} else {
						console.log(resp);
					}
				}, function(reason) {
					console.log('Error: ' + reason.result.error.message);
				});

			}
			
			$scope.listConductor();

		});

ConductorModule.controller('CreateConductorController', function($scope, $http,
		$location, $routeParams) {
	
	$scope.saveItem = function(){
		console.log("InsertConductor");
		$scope.idVehiculo = $routeParams.idVehiculo;
		var restRequest = gapi.client.request({
			  'path': $scope.$root.apiRoot
			  		+ '/conductorendpoint/1/insertConductor/'
			  		+ $scope.$root.namespace+"/"+$scope.idVehiculo,
			  'method': 'POST',
			  'body': $scope.item
			});
		
		restRequest.then(function(resp) {
				if(!resp.error){
					$location.path('/ListConductor/'+$routeParams.idVehiculo);
					$scope.$apply();
				}else{
					console.log(resp);
				}
			}, function(reason) {
			  console.log('Error: ' + reason.result.error.message);
			});
	};

});

ConductorModule.controller('EditConductorController', function($scope, $http,
		$location, $routeParams) {
		
	$scope.getItem = function(id){
		console.log("GetConductor");
		var restRequest = gapi.client.request({
			  'path': $scope.$root.apiRoot
			  		+ '/conductorendpoint/1/getConductor/'
			  		+ $scope.$root.namespace,
			  'method': 'GET',
			  'params': {'id':id}
			});
		
		restRequest.then(function(resp) {
				if(!resp.error){
					console.log(resp);
					$scope.item = resp.result;
					$scope.$apply();
				}else{
					console.log(resp);
				}
			}, function(reason) {
			  console.log('Error: ' + reason.result.error.message);
			});
	};
	
	$scope.saveItem = function(){
		console.log("UpdateConductor");
		var restRequest = gapi.client.request({
			  'path': $scope.$root.apiRoot
			  		+ '/conductorendpoint/1/updateConductor/'
			  		+ $scope.$root.namespace,
			  'method': 'PUT',
			  'body': $scope.item
			});
		
		restRequest.then(function(resp) {
				if(!resp.error){
					$location.path('/ListConductor');
					$scope.$apply();
				}else{
					console.log(resp);
				}
			}, function(reason) {
			  console.log('Error: ' + reason.result.error.message);
			});
	};
	
	$scope.getItem($routeParams.id);

});