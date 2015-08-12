angular.module('ftw.data-sheet.directives', ['ngHandsontable'])
    .directive('ftwDataSheet', ['$log', 'settingFactory', function ($log, settingFactory) {
        return {
            link: function (scope, element, attrs, hotTableCtrl) {
                $log.debug('data sheet linking...');

                scope.getHotInstance = function () {
                    return $(element).handsontable('getInstance');
                };

                var instance = scope.getHotInstance();
            },
            controller: 'DataSheetCtrl',
            template: "<div hot-table></div>",
            require: 'hotTable',
            replace: true,
            restrict: 'E'
        };
    }]);