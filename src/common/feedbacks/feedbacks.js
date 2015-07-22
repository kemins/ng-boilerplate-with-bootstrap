(function () {
    angular.module('photo-state.feedbacks', [])

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
        ])

        .directive('serviceFaultAlert', ['$http', '$rootScope',

            function ($http, $rootScope) {
                return {
                    restrict: 'E',
                    scope: {},
                    templateUrl: 'feedbacks/serviceFaultAlert.tpl.html',
                    link: function ($scope, $element, $attrs) {
                        $scope.close = function() {
                            $rootScope.serviceError.displayMessage = null;
                        };
                    }
                };
            }
        ]);

})();