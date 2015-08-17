angular.module('ftw.data-sheet.controllers', []).
    controller('DataSheetCtrl', ['$log', '$scope', '$timeout', 'dataSheetService', DataSheetCtrl]);

function DataSheetCtrl($log, $scope, $timeout, dataSheetService) {

    var self = this;

    /*
     * Avoid useless update operations
     *
     * */
    this.UPDATE_SETTINGS_DELAY = 50;//ms

    /*
     * Avoid useless recreation (for instance during resizing)
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

        $scope.createHot = createHot;

        //Expose to parent scope as we're in isolate scope right now.
        $scope.$parent.hot = $scope.$parent.hot || {};
        $scope.$parent.hot.refreshDataSheet = refreshDataSheet;
        $scope.$parent.hot.updateSettings = updateSettings;

        $scope.$watch('config', updateSettings);
        $scope.$watch('datasource', updateDataSource);

        $scope.$on("$destroy", function () {
            self.cleanup();
        });
    }


    /*
     * Creating or recreating the hot
     * */
    function createHot(element) {

        setDimensions(element);

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
     * Update settings for hot
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
        }, self.UPDATE_SETTINGS_DELAY);
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
     * Options are passed while creating a hot
     * */
    function getInitOptions() {
        return {
            currentRowClassName: 'selected-row',
            afterChange: afterChangeHandler,
            cells: cellPropertiesFactory,
            width: self.hotWidth,
            height: self.hotHeight
        };
    }

    /*
     * Concat config options with init(creation) options
     * */
    function computeHotOptions() {
        var options = angular.extend(getInitOptions(), $scope.config);
        options.data = $scope.datasource;
        return options;
    }

    /*
     * Set dimensions for hot
     * */
    function setDimensions(element) {
        var dimensions = dataSheetService.calculateSize(element);

        self.hotWidth = dimensions.width;
        self.hotHeight = dimensions.height;
    }
}