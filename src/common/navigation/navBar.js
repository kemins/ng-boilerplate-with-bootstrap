angular.module( 'navigation', [])

    .directive( 'navigationBar', function() {
        return {
            link: function( scope, element, attrs ) {

            },
            restrict: 'E',
            templateUrl: 'navigation/navBar.tpl.html'
        };
    })

;

