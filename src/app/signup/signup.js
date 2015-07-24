(function () {
    angular.module('photo-state.signup', [
        'ui.router',
        'restangular'
    ])

        .config(['$stateProvider', function config($stateProvider) {
            $stateProvider.state('signup', {
                url: '/signup',
                controller: 'SingUpCtrl',
                controllerAs: 'signUpCtrl',
                templateUrl: 'signup/signup.tpl.html',
                data: {pageTitle: 'Sign Up', name: 'signup'}
            });
        }])

        .factory('SignUpService', ['Restangular', SignUpService])
        .controller('SingUpCtrl', ['$scope', '$log', 'SignUpService', 'FeedbackService', SingUpCtrl]);


    function SingUpCtrl($scope, $log, SignUpService, FeedbackService) {

        var self = this;
        this.genders = [{id: 1, label: 'Male', name: 'MALE'}, {id: 2, label: 'Female', name: 'FEMALE'}];

        this.user = {};
        this.signUp = signUp;

        init();

        function init() {
            $scope.$on('captcha-change', function (event, captchaData) {
                if (captchaData.captchaID == 'signUpCaptcha') {
                    self.user.captcha = {};
                    self.user.captcha.response = captchaData.response;
                    self.user.captcha.widgetID = captchaData.widgetID;
                }
            });
        }

        function signUp(isValid) {
            $scope.$broadcast('show-errors-check-validity');

            if (isValid) {
                $log.debug(self.user);
                var resPromise = SignUpService.signUp(self.user);
                resPromise.then(function () {
                    FeedbackService.showSuccessMessage('User successfully registered!');
                    resetUser();
                });
                resPromise.finally(function () {
                    $scope.$broadcast('reset-captcha', 'signUpCaptcha');
                });
            }
        }

        function resetUser() {
            $scope.userForm.$setPristine();
            $scope.userForm.$setUntouched();
            $scope.$broadcast('show-errors-reset');
            self.user = {};
            self.confirmPassword = null;
        }

    }

    function SignUpService(Restangular) {
        return {
            signUp: signUp
        };

        function signUp(user) {
            return Restangular.one('signup').customPOST(user);
        }

    }
})();

