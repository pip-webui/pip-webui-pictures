/**
 * @file Picture URL dialog
 * @copyright Digital Living Software Corp. 2014-2016
 * @todo
 * - Add sample to sampler app
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipPictureUrlDialog',
        ['ngMaterial', 'pipCore', 'pipPictures.Templates']);

    thisModule.config(function(pipTranslateProvider) {
        pipTranslateProvider.translations('en', {
            'PICTURE_FROM_WEBLINK': 'Add from web link',
            'LINK_PICTURE': 'Link to the picture...'
        });
        pipTranslateProvider.translations('ru', {
            'PICTURE_FROM_WEBLINK': 'Добавить из веб ссылки',
            'LINK_PICTURE': 'Ссылка на изображение...'
        });
    });

    thisModule.factory('pipPictureUrlDialog',
        function ($mdDialog) {
            return {
                show: function (successCallback) {
                    $mdDialog.show({
                        templateUrl: 'picture_url_dialog/picture_url_dialog.html',
                        clickOutsideToClose: true,
                        controller: 'pipPictureUrlDialogController'
                    }).then(function (result) {
                        if (successCallback) {
                            successCallback(result);
                        }
                    });
                }
            };
    });

    thisModule.controller('pipPictureUrlDialogController', 
        function ($scope, $rootScope, $timeout, $mdMenu, $mdDialog, pipImageUtils) {
            $scope.url = '';
            $scope.invalid = true;
            $scope.theme = $rootScope.$theme;
            $scope.checkUrl = checkUrl;
            $scope.onCancelClick = onCancelClick;
            $scope.onAddClick = onAddClick;

            return;

            function setImageSize(img) {
                var imageWidth = img.width(),
                    imageHeight = img.height();

                var cssParams = {};

                if ((imageWidth) > (imageHeight)) {
                    cssParams['width'] = '250px';
                    cssParams['height'] = 'auto';
                } else {
                    cssParams['width'] = 'auto';
                    cssParams['height'] = '250px';
                }

                img.css(cssParams);
            }

            function checkUrl() {
                var img = $("img#url_image")
                    .on('error', function () {
                        $scope.invalid = true;
                        $scope.$apply();
                    })
                    .on('load', function () {
                        $scope.invalid = false;
                        setImageSize(img);
                        $scope.$apply();
                    })
                    .attr("src", $scope.url);
            };
            
            function onCancelClick() {
                $mdDialog.cancel();
            };
            
            function onAddClick() {
                $mdDialog.hide($scope.url);
            };
        }
    );

})();