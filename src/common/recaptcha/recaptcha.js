(function () {
    angular.module('photo-state.recaptcha', ['vcRecaptcha', 'photo-state.constants'])

        .directive('phRecaptcha', ['$log', 'vcRecaptchaService', 'appConfig',

            function ($log, vcRecaptchaService, appConfig) {
                return {
                    restrict: 'E',
                    templateUrl: 'recaptcha/captcha.tpl.html',
                    link: function ($scope, $element, $attrs) {

                    },
                    controller: ['$scope', '$log', 'vcRecaptchaService', 'appConfig', CaptchaCtrl],
                    controllerAs: 'captchaCtrl'
                };
            }
        ]);


    function CaptchaCtrl($scope, $log, vcRecaptchaService, appConfig) {
        this.reCaptchaKey = appConfig.reCaptchaKey;
        this.setResponse = setResponse;
        this.setWidgetId = setWidgetId;
        this.reload = reload;

        init();

        function setResponse(response) {
            $log.info('Response available');
            $scope.response = response;
            $scope.$emit('captchaChange', {
                captchaID: $scope.captchaID,
                widgetID: $scope.widgetId,
                response: $scope.response
            });
        }

        function setWidgetId(widgetId) {
            $log.info('Created widget ID: %s', widgetId);
            $scope.widgetId = widgetId;
        }

        function reload() {
            vcRecaptchaService.reload($scope.widgetId);
        }

        function init() {
            $scope.$on('resetCaptcha', function (event, captchaID) {
                if (captchaID === $scope.captchaID) {
                    $scope.reload();
                }
            });
        }
    }
})();