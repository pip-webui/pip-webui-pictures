/**
 * @file Picture paste service
 * @copyright Digital Living Software Corp. 2014-2015
 */

/* global $, angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipPicturePaste', []);

    thisModule.factory('pipPicturePaste', function ($timeout) {
        var paste = {};
        var pasteCatcher = null;

        paste.addPasteListener = function (onPaste) {
            if (!window.Clipboard) {
                if (pasteCatcher !== null) this.removePasteElement();

                pasteCatcher = document.createElement("div");

                // Firefox allows images to be pasted into contenteditable elements
                pasteCatcher.setAttribute("contenteditable", "true");

                // We can hide the element and append it to the body,
                //pasteCatcher.style.opacity = 0;
                $(pasteCatcher).css({
                    "position": "absolute",
                    "left": "-999",
                    width: "0",
                    height: "0",
                    "overflow": "hidden",
                    outline: 0
                });

                document.body.appendChild(pasteCatcher);
            }

            $(document).on('paste', function (event) {
                if (event.clipboardData == null && event.originalEvent) {
                    event = event.originalEvent;
                }

                // Paste for chrome
                if (event.clipboardData) {
                    var items = event.clipboardData.items;

                    _.each(items, function (item) {
                        if (item.type.indexOf("image") != -1) {
                            var file = item.getAsFile();

                            var fileReader = new FileReader();
                            fileReader.onload = function (e) {
                                $timeout(function () {
                                    onPaste({url: e.target.result, file: file});
                                });
                            };
                            fileReader.readAsDataURL(file);
                        }
                    });
                }
                // Paste for IE
                else if (window.clipboardData && window.clipboardData.files) {
                    _.each(window.clipboardData.files, function (file) {
                        var fileReader = new FileReader();
                        fileReader.onload = function (e) {
                            $timeout(function () {
                                onPaste({url: e.target.result, file: file});
                            });
                        };
                        fileReader.readAsDataURL(file);
                    });
                }
            });
        };

        paste.removePasteListener = function () {
            if (!window.Clipboard) {
                if (pasteCatcher !== null) {
                    document.body.removeChild(pasteCatcher);
                    pasteCatcher = null;
                }
            }
            $(document).off('paste');
        };

        return paste;
    });

})();
