/*global document, window, angular, define*/

define(['ui-bootstrap-tpls-customized'], function () {
    "use strict";

    // Define the module
    var module = angular.module('ngToolTips', ['ui.bootstrap']);

    module.config(['$tooltipProvider', function ($tooltipProvider) {
        $tooltipProvider.setTriggers({
            mouseenter: 'mouseleave',
            click: 'click',
            focus: 'blur',
            never: 'mouseleave',
            show: 'hide'
        });
    }]);

    module.filter('unsafe', ['$sce',
        function ($sce) {
            return function (val) {
                return $sce.trustAsHtml(val);
            };
        }
    ]);

    module.directive('tooltip', function () {
        return {
            restrict: 'E',
            link: function (scope, element, attr) {
                scope.manualShowPopover = function (id) {
                    setTimeout(function () {
                        $('#' + id).trigger('show');
                    }, 0);
                };

                scope.manualHidePopover = function (id) {
                    setTimeout(function () {
                        var isHovered = $('.popover:hover').length > 0;
                        if (!isHovered) {
                            $('#' + id).trigger('hide');
                        }
                    }, 0);
                };
            }
        };
    });

    return module;
});