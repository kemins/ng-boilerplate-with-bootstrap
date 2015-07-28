(function () {
    angular.module('photo-state', [
        'ngMessages',
        'ngAnimate',
        'templates-app',
        'templates-common',
        'ui.router',
        'photo-state.home',
        'photo-state.signup',
        'photo-state.signin',
        'photo-state.help',
        'photo-state.navigation',
        'photo-state.constants',
        'photo-state.common-validators',
        'photo-state.recaptcha',
        'photo-state.terms-and-conditions',
        'photo-state.feedbacks',
        'ui.bootstrap.showErrors',
        'ui.bootstrap',
        'restangular',
        'angularSpinner'
    ])

        .config(['$stateProvider', '$urlRouterProvider', 'showErrorsConfigProvider', 'RestangularProvider', function ($stateProvider, $urlRouterProvider, showErrorsConfigProvider, RestangularProvider) {
            $urlRouterProvider.otherwise('/home');
            showErrorsConfigProvider.showSuccess(true);

            RestangularProvider.setBaseUrl('http://demo5139190.mockable.io/');
            RestangularProvider.setDefaultHttpFields({cache: false});
        }])

        .run(['$rootScope', '$log', 'Restangular', function run($rootScope, $log, Restangular) {

            $rootScope.serviceError = {};
            Restangular.setErrorInterceptor(
                function (response) {
                    if (response.status != 200) {
                        var message = '';
                        if (response.status == 401) {
                            message = 'Login required';
                        } else if (response.status == 404) {
                            message = 'Resource not available';
                        } else {
                            message = "Response received with HTTP error code: " + response.status;
                        }

                        $rootScope.serviceError.displayMessage = message;
                        $log.error(message);
                        //return false; // stop the promise chain
                    }
                }
            );
        }])

        .controller('AppCtrl', ['$scope', '$location', 'appConfig', '$modal', AppCtrl]);

    function AppCtrl($scope, $location, appConfig, $modal) {

        var self = this;

        init();

        this.openModalWindow = openModalWindow;
        this.openTermsAndConditionsDialog = openTermsAndConditionsDialog;
        this.pageSysName = null;

        function init() {
            self.pageSysName = self.pageSysName || 'home';
            $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                if (angular.isDefined(toState.data.pageTitle)) {
                    $scope.pageTitle = toState.data.pageTitle + ' | Photo-State';
                    self.pageSysName = toState.data.name;
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

