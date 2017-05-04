/*global document, window, angular, define*/
define(['angular_cookies', 'angular_translate', 'angular_translate_loader_static_files'], function () {
    "use strict";

    // Define the module
    var module = angular.module('rh_ngLocalization', ['pascalprecht.translate', 'ngCookies']);

    module.config(function ($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: window.location.pathname + 'languages/messages_',
            suffix: '.json'
        });
        $translateProvider.useSanitizeValueStrategy(null);
        $translateProvider.preferredLanguage('en');
    });

    module.factory('Localization', function ($cookies) {
        var favoriteLanguage = $cookies.rh_locale;
        return {
            favoriteLanguage: favoriteLanguage
        };
    });

    return module;
});