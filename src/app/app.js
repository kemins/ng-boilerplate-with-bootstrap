(function () {
    angular.module('photo-state', [
        'templates-app',
        'templates-common',
        'ui.router',
        'photo-state.home',
        'photo-state.signup',
        'photo-state.navigation',
        'photo-state.dropdowns',
        'ui.bootstrap.showErrors'
    ])

        .config(['$stateProvider', '$urlRouterProvider', 'showErrorsConfigProvider', function ($stateProvider, $urlRouterProvider, showErrorsConfigProvider) {
            $urlRouterProvider.otherwise('/home');
            showErrorsConfigProvider.showSuccess(true);
        }])

        .run(function run() {
        })

        .controller('AppCtrl', ['$scope', '$location', AppCtrl]);

    function AppCtrl($scope, $location) {

        init();

        function init() {
            $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                if (angular.isDefined(toState.data.pageTitle)) {
                    $scope.pageTitle = toState.data.pageTitle + ' | Photo-State';
                }
            });
        }
    }
})
();

