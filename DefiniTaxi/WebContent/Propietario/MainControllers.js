angular
		.module('MainModule')
		.controller(
				'MainLoginController',
				function($scope, $location, $window, $cookies) {
					
					$scope.onAuthorizeButtonClick = function(){
						gapi.client
						.setApiKey('AIzaSyCjQS3XvWx1gM4NstCpryAg_16dEjp5ryA');
						gapi.auth.authorize(
								{
									client_id : "1038956616402-vb9iu5569j0i4l3b6ovvs56cfrolh5jm.apps.googleusercontent.com",
									scope : "https://www.googleapis.com/auth/userinfo.email",
									immediate : false
								}, $scope.handleAuthResult );
						
					}

					$scope.handleAuthResult = function(authResult) {
						if (authResult && !authResult.error) {
							$scope.identifyUser();
							console.log("Authorization granted");
						} else {
							console.log("Error: No authorization granted.");
						}
					}
					
					$scope.identifyUser = function makeApiCall() {
						  gapi.client.load('plus', 'v1').then(function() {
						    var request = gapi.client.plus.people.get({
						        'userId': 'me'
						          });
						    request.then(function(resp) {
						    	var result = resp.result;
						    	$scope.usuario = {'imageUrl': result.image.url, 'id':result.id,'displayName':result.displayName,'email':result.emails[0].value};
						    	
						    	apiRoot = '//' + $window.location.host + '/_ah/api';
								gapi.client.load('propietarioendpoint', 'v1',
										$scope.guardar, apiRoot);
								
						    }, function(reason) {
						      console.log('Error: ' + reason.result.error.message);
						    });
						  });
						}
					
					$scope.guardar = function() {
						console.log("Saving propietario values");
						gapi.client.propietarioendpoint.insertPropietario($scope.usuario).execute(
								function (resp){
									if(!resp.error){
										$scope.$root.currentUser = resp.result;
										var currentUserString = JSON.stringify($scope.$root.currentUser);
										console.log("currentUserString: "+currentUserString);
										$cookies.currentUser = currentUserString;
										console.log("$cookies.currentUser: "+$cookies.currentUser);
										$location.path('/VehiculosList'); 
										$scope.$root.$apply();
									}else{
										console.log(resp);
									}	
								}
						);
					}


				});

angular.module('MainModule').controller('MainLogoutController',
		function($scope, $location, $cookies) {
			console.log("Logout");
			delete($scope.$root.currentUser);
			delete($cookies.currentUser);
			$scope.$root.$apply();
			$location.path('/login');
		});