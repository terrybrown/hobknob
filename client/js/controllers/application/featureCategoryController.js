featureToggleFrontend.controller('FeatureCategoryController', ['$scope', '$timeout', 'toggleService', 'focus', 'ENV', function($scope, $timeout, toggleService, focus, ENV) {

    $scope.adding = false;
    $scope.newFeatureName = '';
    $scope.setAddingFeatureState = function(state){
        $scope.adding = state;
        if (state){
            focus('newFeatureName');
        }
        else{
            $scope.newFeatureName = '';
        }
    };

    var validateNewFeature = function(featureName){
        if (!featureName){
            return "Must enter an feature name";
        }
        if (!$scope.isFeatureUnique(featureName)){
            return "Feature name must be unique in this application";
        }
        if (!/^[a-z0-9._-]+$/i.test(featureName)){
            return "Feature name must be alphanumeric with no spaces";
        }
    };

    $scope.addFeature = function() {
        var categoryId = $scope.category.id;
        var featureName = $scope.newFeatureName.trim();

        var validationError = validateNewFeature(featureName);
        if (validationError){
            $scope.$emit('error', validationError);
            return;
        }

        toggleService.addFeature($scope.applicationName, categoryId, featureName,
            function(){
                $scope.addFakeFeature(featureName, categoryId);
                $scope.setAddingFeatureState(false);
                $scope.$emit('success', featureName + " was successfully added");
            },
            function(data){
                $scope.$emit('error', "Failed to add feature", new Error(data));
            });
    };
}]);
