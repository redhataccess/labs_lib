/*global document, window, angular, define*/

define([], function () {
    "use strict";

    // Define the module
    var module = angular.module('ngDownload', []);

    module.directive('filedownload', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                // When the download is ready, attach the data to the link. Enable the link downloadable
                scope.$on('download-ready', function (event, data) {
                    angular.element(element).attr({
                        href: 'data:attachment/csv,' + encodeURIComponent(data),
                        download: element.attr('filename')
                    });
                });
            }
        }
    });
    return module;
});