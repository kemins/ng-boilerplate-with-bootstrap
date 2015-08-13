angular.module('ftw.data-sheet.controllers', []).
    controller('DataSheetCtrl', ['$log', '$scope', 'settingFactory', DataSheetCtrl]);

function DataSheetCtrl($log, $scope, settingFactory) {

    var self = this;

    init();

    /*
     *  Perform any initial operations inside.
     * */
    function init() {

        $scope.afterChangeHandler = afterChangeHandler;
        $scope.cellPropertiesFactory = cellPropertiesFactory;

        //Expose to parent scope as we in isolate scope right now.
        $scope.$parent.refreshDataSheet = refreshDataSheet;
        $scope.$parent.updateSettings = updateSettings;

        $scope.$watch('config', updateSettings);
        $scope.$watch('datasource', updateDataSource);
    }

    /*
     * Update settings for hot table
     * */
    function updateSettings() {

        if ($scope.config) {
            $log.debug('resetting settings for data sheet');
            var newOptions = angular.extend({}, $scope.config);
            newOptions.data = $scope.datasource;

            settingFactory.updateHandsontableSettings($scope.hotInstance, newOptions);
        }
    }

    /*
     *  Set data source to handson table
     * */
    function updateDataSource() {

        $log.debug('Data Sheet Source changed');
        updateSettings();
    }

    /*
     * Change data handler.
     * */
    function afterChangeHandler(changes, source) {

        if (source !== 'loadData') {
            $log.debug('Data in sheet has been changed.');
        }
    }

    /*
     * Returns properties for particular cell
     * */
    function cellPropertiesFactory(row, col, prop) {
        $log.debug('Returning properties for cell %s x %s', row, col);

        var cellProperties = {};

        if (row === 0 && col === 0) {
            cellProperties.readOnly = true;
            return cellProperties;
        }
    }

    /*
     * Re-render handson table
     * */
    function refreshDataSheet() {
        settingFactory.renderHandsontable($scope.hotInstance);
    }
}