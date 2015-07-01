(function () {
    angular.module('us-elements.navigation', [])

        .directive('navigationBar', function () {
            return {
                link: function (scope, element, attrs) {
                },
                restrict: 'E',
                templateUrl: 'navigation/navBar.tpl.html'
            };
        })

        .directive('footerBar', function () {
            return {
                link: function (scope, element, attrs) {
                },
                restrict: 'E',
                templateUrl: 'navigation/footerBar.tpl.html'
            };
        });
})();

