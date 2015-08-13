angular.module('ftw.data-sheet.controllers', []).
    controller('DataSheetCtrl', ['$log', 'settingFactory', DataSheetCtrl]);

function DataSheetCtrl($log, $scope, settingFactory) {

    init();

    /*
    * Expose api to outside world
    * */
    this.updateSettings = updateSettings;

    /*
    *  Perform any initial operations inside.
    * */
    function init() {

    }

    /*
    * Set new settings for hot table
    * */
    function updateSettings(settings) {
        settingFactory.updateHandsontableSettings(scope.hotInstance, settings);
    }
}