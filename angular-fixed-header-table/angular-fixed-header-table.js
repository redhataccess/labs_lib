/*global document, window, angular, define*/
define([], function () {
    "use strict";

    // Define the module
    var module = angular.module('ngFixedHeaderTable', []);

    module.directive('fixedHeaderTable', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                var fixedHeaderTable = function (tableId) {
                    var params = [];
                    $("#" + tableId + "Layout").css("visibility", 'hidden');
                    params["parentWidth"] = $("#" + tableId).parent().width();
                    if ($("#" + tableId).parent()[0].id === tableId + "Data") {
                        params["parentWidth"] = $("#" + tableId + "Layout").parent().width();
                    }
                    params["fixed"] = $("#" + tableId).attr("fixed");
                    params["headerColor"] = $("#" + tableId).attr("headerColor");
                    params["tableObj"] = $("#" + tableId);
                    params["widthTd_0"] = $("#" + tableId).find('td:first')[0].clientWidth;
                    params["heightTd_0"] = $("#" + tableId).find('td:first')[0].clientHeight;
                    params["divWidth"] = $("#" + tableId).attr("divWidth");
                    params["divHeight"] = $("#" + tableId).attr("divHeight");
                    params["tableWidth"] = $("#" + tableId).width();
                    params["tableHeight"] = $("#" + tableId).height();
                    setDefault(params);
                    if (params["parentWidth"] != 0) {
                        params["divWidth"] = (params["divWidth"] * 1 > params["parentWidth"] * 1) ? params["parentWidth"] : params["divWidth"];
                    }
                    setLayout(tableId, params);
                    if (params["tableWidth"] > params["divWidth"] || params["tableHeight"] > params["divHeight"]) {
                        addDivs(tableId, params);
                        cloneTable(tableId, params);
                        setMargin(tableId, params);
                        setTableStyle(tableId, params);
                        attachScroll(tableId, params);
                        setClonedDivStyle(tableId, params);
                        adjustStyleIfNotOverflow(tableId, params);
                        $("#" + tableId + "Layout").css("border", "solid 1px #ccc");
                        setTimeout(function () {
                            setOffset(tableId, params);
                        }, 0);
                    } else {
                        $("#" + tableId + "Layout").css("display", "none");
                        $("#" + tableId).css("width", params["tableWidth"]);
                        $("#" + tableId).css("height", params["tableHeight"]);
                    }
                    $("#" + tableId + "Layout").css("visibility", 'visible');
                };

                var setDefault = function (params) {
                    if (params["headerColor"] === undefined) {
                        params["headerColor"] = '#f7f7f7';
                    }
                    if (params["fixed"] === undefined) {
                        params["fixed"] = 'both';
                    }
                    if (params["divWidth"] === undefined) {
                        params["divWidth"] = params["parentWidth"];
                    }
                    if (params["divHeight"] === undefined) {
                        params["divHeight"] = params["tableHeight"];
                    }
                };

                var setLayout = function (tableId, params) {
                    if ($("#" + tableId + "Layout").length != 0) {
                        $("#" + tableId + "Layout").before($("#" + tableId));
                        $("#" + tableId + "Layout").empty();
                        $("#" + tableId + "Layout").css("width", params["divWidth"]);
                        $("#" + tableId + "Layout").css("height", params["divHeight"]);
                    } else {
                        $("#" + tableId).after("<div id='" + tableId + "Layout' style='overflow:hidden;height:" + params["divHeight"] + "px; width:" + params["divWidth"] + "px;'></div>");
                    }
                };

                var addDivs = function (tableId, params) {
                    var divStr = '';
                    if (params["fixed"] == "both")
                        divStr += '<div id="' + tableId + 'FixedCell"></div>';
                    if (params["fixed"] == "row" || params["fixed"] == "both")
                        divStr += '<div id="' + tableId + 'HeaderRow"></div>';
                    if (params["fixed"] == "col" || params["fixed"] == "both")
                        divStr += '<div id="' + tableId + 'HeaderCol"></div>';
                    divStr += '<div id="' + tableId + 'Data"></div>';
                    $("#" + tableId + "Layout").css("display", "");
                    $(divStr).appendTo("#" + tableId + "Layout");
                };

                var cloneTable = function (tableId, params) {
                    var oldtable = $("#" + tableId);
                    if (params["fixed"] == "both") {
                        var tableFixedCellCloned = oldtable.clone(true);
                        tableFixedCellCloned.attr("id", tableId + "FixedCellCloned");
                        $("#" + tableId + "FixedCell").append(tableFixedCellCloned);
                    }
                    if (params["fixed"] == "row" || params["fixed"] == "both") {
                        var tableHeaderRowCloned = oldtable.clone(true);
                        tableHeaderRowCloned.attr("id", tableId + "HeaderRowCloned");
                        $("#" + tableId + "HeaderRow").append(tableHeaderRowCloned);
                    }
                    if (params["fixed"] == "col" || params["fixed"] == "both") {
                        var tableHeaderColCloned = oldtable.clone(true);
                        tableHeaderColCloned.attr("id", tableId + "HeaderColCloned");
                        $("#" + tableId + "HeaderCol").append(tableHeaderColCloned);
                    }
                    $("#" + tableId + "Data").append(oldtable);
                };

                var setMargin = function (tableId, params) {
                    $("#" + tableId + "Layout table").each(function () {
                        $(this).css("margin", "0");
                    });
                };

                var setTableStyle = function (tableId, params) {
                    if (params["fixed"] == "col" || params["fixed"] == "both") {
                        $("#" + tableId + "HeaderCol table").css("width", params["tableWidth"]);
                        $("#" + tableId + "HeaderCol table").css("height", params["tableHeight"]);
                    }
                    $("#" + tableId + "Data table").css("width", params["tableWidth"]);
                    $("#" + tableId + "Data table").css("height", params["tableHeight"]);
                    if (params["fixed"] == "col" || params["fixed"] == "both") {
                        $("#" + tableId + "FixedCell table").css("width", params["tableWidth"]);
                        $("#" + tableId + "FixedCell table").css("height", params["tableHeight"]);
                    }
                    $("#" + tableId + "Layout table").css("width", params["tableWidth"]);
                    $("#" + tableId + "Layout table").css("height", params["tableHeight"]);
                };

                var attachScroll = function (tableId, params) {
                    $("#" + tableId + "Data").scroll(function () {
                        if (params["fixed"] == "row" || params["fixed"] == "both")
                            $("#" + tableId + "HeaderRow").scrollLeft($("#" + tableId + "Data").scrollLeft());
                        if (params["fixed"] == "col" || params["fixed"] == "both")
                            $("#" + tableId + "HeaderCol").scrollTop($("#" + tableId + "Data").scrollTop());
                    });
                };

                var setClonedDivStyle = function (tableId, params) {
                    if (params["fixed"] == "both") {
                        $("#" + tableId + "FixedCell").css({
                            "overflow": "hidden",
                            "position": "relative",
                            "z-index": "50",
                            "width": params["widthTd_0"] + 2,
                            "height": params["heightTd_0"] + 1,
                            "background-color": params["headerColor"]
                        });
                        $("#" + tableId + "FixedCellCloned").addClass("header-style");
                    }
                    if (params["fixed"] == "row" || params["fixed"] == "both") {
                        $("#" + tableId + "HeaderRow").css({
                            "overflow": "hidden",
                            "width": params["divWidth"] - 17,
                            "height": params["heightTd_0"],
                            "position": "relative",
                            "z-index": "45",
                            "background-color": params["headerColor"]
                        });
                        $("#" + tableId + "HeaderRowCloned").addClass("header-style");
                    }
                    if (params["fixed"] == "col" || params["fixed"] == "both") {
                        $("#" + tableId + "HeaderCol").css({
                            "overflow": "hidden",
                            "width": params["widthTd_0"],
                            "height": params["divHeight"] - 17,
                            "position": "relative",
                            "z-index": "40",
                            "background-color": params["headerColor"]
                        });
                        $("#" + tableId + "HeaderColCloned").addClass("header-style");
                    }
                    $("#" + tableId + "Data").css({
                        "overflow": "scroll",
                        "width": params["divWidth"],
                        "height": params["divHeight"],
                        "position": "relative",
                        "z-index": "35"
                    });
                };

                var adjustStyleIfNotOverflow = function (tableId, params) {
                    if (params["tableWidth"] <= params["divWidth"]) {
                        $("#" + tableId + "Data").css("overflow-x", "hidden");
                        $("#" + tableId + "Data").css("overflow-y", "scroll");
                        if (params["fixed"] == "row" || params["fixed"] == "both")
                            $("#" + tableId + "HeaderRow").css("width", params["tableWidth"]);
                        if (params["fixed"] == "col" || params["fixed"] == "both")
                            $("#" + tableId + "HeaderCol").css("height", params["divHeight"]);
                        $("#" + tableId + "Data").css("width", params["tableWidth"] + 17);
                        $("#" + tableId + "Layout").css("width", params["tableWidth"] + 17);
                    }
                    if (params["tableHeight"] <= params["divHeight"]) {
                        $("#" + tableId + "Data").css("overflow-y", "hidden");
                        $("#" + tableId + "Data").css("overflow-x", "scroll");
                        if (params["fixed"] == "row" || params["fixed"] == "both")
                            $("#" + tableId + "HeaderRow").css("width", params["divWidth"]);
                        if (params["fixed"] == "col" || params["fixed"] == "both")
                            $("#" + tableId + "HeaderCol").css("height", params["tableHeight"]);
                        $("#" + tableId + "Data").css("height", params["tableHeight"] + 17);
                        $("#" + tableId + "Layout").css("height", params["tableHeight"] + 17);
                    }
                };

                var setOffset = function (tableId, params) {
                    if (params["fixed"] == "both")
                        $("#" + tableId + "FixedCell").offset($("#" + tableId + "Layout").offset());
                    if (params["fixed"] == "row" || params["fixed"] == "both")
                        $("#" + tableId + "HeaderRow").offset($("#" + tableId + "Layout").offset());
                    if (params["fixed"] == "col" || params["fixed"] == "both")
                        $("#" + tableId + "HeaderCol").offset($("#" + tableId + "Layout").offset());
                    $("#" + tableId + "Data").offset($("#" + tableId + "Layout").offset());
                };
                fixedHeaderTable(element.attr('id'));

                $(window).resize(function () {
                    fixedHeaderTable(element.attr('id'));
                });
            }
        }
    });
    return module;
});