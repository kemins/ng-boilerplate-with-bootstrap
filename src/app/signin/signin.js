(function () {
    angular.module('photo-state.signin', [
        'ui.router',
        'restangular'
    ])

        .config(['$stateProvider', function config($stateProvider) {
            $stateProvider.state('signin', {
                url: '/signin',
                controller: 'SignInCtrl',
                controllerAs: 'signInCtrl',
                templateUrl: 'signin/signin.tpl.html',
                data: {pageTitle: 'Sign In'}
            });
        }])

        .factory('SignInService', ['Restangular', SignInService])
        .controller('SignInCtrl', ['$scope', '$log', 'SignInService', 'FeedbackService', SignInCtrl]);


    function SignInCtrl($scope, $log, SignInService, FeedbackService) {

        var self = this;

        this.user = {};
        this.signIn = signIn;

        init();

        function init() {
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

        function resetUser() {
            $scope.userForm.$setPristine();
            $scope.userForm.$setUntouched();
            $scope.$broadcast('show-errors-reset');
            self.user = {};
        }

    }

    function SignInService(Restangular) {
        return {
            signIn: signIn
        };

        function signIn(user) {
            return Restangular.one('signin').customPOST(user);
        }

    }
})();

