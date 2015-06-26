angular.module('photo-state', [
    'templates-app',
    'templates-common',
    'photo-state.home',
    'photo-state.about',
    'ui.router',
    'navigation'
])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    }])

    .run(function run() {
    })

    .controller('AppCtrl', ['$scope', '$location', function AppCtrl($scope, $location) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate';
            }
        });
    }])

;

