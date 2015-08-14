angular.module('ftw.data-sheet.controllers', []).
    controller('DataSheetCtrl', ['$log', '$scope', '$timeout', 'dataSheetService', DataSheetCtrl]);

function DataSheetCtrl($log, $scope, $timeout, dataSheetService) {

    var self = this;

    /*
     * Avoid useless update operations
     *
     * */
    this.UPDATE_SETTING_SDELAY = 50;//ms

    /*
     * Avoid useless recreation for instance during resizing
     * */
    this.RECREATE_HOT_DELAY = 100;//ms

    this.updateSettingsPromise = null;
    this.recreateHotPromise = null;

    this.initHotOptions = {
        currentRowClassName: 'selected-row',
        afterChange: afterChangeHandler,
        readOnly: true,
        cells: cellPropertiesFactory
    };

    init();

    /*
     *  Perform any initial operations inside.
     * */
    function init() {

        $scope.cleanup = cleanup;
        $scope.refreshDataSheet = refreshDataSheet;
        $scope.createHot = createHot;

        //Expose to parent scope as we in isolate scope right now.
        $scope.$parent.hot = $scope.$parent.hot || {};
        $scope.$parent.hot.refreshDataSheet = refreshDataSheet;
        $scope.$parent.hot.updateSettings = updateSettings;

        $scope.$watch('config', updateSettings);
        $scope.$watch('datasource', updateDataSource);
    }


    /*
     * Creating or recreating our hot
     * */
    function createHot(element) {

        if (self.recreateHotPromise) {
            $timeout.cancel(self.recreateHotPromise);
        }

        self.recreateHotPromise = $timeout(function () {
            dataSheetService.destroyTable(element, $scope.hotInstance);
            $scope.hotInstance = null;

            self.recreateHotPromise = null;
            $scope.hotInstance = dataSheetService.createTable(element, computeHotOptions());

            $log.debug('Hot table has been recreated.');
        }, self.RECREATE_HOT_DELAY);
    }

    /*
     * Update settings for hot table
     * */
    function updateSettings() {

        if (self.updateSettingsPromise) {
            $timeout.cancel(self.updateSettingsPromise);
        }

        $timeout(function () {
            self.updateSettingsPromise = null;

            if ($scope.config) {
                $log.debug('resetting settings for data sheet');
                dataSheetService.updateSettings($scope.hotInstance, computeHotOptions());
            }
        }, self.UPDATE_SETTING_SDELAY);
    }

    /*
     *  Set data source to handson table
     * */
    function updateDataSource() {

        $log.debug('Data Sheet Source changed.');
        updateSettings();
    }

    /*
     * Change data handler.
     * */
    function afterChangeHandler(changes, source) {

        if (source !== 'loadData') {
            $log.debug('Data sheet after change callback.');
        }
    }

    /*
     * Returns properties for particular cell
     * */
    function cellPropertiesFactory(row, col, prop) {
        //$log.debug('Returning properties for cell', row, col);

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


    /*
     * Options is passed while creating hot
     * */
    function getInitOptions() {
        var initOptions = {
            currentRowClassName: 'selected-row',
            afterChange: afterChangeHandler,
            cells: cellPropertiesFactory
        };

        initOptions.width = $scope.hotWidth;
        initOptions.height = $scope.hotHeight;

        return initOptions;
    }

    /*
     * Concat config options with creation options
     * */
    function computeHotOptions() {
        var options = angular.extend(getInitOptions(), $scope.config);
        options.data = $scope.datasource;
        return options;
    }
}