/**
 * @file Picture control
 * @copyright Digital Living Software Corp. 2014-2015
 * @todo
 * - Improve samples in sampler app
 * - Replace placeholder with default image generated on server
 * - Fix resizing problem
 */
 
/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module("pipPicture", ['pipCore']);

    thisModule.directive('pipPicture', 
        function() {
            return {
                restrict: 'EA',
                scope: {
                    src: '&pipSrc',
                    pictureId: '=pipPictureId',
                    defaultIcon: '=pipDefaultIcon'
                },
                template: '<img ui-event="{ error: \'onImageError($event)\', load: \'onImageLoad($event)\' }"/>'
                          + '<div><span></span></div>',
                controller: 'pipPictureController' 
            }
        }
    );

    thisModule.controller('pipPictureController',
        function ($scope, $element, $attrs, $rootScope, pipUtils, pipImageUtils, pipRest) {
            var 
                image = $element.children('img'),
                defaultBlock = $element.children('div');

            $scope.onImageError = onImageError;
            $scope.onImageLoad = onImageLoad;

            // Add class
            $element.addClass('pip-picture');

            bindControl();

            // Also optimization to avoid watch if it is unnecessary
            if (pipUtils.toBoolean($attrs.pipRebind)) {
                $scope.$watch($scope.pictureId, function(newValue) {
                    if ($scope.pictureId != newValue) bindControl();
                });
            }

            if (pipUtils.toBoolean($attrs.pipRebind)) {
                $scope.$watch($scope.src, function(newValue) {
                    if ($scope.src != newValue)
                      bindControl();
                });
            }

            return;

            // Clean up url to remove broken icon
            function onImageError($event) {
                $scope.$apply(function() {
                    var image = $($event.target);

                    pipImageUtils.setErrorImageCSS(image);
                    defaultBlock.css('display', 'block');
                });
            };

            // When image is loaded resize/reposition it
            function onImageLoad($event) {
                var image = $($event.target);
                pipImageUtils.setImageMarginCSS($element, image);
                defaultBlock.css('display', 'none');
            };

            function bindControl() {
                if ($scope.pictureId) {
                    var url = pipDatPicture.getPictureContentUrl($scope.pictureId); 
                    // serverUrl = pipRest.serverUrl(),
                    //     userId = ($rootScope.$user || {}).id,
                    //     partyId = ($rootScope.$party || {}).id || userId,
                    //     url = serverUrl + '/api/parties/' + partyId + '/files/' + $scope.pictureId + '/content';
                        

                    image.attr('src', url);
                } else {
                    if ($scope.src) image.attr('src', $scope.src());
                    else image.attr('src', '');
                }
            };
        }        
    ); 

})();

