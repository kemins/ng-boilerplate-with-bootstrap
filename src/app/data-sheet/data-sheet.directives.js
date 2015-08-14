angular.module('ftw.data-sheet.directives', [])
    .directive('ftwDataSheet', ['$log', 'dataSheetService', function ($log, dataSheetService) {
        return {
            link: function (scope, element, attrs) {

                var initOptions = {
                    currentRowClassName: 'selected-row', stretchH: 'all',
                    afterChange: scope.afterChangeHandler,
                    readOnly: true,
                    cells: scope.cellPropertiesFactory
                };

                scope.hotInstance = dataSheetService.createTable(element, initOptions);

                $scope.$on("$destroy", function () {
                    $scope.cleanup();
                });
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