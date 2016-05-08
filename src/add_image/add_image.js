/**
 * @file Add image control
 * @copyright Digital Living Software Corp. 2014-2015
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module("pipAddImage", ['pipCameraDialog', 'pipPictureUrlDialog', 'pipGallerySearchDialog', 'pipCore']);

    thisModule.config(function(pipTranslateProvider) {
        pipTranslateProvider.translations('en', {
            'IMAGE_GALLERY': 'Image gallery',
            'FILE' : 'File',
            'WEB_LINK' : 'Web link',
            'CAMERA' : 'Camera'
        });
        pipTranslateProvider.translations('ru', {
            'IMAGE_GALLERY': 'Галерея изображений',
            'FILE' : 'Файл',
            'WEB_LINK' : 'Веб ссылка',
            'CAMERA' : 'Камера'
        });
    });

    thisModule.directive('pipAddImage', 
        function() {
            return {
                restrict: 'AC',
                scope: {
                    $images: '=pipImages',
                    onChange: '&pipChanged',
                    multi: '&pipMulti',
                    ngDisabled: '&'
                },
                transclude: true,
                templateUrl: 'add_image/add_image.html',
                controller: 'pipAddImageController'
            }
        }
    );

    thisModule.controller('pipAddImageController',
        function ($scope, $element, $mdMenu, $timeout, pipCameraDialog, pipPictureUrlDialog, pipGallerySearchDialog, pipUtils) {

            $scope.hideMenu = hideMenu;
            $scope.onFileChange = onFileChange;
            $scope.onWebLinkClick = onWebLinkClick;
            $scope.onCameraClick = onCameraClick;
            $scope.onGalleryClick = onGalleryClick;
            $scope.isMulti = isMulti;

            $element.click(function () {
                if (!$scope.ngDisabled()) openMenu();
            });

            return;

            function openMenu() {
                $($element).find('.pip-add-image-open-button').scope().$mdOpenMenu();
            }

            function isMulti() {
                if ($scope.multi() !== undefined)
                    return  pipUtils.toBoolean($scope.multi());
                else return true;
            }

            function hideMenu () {
                $mdMenu.hide();
            }

            function dataURItoBlob(dataURI) {
                var byteString;
                
                if (dataURI.split(',')[0].indexOf('base64') >= 0)
                    byteString = atob(dataURI.split(',')[1]);
                else
                    byteString = unescape(dataURI.split(',')[1]);

                var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

                var ia = new Uint8Array(byteString.length);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }

                return new Blob([ia], {type:mimeString});
            }

            function addImages(images) {
                if (images === undefined) return;

                if (Array.isArray(images)) {
                    images.forEach(function (img) {
                        if ($scope.onChange)
                            $scope.onChange({url: img.url, file: img.file});
                    });
                } else {
                    if ($scope.onChange)
                        $scope.onChange({url: images.url, file: images.file});
                }

                if ($scope.$images === undefined || !Array.isArray($scope.$images))
                    return;

                if (Array.isArray(images)) {
                    images.forEach(function (img) {
                        $scope.$images.push(img.url);
                    });
                } else {
                    $scope.$images.push(images.url);
                }
            }

            // Process user actions

            function onFileChange ($files) {
                if ($files == null || $files.length == 0)
                    return;

                $files.forEach(function (file) {
                    if (file.type.indexOf('image') > -1) {
                        $timeout(function() {
                            var fileReader = new FileReader();
                            fileReader.readAsDataURL(file);
                            fileReader.onload = function(e) {
                                $timeout(function() {
                                    addImages({url: e.target.result, file: file});
                                });
                            }
                        });
                    }
                });

            }

            function onWebLinkClick () {
                pipPictureUrlDialog.show(function (result) {
                    var blob = null;
                    if (result.substring(0, 10) == 'data:image') {
                        blob = dataURItoBlob(result);
                        blob.name = result.slice(result.lastIndexOf('/') + 1, result.length).split('?')[0];
                    }
                    addImages({url: result, file: blob});
                });
            }

            function onCameraClick () {
                pipCameraDialog.show(function (result) {
                    var blob = dataURItoBlob(result);
                    blob.name = 'camera';
                    addImages({url: result, file: blob});
                });
            }

            function onGalleryClick () {
                pipGallerySearchDialog.show(function (result) {
                    var imgs = [];
                    result.forEach(function (url) {
                        imgs.push({url: url, file: null});
                    });
                    addImages(imgs);
                }, $scope.isMulti());
            }
    });

})();


