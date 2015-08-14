angular.module('ftw.data-sheet.controllers', []).
    controller('DataSheetCtrl', ['$log', '$scope', 'dataSheetService', DataSheetCtrl]);

function DataSheetCtrl($log, $scope, dataSheetService) {

    var self = this;

    init();

    /*
     *  Perform any initial operations inside.
     * */
    function init() {

        $scope.afterChangeHandler = afterChangeHandler;
        $scope.cellPropertiesFactory = cellPropertiesFactory;
        $scope.cleanup = cleanup;

        //Expose to parent scope as we in isolate scope right now.
        $scope.$parent.hot = $scope.$parent.hot || {};
        $scope.$parent.hot.refreshDataSheet = refreshDataSheet;
        $scope.$parent.hot.updateSettings = updateSettings;

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

            dataSheetService.updateSettings($scope.hotInstance, newOptions);
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
        dataSheetService.render($scope.hotInstance);
    }

    /*
    * Invoked once directive is destroyed
    * */
    function cleanup() {
        $scope.$parent.hot.refreshDataSheet = null;
        $scope.$parent.hot.updateSettings = null;
    }
}