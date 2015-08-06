var MainModule = angular.module('MainModule');

MainModule.factory('PathBuilder', ['globals', function(globals) {
     
    var pathBuilder = {};

    pathBuilder.build = function(endpoint, version){
        return globals.apiRoot 
                        + '/' 
                        + endpoint 
                        + '/' 
                        + version 
                        + '/' 
                        + globals.storespace 
                        + '/';
    }

    return pathBuilder;
}]);