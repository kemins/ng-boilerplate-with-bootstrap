angular.module('ftw.data-sheet.directives', ['ngHandsontable'])
    .directive('ftwDataSheet', ['$log', 'settingFactory', function ($log, settingFactory) {
        return {
            link: function (scope, element, attrs, hotTableCtrl) {

                var initOptions = {
                    currentRowClassName: 'selected-row', stretchH: 'all',
                    afterChange: scope.afterChangeHandler,
                    readOnly: true,
                    cells: scope.cellPropertiesFactory
                };

                scope.hotInstance = settingFactory.initializeHandsontable(element, initOptions);
            },

            controller: 'DataSheetCtrl',
            controllerAs: 'dataSheetCtrl',
            template: "<div></div>",
            restrict: 'E',
            replace: true,
            scope: {
                config: '=',
                datasource: '='
            }
        };
    }]);