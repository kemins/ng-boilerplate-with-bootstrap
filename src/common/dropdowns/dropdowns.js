(function () {
    angular.module('photo-state.dropdowns', [])

        .directive('singleDropdown', function () {
            return {
                link: function (scope, element, attrs) {
                    element.selectpicker();
                },
                restrict: 'A'
            };
        });
})();

