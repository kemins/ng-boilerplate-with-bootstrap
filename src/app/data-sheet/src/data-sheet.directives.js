angular.module('ftw.data-sheet.directives', [])
    .directive('ftwDataSheet', ['$log', 'dataSheetService', function ($log) {
        return {
            link: function (scope, element, attrs) {

                recreateTable();

                Handsontable.Dom.addEvent(window, 'resize', recreateTable);

                function recreateTable() {
                    scope.createHot(element[0]);
                }
            },

            controller: 'DataSheetCtrl',
            controllerAs: 'dataSheetCtrl',
            template: "<div></div>",
            restrict: 'E',
            replace: false,
            scope: {
                config: '=',
                datasource: '='
            }
        };
    }]);