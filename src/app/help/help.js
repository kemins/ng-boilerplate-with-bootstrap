angular.module('photo-state.help', [
    'ui.router',
    'restangular'
])

    .config(['$stateProvider', function config($stateProvider) {
        $stateProvider.state('contact-us', {
            url: '/contact-us',
            controller: 'HelpCtrl',
            controllerAs: 'helpCtrl',
            templateUrl: 'help/contact-us.tpl.html',
            data: {pageTitle: 'Contact Us', name: 'contact-us'}
        });
    }])

    .factory('HelpService', ['Restangular', HelpService])
    .controller('HelpCtrl', ['$scope', '$log', 'HelpService', 'FeedbackService', HelpCtrl]);


function HelpCtrl($scope, $log, HelpService, FeedbackService) {

    var self = this;

    this.message = {};
    this.sendMessage = sendMessage;

    init();

    function init() {
        $scope.$on('captcha-change', function (event, captchaData) {
            if (captchaData.captchaID == 'contactUsCaptcha') {
                self.message.captcha = {};
                self.message.captcha.response = captchaData.response;
                self.message.captcha.widgetID = captchaData.widgetID;
            }
        });
    }

    function sendMessage(isValid) {
        $scope.$broadcast('show-errors-check-validity');

        if (isValid) {
            var resPromise = HelpService.sendMessage(self.message);

            resPromise.then(function () {
                FeedbackService.showSuccessMessage('Thanks for getting touch with us! We will mail back you soon.');
                resetMessage();
            });

            resPromise.finally(function () {
                $scope.$broadcast('reset-captcha', 'contactUsCaptcha');
            });
        }
    }

    function resetMessage() {
        $scope.messageForm.$setPristine();
        $scope.messageForm.$setUntouched();
        $scope.$broadcast('show-errors-reset');
        self.message = {};
    }

}

function HelpService(Restangular) {
    return {
        sendMessage: sendMessage
    };

    function sendMessage(message) {
        return Restangular.one('send-message').customPOST(message);
    }
}

