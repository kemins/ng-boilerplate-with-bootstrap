angular.module('ftw.ranges', [
    'ui.router',
    'ftw.data-sheet'
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

    init();

    function init() {
        constructRangesTableSettings();
    }

    function constructRangesTableSettings() {
        self.rangeTableSettings = {
            colHeaders: self.rangesData.cols,
            readOnly: false
        };
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
