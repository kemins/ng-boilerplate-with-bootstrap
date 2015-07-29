angular.module('photo-state.home', [
    'ui.router'
])


    .config(['$stateProvider', function config($stateProvider) {
        $stateProvider.state('home', {
            url: '/home',
            controller: 'HomeCtrl',
            controllerAs: 'homeCtrl',
            templateUrl: 'home/home.tpl.html',
            data: {pageTitle: 'Home', name: 'home'},
            resolve: {
                pageData: ['$stateParams', 'HomeService', function ($stateParams, HomeService) {
                    return HomeService.getPageContent();
                }]
            }
        });
    }])

    .factory('HomeService', ['Restangular', 'LocalRestangular', HomeService])

    .controller('HomeCtrl', ['$scope', 'pageData', HomeCtrl]);


function HomeCtrl($scope, pageData) {

    var self = this;

    this.myInterval = 5000;
    this.noWrapSlides = false;
    this.slides = [];
    this.pageData = pageData;

    init();

    function init() {
    }

}

function HomeService(Restangular, LocalRestangular) {
    return {
        getPageContent: getPageContent
    };

    function getPageContent() {
        return LocalRestangular.one('assets/slides/slides-data.json').customGET();
    }

}
