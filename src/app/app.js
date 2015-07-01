(function () {
    angular.module('us-elements', [
        'templates-app',
        'templates-common',
        'ui.router',
        'us-elements.home',
        'us-elements.signup',
        'us-elements.navigation'
    ])

        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/home');
        }])

        .run(function run() {
        })

        .controller('AppCtrl', ['$scope', '$location', function AppCtrl($scope, $location) {
            $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                if (angular.isDefined(toState.data.pageTitle)) {
                    $scope.pageTitle = toState.data.pageTitle + ' | US Elements';
                }
            });
        }]);
})();

