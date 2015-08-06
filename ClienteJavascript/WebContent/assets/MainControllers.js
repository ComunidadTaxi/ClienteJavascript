var MainModule = angular.module('MainModule');

MainModule.controller( 'MainLoginController', ['$scope', '$location', '$window', '$cookies','$log', 'PathBuilder', 'globals', 'module' , function($scope, $location, $window, $cookies, $log, PathBuilder, globals, module) {

	$scope.onAuthorizeButtonClick = function(){
		gapi.client.setApiKey('AIzaSyD1zVV_Eo-4uC0GBfKX16_nQZl2Aqt6WGs');
		gapi.auth.authorize(
			{
				client_id : "247761916543-omh04bpotfdslp13r1v65urqvt4t34no.apps.googleusercontent.com",
				scope : "https://www.googleapis.com/auth/userinfo.email",
				immediate : false
			}, $scope.handleAuthResult );
		}

		$scope.handleAuthResult = function(authResult) {
			if (authResult && !authResult.error) {
				var oauthToken = gapi.auth.getToken();
				delete oauthToken['g-oauth-window'];
				var oauthTokenString = JSON.stringify(oauthToken);
				$log.log(oauthTokenString);
				$cookies.put('oauthToken',oauthTokenString);
				$log.log("Authorization granted: "+$cookies.get('oauthToken'));
				$scope.identifyUser();
			} else {
				$log.log("Error: No authorization granted.");
			}
		}
					
		$scope.identifyUser = function makeApiCall() {
			gapi.client.load('plus', 'v1').then(function() {
			var request = gapi.client.plus.people.get({
				'userId': 'me'
			});
			
			request.then(function(resp) {
				if(!resp.error){
					var restRequest = gapi.client.request({
						'path' : PathBuilder.build(module+'endpoint', 1) + 'authenticate'+module,
						'method': 'POST',
						'body': {
							'email': resp.result.emails[0].value
						}
					});
					restRequest.then($scope.callback, $scope.callback);
				}else{
					$log.log("AQUI ESTA: "+resp);
				}	
			}, function(reason) {
				$log.log('AQUI OTRO: ' + reason.result.error.message);
			});
		});
	}

	$scope.callback = function(resp){
		$log.log('authenticate' + module + ' - Status: '+resp.status);
		if ( resp.status == 200 ) {
			resp.result.loggedin = true;
			$scope.initSession(resp.result);
			$location.path('/EntryPoint'); 
			$scope.$root.$apply();
		} else {
			$scope.error = 'Desconocido';
			if(resp.result.error){
				$scope.error = resp.result.error.message;
			}else{
				$scope.error = resp.body;
			}
			$log.log("ERROR: "+$scope.error);
		}
	};

	$scope.onLogin = function() {
		$scope.loginError = null;
		var restRequest = gapi.client.request({
			'path' : PathBuilder.build(module+'endpoint', 1) + 'authenticate'+module,
			'method': 'POST',
			'body': $scope.item
		});
		restRequest.then($scope.callback, $scope.callback);
		$log.log('Invoked authenticate' + module + '...');
	};

	$scope.initSession = function (user){
		$scope.$root.session =  {
						'storespace' : {
							'name' : globals.storespace,
						    'module' : {
						    	'name' : module,
						    	'user' : user }}};
					var session = JSON.stringify($scope.$root.session);
					$log.log("session: "+session);
					$cookies.put('session', session);
					$log.log("$cookies.session: "+$cookies.get('session'));
	};


}]);