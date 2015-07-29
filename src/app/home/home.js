angular.module('photo-state.home', [
    'ui.router'
])


    .config(['$stateProvider', function config($stateProvider) {
        $stateProvider.state('home', {
            url: '/home',
            controller: 'HomeCtrl',
            controllerAs: 'homeCtrl',
            templateUrl: 'home/home.tpl.html',
            data: {pageTitle: 'Home', name: 'home'}
        });
    }])

    .controller('HomeCtrl', ['$scope', HomeCtrl]);


function HomeCtrl($scope) {

    var self = this;

    this.myInterval = 5000;
    this.noWrapSlides = false;
    this.slides = [];

    init();

    function init() {
        self.slides.push({text: 'Slide 1 Title', logo: 'https://placekitten.com/606/300'});
        self.slides.push({text: 'Slide 2 Title', logo: 'https://placekitten.com/606/300'});
        self.slides.push({text: 'Slide 3 Title', logo: 'https://placekitten.com/606/300'});
    }

}
