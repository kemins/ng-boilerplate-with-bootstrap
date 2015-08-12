angular.module('ftw.data-sheet.controllers', []).
    controller('DataSheetCtrl', ['$log', 'settingFactory', DataSheetCtrl]);

function DataSheetCtrl($log, $scope, settingFactory) {

    init();

    function init() {
        $log.debug('data sheet controller init');
    }
}