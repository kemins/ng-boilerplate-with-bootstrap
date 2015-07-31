angular.module('photo-state.common-filters', ['ngSanitize'])

    .filter('phUnsafe', ['$sce', function ($sce) {
        return $sce.trustAsHtml;
    }]);
