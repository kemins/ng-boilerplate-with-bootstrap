(function () {
    angular.module('photo-state.recaptcha', ['vcRecaptcha', 'photo-state.constants'])

        .directive('phRecaptcha', ['$log', 'vcRecaptchaService', 'appConfig',

            function ($log, vcRecaptchaService, appConfig) {
                return {
                    restrict: 'E',
                    require: '^form',
                    templateUrl: 'recaptcha/captcha.tpl.html',
                    link: function ($scope, $element, $attrs, ngFormCtrl) {

                        $scope.setCaptchaValidity = function(value) {
                            ngFormCtrl.$setValidity('recaptcha',value);
                        };

                        $scope.captchaID = $attrs.captchaId;

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
            $log.info('Response available for: %s', $scope.captchaID || 'not specified');
            $scope.response = response;
            $scope.$emit('captcha-change', {
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
            $scope.$on('reset-captcha', function (event, captchaID) {
                if (captchaID === $scope.captchaID) {
                    reload();
                    $scope.setCaptchaValidity(false);
                }
            });
        }
    }
})();