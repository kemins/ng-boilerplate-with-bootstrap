angular.module('ftw.common-filters', ['ngSanitize'])

    .filter('safeHTML', ['$sce', function ($sce) {
        return $sce.trustAsHtml;
    }]);
