angular.module('ftw', [
    'ngMessages',
    'ngAnimate',
    'templates-app',
    'templates-common',
    'ui.router',
    'ftw.navigation',
    'ftw.common-validators',
    'ftw.terms-and-conditions',
    'ftw.feedbacks',
    'ftw.common-filters',
    'ui.bootstrap.showErrors',
    'ui.bootstrap',
    'restangular',
    'angularSpinner',
    'ftw.ranges'
])

    .config(['$stateProvider', '$urlRouterProvider', 'showErrorsConfigProvider', 'RestangularProvider', function ($stateProvider, $urlRouterProvider, showErrorsConfigProvider, RestangularProvider) {
        $urlRouterProvider.otherwise('/ranges');
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

    .controller('AppCtrl', ['$scope', '$location', '$modal', AppCtrl])

    .factory('LocalRestangular', ['Restangular', LocalRestangular]);

function AppCtrl($scope, $location, $modal) {

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

function LocalRestangular(Restangular) {
    return Restangular.withConfig(function (RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl('.');
        RestangularConfigurer.setRequestSuffix('.json');
    });
}