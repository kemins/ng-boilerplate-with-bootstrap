(function () {
    angular.module('photo-state.signup', [
        'ui.router'
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

        .controller('SingUpCtrl', ['$scope', '$log', SingUpCtrl]);


    function SingUpCtrl($scope, $log) {
        this.genders = [{id: 1, label: 'Male', name: 'MALE'}, {id: 2, label: 'Female', name: 'FEMALE'}];

        this.user  = {};
        this.signUp = signUp;

        init();

        function init() {
        }

        function signUp(isValid) {
            $scope.$broadcast('show-errors-check-validity');
            $log.debug('Sign Up valid: ', isValid);
        }

    }
})();

