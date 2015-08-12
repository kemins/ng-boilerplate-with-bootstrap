angular.module('ftw.ranges', [
    'ui.router',
    'ngHandsontable'
])


    .config(['$stateProvider', function config($stateProvider) {
        $stateProvider.state('ranges', {
            url: '/ranges',
            controller: 'RangesCtrl',
            controllerAs: 'rangesCtrl',
            templateUrl: 'ranges/ranges.tpl.html',
            data: {pageTitle: 'Ranges', name: 'ranges'},
            resolve: {
                rangesData: ['$stateParams', 'RangesService', function ($stateParams, RangesService) {
                    return RangesService.getRangesData();
                }]
            }
        });
    }])

    .factory('RangesService', ['LocalRestangular', RangesService])

    .controller('RangesCtrl', ['$scope', 'rangesData', RangesCtrl]);


function RangesCtrl($scope, rangesData) {

    var self = this;

    this.rangesData = rangesData;
    this.rangeTableSettings = {};
    this.rangeAfterChangeHandler = rangeAfterChangeHandler;

    init();

    function init() {
        constructRangesTableSettings();
    }

    function constructRangesTableSettings() {
        self.rangeTableSettings = {
            colHeaders: self.rangesData.cols,
            stretchH: "all",
            readOnly: true,
            afterChange: self.rangeAfterChangeHandler
        };
    }

    function rangeAfterChangeHandler(a, b, c, d) {
        console.log('Range modified!');
    }
}

function RangesService(LocalRestangular) {
    return {
        getRangesData: getRangesData
    };

    function getRangesData() {
        return LocalRestangular.one('assets').customGET('ranges-data.json');
    }

}
