angular.module('ftw.data-sheet.directives', ['ngHandsontable'])
    .directive('ftwDataSheet', ['$log', 'settingFactory', function ($log, settingFactory) {
        return {
            link: function (scope, element, attrs, hotTableCtrl) {
                $log.debug('data sheet linking...');

                scope.rowHeaders = scope.rowHeaders || false;
                scope.hotScope = angular.element(element.find('hot-table')).isolateScope();
                scope.hotInstance = scope.hotScope.hotInstance;
            },

            controller: 'DataSheetCtrl',
            controllerAs: 'dataSheetCtrl',
            templateUrl: "data-sheet/data-sheet.tpl.html",
            restrict: 'E',
            scope: {
                settings: '=',
                datarows: '=',
                rowHeaders: "=?",
            }
        };
    }]);