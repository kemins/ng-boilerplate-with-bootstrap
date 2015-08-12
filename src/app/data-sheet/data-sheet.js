angular.module('ftw.data-sheet', ['ftw.data-sheet.services', 'ftw.data-sheet.controllers', 'ftw.data-sheet.directives']);

angular.module('ftw.data-sheet.services', []);

angular.module('ftw.data-sheet.controllers', []);

angular.module('ftw.data-sheet.directives', ['ngHandsontable'])
    .directive('ftwDataSheet', ['$log', function ($log) {
        return {
            link: function (scope, element, attrs, hotTableCtrl) {
                $log.debug('data sheet linking...');
            },
            template: "<div hot-table></div>",
            require: 'hotTable',
            replace: true,
            restrict: 'E'
        };
    }]);
