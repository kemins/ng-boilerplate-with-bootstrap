(function () {
    angular.module('photo-state.common-validators', [])

        .directive('phEmail', function () {
            return {
                require: 'ngModel',
                link: function ($scope, $element, $attrs, ngModelController) {
                    var EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    ngModelController.$validators.email = function (value) {
                        return ngModelController.$isEmpty(value) || EMAIL_REGEXP.test(value);
                    };
                }
            };
        })
        .directive('phUpperCaseMinLength', function () {
            return {
                require: 'ngModel',
                link: function ($scope, $element, $attrs, ngModelController) {
                    ngModelController.$validators.phUpperCaseMinLength = function (value) {
                        var minLengthStr = $attrs['phUpperCaseMinLength'];
                        var minLength = minLengthStr ? parseInt(minLengthStr, 10) : 1;
                        var regExp = /[A-Z]/g;
                        return ngModelController.$isEmpty(value) || (value.match(regExp) || []).length >= minLength;
                    };
                }
            };
        })

        .directive('phDigitsMinLength', function () {
            return {
                require: 'ngModel',
                link: function ($scope, $element, $attrs, ngModelController) {
                    ngModelController.$validators.phDigitsMinLength = function (value) {
                        var minLengthStr = $attrs['phDigitsMinLength'];
                        var minLength = minLengthStr ? parseInt(minLengthStr, 10) : 1;
                        var regExp = /[0-9]/g;
                        return ngModelController.$isEmpty(value) || (value.match(regExp) || []).length >= minLength;
                    };
                }
            };
        })

        .directive('phMatch', function () {
            return {
                require: 'ngModel',
                link: function ($scope, $element, $attrs, ngModelController) {
                    $scope.$watch('phMatch', ngModelController.$validate);
                    ngModelController.$validators.phMatch = function (value) {
                        return ngModelController.$isEmpty(value) || $scope.phMatch == value;
                    };
                },
                scope: {
                    phMatch: '='
                }
            };
        });
})();

