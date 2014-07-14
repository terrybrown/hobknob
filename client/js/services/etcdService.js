'use strict';

angular.module('featureToggleFrontend').factory('etcdApiService', function($http, etcdPathService, ENV) {
	var etcdApiService = {};

	etcdApiService.getApplications = function() {
	    return $http.get(etcdPathService.getFullKeyPath(ENV.etcdVersion + '/toggles'));
	};

	etcdApiService.getApplication = function(appName) {
	    return $http.get(etcdPathService.getFullKeyPath(ENV.etcdVersion + '/toggles/' + appName));
	};

	etcdApiService.getToggles = function(key) {
		return $http.get(etcdPathService.getFullKeyPath(key));
	};

	etcdApiService.updateToggle = function(toggle) {
		return $http.put(etcdPathService.getFullKeyPath(toggle.key), "value=" + toggle.boolValue, {
      		headers:{
          		"Content-Type": "application/x-www-form-urlencoded"
        	}
     	});
	}

  	etcdApiService.create = function(applicationName, toggleName) {
    	var featureTogglePath = etcdPathService.getFullKeyPath(ENV.etcdVersion + '/toggles/' + applicationName + "/" + toggleName);
    	return $http.put(featureTogglePath, "value=false", {
      		headers:{
          		"Content-Type": "application/x-www-form-urlencoded"
        	}
     	});
  	};

	return etcdApiService;
});