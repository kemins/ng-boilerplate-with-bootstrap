(function () {
    angular.module('us-elements.signup', [
        'ui.router'
    ])

        .config(['$stateProvider', function config($stateProvider) {
            $stateProvider.state('signup', {
                url: '/signup',
                controller: 'SingUpCtrl',
                templateUrl: 'signup/signup.tpl.html',
                data: {pageTitle: 'Sign Up'}
            });
        }])

        .controller('SingUpCtrl', ['$scope', function SingUpCtrl($scope) {
        }]);
})();

