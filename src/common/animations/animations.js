(function () {
    angular.module('photo-state.animations', [])

        .directive('requestsSpinner', ['$http',

            function ($http) {
                return {
                    link: function (scope, elm, attrs) {
                        scope.isLoading = function () {
                            return $http.pendingRequests.length > 0;
                        };

                        scope.$watch(scope.isLoading, function (loading) {
                            if (loading) {
                                elm.removeClass('ng-hide');
                            } else {
                                elm.addClass('ng-hide');
                            }
                        });
                    }
                };
            }
        ]);

})();