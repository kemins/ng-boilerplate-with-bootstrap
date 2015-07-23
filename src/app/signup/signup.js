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
                data: {pageTitle: 'Sign Up'}
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
        }

        function signUp(isValid) {
            $scope.$broadcast('show-errors-check-validity');

            if (isValid) {
                $log.debug(self.user);
                SignUpService.signUp(self.user).then(function () {
                    FeedbackService.showSuccessMessage('User successfully registered!');
                });
            }
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

