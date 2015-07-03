(function () {
    angular.module('photo-state', [
        'ngMessages',
        'templates-app',
        'templates-common',
        'ui.router',
        'photo-state.home',
        'photo-state.signup',
        'photo-state.navigation',
        'photo-state.dropdowns',
        'photo-state.constants',
        'ui.bootstrap.showErrors'
    ])

        .config(['$stateProvider', '$urlRouterProvider', 'showErrorsConfigProvider', function ($stateProvider, $urlRouterProvider, showErrorsConfigProvider) {
            $urlRouterProvider.otherwise('/home');
            showErrorsConfigProvider.showSuccess(true);
        }])

        .run(function run() {
        })

        .controller('AppCtrl', ['$scope', '$location', 'appConfig', AppCtrl]);

    function AppCtrl($scope, $location, appConfig) {

        var self = this;
        init();

        function init() {
            $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                if (angular.isDefined(toState.data.pageTitle)) {
                    $scope.pageTitle = toState.data.pageTitle + ' | Photo-State';
                }
            });

            self.INPUT_MAX_CHARS = appConfig.inputMaxChars;
        }
    }
})
();

