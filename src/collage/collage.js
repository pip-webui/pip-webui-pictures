/**
 * @file Collage control
 * @copyright Digital Living Software Corp. 2014-2015
 * @todo
 * - Improve samples in sampler app
 * - Replace placeholder with default image generated on server
 * - Fix resizing problem
 */
 
/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module("pipCollage", ['pipCore', 'pipData']);

    thisModule.directive('pipCollage',
        function () {
            return {
                restrict: 'EA',
                scope: false,
                controller: 'pipCollageController' 
            }
        }
    );

    thisModule.controller('pipCollageController',
        function ($scope, $element, $attrs, $parse, $rootScope, pipUtils, pipStrings, pipImageUtils, pipDataPicture) {
            var                         
                pictureIdsGetter = $attrs.pipPictureIds ? $parse($attrs.pipPictureIds) : null,
                srcsGetter = $attrs.pipSrcs ? $parse($attrs.pipSrcs) : null,
                uniqueCodeGetter = $attrs.pipUniqueCode ? $parse($attrs.pipUniqueCode) : null,
                multipleGetter = $attrs.pipMultiple ? $parse($attrs.pipMultiple) : null,
                allowOpen = pipUtils.toBoolean($attrs.pipOpen),
                collageSchemes = pipImageUtils.getCollageSchemes(),
                resized = 0,
                $svgData = '<?xml version="1.0" encoding="utf-8"?>'+
                    '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'+
                    '<svg version="1.1"'+
                    'xmlns="http://www.w3.org/2000/svg"'+
                    'xmlns:xlink="http://www.w3.org/1999/xlink"'+
                    'x="0px" y="0px"'+
                    'viewBox="0 0 510 510"'+
                    'style="enable-background:new 0 0 515 515;"'+
                    'xml:space="preserve">'+
                    '<defs>'+
                    '<style type="text/css"><![CDATA['+
                    '#symbol-picture-no-border {'+
                    '        transform-origin: 50% 50%;'+
                    '        transform: scale(0.6, -0.6);'+
                    '    }'+
                    '        ]]></style>'+
                    '        </defs>'+
                    '<rect x="0" width="515" height="515"/>'+
                    '<path id="symbol-picture-no-border" d="M120 325l136-102 69 33 136-82 0-54-410 0 0 136z m341 15c0-28-23-51-51-51-29 0-52 23-52 51 0 29 23 52 52 52 28 0 51-23 51-52z" />'+
                    '</svg>';

            // Add class
            $element.addClass('pip-collage');

            // Also optimization to avoid watch if it is unnecessary
            if (pipUtils.toBoolean($attrs.pipRebind)) {
                if (srcsGetter) {
                    $scope.$watch(srcsGetter, function (newValue) {
                        //getImageUrls();
                        generateContent();
                    });
                    $scope.$watchCollection(srcsGetter, function (newValue) {
                        //getImageUrls();
                        generateContent();
                    });
                }
                else if (pictureIdsGetter) {
                    $scope.$watch(pictureIdsGetter, function (newValue) {
                        //getImageUrls();
                        generateContent();
                    });
                }
            }

            $scope.getElementDimensions = getElementDimensions;

            var update = _.debounce(calculateResize, 50);

            function calculateResize() {
                var ims = $element.find('img');
                var i = 0;
                for ( i; i < ims.length; i++ ) {
                    var container = angular.element(ims[i].parentElement),
                        image = angular.element(ims[i]);

                    if (image.css('display') != 'none')
                        pipImageUtils.setImageMarginCSS(container, image);
                }

                var icns = $element.find('md-icon');

                var i = 0;
                for ( i; i < icns.length; i++ ) {
                    var container = angular.element(icns[i].parentElement),
                        icn = angular.element(icns[i]);
                    if (container.css('display') != 'none') {
                        pipImageUtils.setIconMarginCSS(container[0], icn);
                    }

                }
            };

            $scope.$watch($scope.getElementDimensions, function (newValue, oldValue) {
                if (newValue && oldValue && oldValue.h == newValue.h && oldValue.w == newValue.w) return;
                calculateResize();
            }, true);

            generateContent();
            //getImageUrls();

            return;

            function getElementDimensions() {
                var dimension = {
                    'h': $element.height(),
                    'w': $element.width()
                };

                return dimension;
            };

            // Clean up url to remove broken icon
            function onImageError(event) {
                var 
                    image = $(event.target),
                    container = image.parent(),
                    defaultBlock = container.children('div'),
                    defaultIcon = image.parent().find('md-icon');

                defaultBlock.css('display', 'block');
                image.css('display', 'none');
                pipImageUtils.setIconMarginCSS(container[0], defaultIcon);
                defaultIcon.empty().append($svgData);
            };

            // When image is loaded resize/reposition it
            function onImageLoad($event) {
                var image = $($event.target),
                    container =  image.parent(),
                    defaultBlock = container.children('div');

                pipImageUtils.setImageMarginCSS(container, image);

                defaultBlock.css('display', 'none');
            };

            function getScheme(count) {
                var schemes = collageSchemes[count - 1];

                // If nothing to choose from then return
                if (schemes.length == 1) return schemes[0];

                // Calculate unique had code
                var uniqueCode = uniqueCodeGetter ? '' + uniqueCodeGetter($scope) : '';
                var hash = pipStrings.hashCode(uniqueCode);

                // Return reproducable scheme by hashcode
                return schemes[hash % schemes.length];
            };

            function getImageUrls() {
                // Simply return sources
                if (srcsGetter) {
                    var srcs = srcsGetter($scope);
                    //generateContent();
                    return _.clone(srcs);
                }

                // Calculate urls if picture ids are specified
                if (pictureIdsGetter) {
                    var
                        ids = pictureIdsGetter($scope) || [],
                        result = [];

                    for (var i = 0; i < ids.length; i++) {
                        result.push(pipDataPicture.getPictureContentUrl(ids[i]));
                    }

                    return result;
                }

                // Return an empty array otherwise
                return [];
            };

            function generatePicture(urls, scheme) {
                var 
                    url = urls[0],
                    containerClasses = '',
                    pictureClasses = '';

                urls.splice(0, 1);

                containerClasses += scheme.fullWidth ? ' pip-full-width' : '';
                containerClasses += scheme.fullHeight ? ' pip-full-height' : '';
                containerClasses += ' flex-' + scheme.flex;

                pictureClasses += scheme.leftPadding ? ' pip-left' : '';
                pictureClasses += scheme.rightPadding ? ' pip-right' : '';
                pictureClasses += scheme.topPadding ? ' pip-top' : '';
                pictureClasses += scheme.bottomPadding ? ' pip-bottom' : '';

                if (allowOpen) {
                    return '<a class="pip-picture-container' + containerClasses + '" flex="' + scheme.flex + '" '
                        + 'href="' + url + '"  target="_blank">'
                        + '<div class="pip-picture' + pictureClasses + '"><img src="' + url + '"/>'
                        + '<div><md-icon></md-icon></div></div></a>';
                }

                return '<div class="pip-picture-container' + containerClasses + '" flex="' + scheme.flex + '">'
                    + '<div class="pip-picture' + pictureClasses + '"><img src="' + url + '"/>'
                    + '<div><md-icon></md-icon></div></div></div>';
            };

            function generatePictureGroup(urls, scheme) {
                var classes = '', result;

                classes += scheme.fullWidth ? ' pip-full-width' : '';
                classes += scheme.fullHeight ? ' pip-full-height' : '';
                classes += ' flex-' + scheme.flex;
                classes += ' layout-' + scheme.layout;

                result = '<div class="pip-picture-group layout' + classes + '" flex="'
                    + scheme.flex + '" layout="' + scheme.layout + '">';

                // Generate content for children recursively
                for (var i = 0; i < scheme.children.length; i++) {
                    result += generate(urls, scheme.children[i]);
                }

                result += '</div>';
                return result;
            };

            function generate(urls, scheme) {
                if (scheme.group)
                    return generatePictureGroup(urls, scheme);
                return generatePicture(urls, scheme);
            };

            function generateContent(urls) {
                // Unbind previously defined actions handlers
                $element.find('img')
                    .unbind('error')
                    .unbind('load');

                // Clean up content
                $element.empty();

                // Calculate list of image urls
                var urls = getImageUrls();

                // And exit if nothing to show
                if (urls.length == 0) {
                    $element.hide();
                    return;
                }

                // Limit collage only to one element if not specified otherwise
                if (urls.length > 8) {
                    var multiple = multipleGetter ? multipleGetter($scope) : false;

                    if (!multiple) {
                        urls.length = 8;
                    }
                }

                if (urls.length <= 8) {
                    // Get scheme for visualization
                    var scheme = getScheme(urls.length);

                    // Generate and add content
                    var html = '<div class="pip-collage-section">' + generate(urls, scheme) + '</div>';
                    html += '<div class="clearfix"></div>';
                    $element.html(html);
                } else {
                    var html = '';

                    while (urls.length > 0) {
                        var partialUrls = urls.splice(0, 8);

                        // Get scheme for visualization
                        var scheme = getScheme(partialUrls.length);

                        // Generate and add content
                        html += '<div class="pip-collage-section">' + generate(partialUrls, scheme) + '</div>';
                    }

                    html += '<div class="clearfix"></div>';
                    $element.html(html);
                }

                // Bind events to images...
                $element.find('img')
                    .bind('error', onImageError)
                    .bind('load', onImageLoad);

                // Show the new element
                $element.show();
            };

        }

    );

})();

