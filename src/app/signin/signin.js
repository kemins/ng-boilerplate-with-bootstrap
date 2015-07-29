angular.module('photo-state.signin', [
    'ui.router',
    'restangular'
])

    .config(['$stateProvider', function config($stateProvider) {
        $stateProvider.state('signin', {
            controller: 'SignInCtrl',
            controllerAs: 'signInCtrl',
            templateUrl: 'signin/signin.tpl.html',
            data: {pageTitle: 'Sign In', name: 'signin'}
        })
            .state('signin.password-recovering', {
                url: "/password-recovering",
                templateUrl: 'signin/forgot-password.tpl.html'
            })
            .state('signin.enter-credentials', {
                url: '/signin',
                templateUrl: 'signin/enter-credentials.tpl.html'
            });
    }])

    .factory('SignInService', ['Restangular', SignInService])
    .controller('SignInCtrl', ['$scope', '$log', 'SignInService', 'FeedbackService', SignInCtrl]);


function SignInCtrl($scope, $log, SignInService, FeedbackService) {

    var self = this;

    this.user = {};
    this.signIn = signIn;
    this.restorePassword = restorePassword;
    this.recoverPassword = {};
    this.recoverPasswordEmail = null;

    init();

    function init() {
        $scope.$on('captcha-change', function (event, captchaData) {
            if (captchaData.captchaID == 'signInCaptcha') {
                self.user.captcha = {};
                self.user.captcha.response = captchaData.response;
                self.user.captcha.widgetID = captchaData.widgetID;
            } else if (captchaData.captchaID == 'resetPasswordCaptcha') {
                self.user.captcha = {};
                self.recoverPassword.captcha.response = captchaData.response;
                self.recoverPassword.captcha.widgetID = captchaData.widgetID;
            }
        });
    }

    function signIn(isValid) {
        $scope.$broadcast('show-errors-check-validity');

        if (isValid) {
            $log.debug(self.user);
            var resPromise = SignInService.signIn(self.user);

            resPromise.then(function () {
                FeedbackService.showSuccessMessage('User signed in!');
                resetUser();
            });

            resPromise.finally(function () {
                $scope.$broadcast('reset-captcha', 'signInCaptcha');
            });
        }
    }

    function restorePassword(isValid) {
        $scope.$broadcast('show-errors-check-validity');

        if (isValid) {
            var resPromise = SignInService.restorePassword(self.recoverPassword);

            resPromise.then(function () {
                FeedbackService.showSuccessMessage('The mail with a new password has been sent to your email.');
                resetRecoverPassword();
            });

            resPromise.finally(function () {
                $scope.$broadcast('reset-captcha', 'resetPasswordCaptcha');
            });
        }
    }

    function resetUser() {
        $scope.userForm.$setPristine();
        $scope.userForm.$setUntouched();
        $scope.$broadcast('show-errors-reset');
        self.user = {};
    }

    function resetRecoverPassword() {
        $scope.restorePasswordForm.$setPristine();
        $scope.restorePasswordForm.$setUntouched();
        $scope.$broadcast('show-errors-reset');
        self.recoverPassword = {};
    }

}

function SignInService(Restangular) {
    return {
        signIn: signIn,
        restorePassword: restorePassword
    };

    function signIn(user) {
        return Restangular.one('signin').customPOST(user);
    }

    function restorePassword(email) {
        return Restangular.one('reset-password').customPOST(email);
    }

}

