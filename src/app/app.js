(function () {
    angular.module('photo-state', [
        'ngMessages',
        'templates-app',
        'templates-common',
        'ui.router',
        'photo-state.home',
        'photo-state.signup',
        'photo-state.navigation',
        'photo-state.constants',
        'photo-state.common-validators',
        'photo-state.recaptcha',
        'photo-state.terms-and-conditions',
        'photo-state.animations',
        'ui.bootstrap.showErrors',
        'ui.bootstrap',
        'restangular',
        'angularSpinner'
    ])

        .config(['$stateProvider', '$urlRouterProvider', 'showErrorsConfigProvider', 'RestangularProvider', function ($stateProvider, $urlRouterProvider, showErrorsConfigProvider, RestangularProvider) {
            $urlRouterProvider.otherwise('/home');
            showErrorsConfigProvider.showSuccess(true);

            RestangularProvider.setBaseUrl('/');
            RestangularProvider.setDefaultHttpFields({cache: false});
        }])

        .run(function run() {
        })

        .controller('AppCtrl', ['$scope', '$location', 'appConfig', '$modal', AppCtrl]);

    function AppCtrl($scope, $location, appConfig, $modal) {

        var self = this;

        init();

        this.openModalWindow = openModalWindow;
        this.openTermsAndConditionsDialog = openTermsAndConditionsDialog;

        function init() {
            $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                if (angular.isDefined(toState.data.pageTitle)) {
                    $scope.pageTitle = toState.data.pageTitle + ' | Photo-State';
                }
            });

            self.INPUT_MAX_CHARS = appConfig.inputMaxChars;
        }

        function openModalWindow(options) {
            var modalInstance = $modal.open({
                animation: options.animationsEnabled || true,
                templateUrl: options.templateUrl,
                controller: options.controller,
                controllerAs: options.controllerAs,
                size: options.size || 'md',
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            if (options.okHandler) {
                modalInstance.result.success(options.okHandler);
            }

            if (options.cancelHandler) {
                modalInstance.result.error(options.cancelHandler);
            }

            if (options.finalHandler) {
                modalInstance.result.finally(options.finalHandler);
            }
        }

        function openTermsAndConditionsDialog() {
            openModalWindow({
                animationsEnabled: true,
                templateUrl: 'terms-and-conditions/terms-and-conditions.tpl.html',
                controller: 'TermsAndConditionsCtrl',
                controllerAs: 'termsCtrl'
            });
        }
    }
})
();

