angular.module('ftw.data-sheet.directives', [])
    .directive('ftwDataSheet', ['$log', 'dataSheetService', function ($log, dataSheetService) {
        return {
            link: function (scope, element, attrs) {

                scope.$on("$destroy", function () {
                    scope.cleanup();
                });

                updateDimensions();
                scope.createHot(element[0]);

                Handsontable.Dom.addEvent(window, 'resize', resizeHandler);

                function resizeHandler() {
                    updateDimensions();
                    scope.createHot(element[0]);
                }

                function updateDimensions() {
                    var dimensions = dataSheetService.calculateSize(element[0]);

                    scope.hotWidth = dimensions.width;
                    scope.hotHeight = dimensions.height;
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