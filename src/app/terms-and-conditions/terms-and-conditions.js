(function () {
    angular.module('photo-state.terms-and-conditions', [])

        .config([function config($stateProvider) {
        }])

        .controller('TermsAndConditionsCtrl', ['$scope', '$log', '$modalInstance', TermsAndConditionsCtrl]);


    function TermsAndConditionsCtrl($scope, $log, $modalInstance) {

        this.cancel = cancel;

        init();

        function init() {
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }

    }
})();

