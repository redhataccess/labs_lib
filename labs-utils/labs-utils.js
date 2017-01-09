/*global document, window, angular, define*/

define([], function () {
    "use strict";

    // Define the module
    var module = angular.module('labsUtils', []);

    module.service('labsUtils', function () {
        var labsUtils = {};

        labsUtils.to_top = function () {
            setTimeout(function () {
                jq('html,body').animate({
                    scrollTop: top
                }, 'fast');
            }, 100);
        };

        labsUtils.to_id = function (id) {
            setTimeout(function () {
                jq('html,body').animate({
                    scrollTop: jq('#' + id).offset().top
                }, 'fast');
            }, 100);
        };

        return labsUtils;
    });

    return module;
});