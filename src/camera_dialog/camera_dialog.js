/**
 * @file Camera dialog
 * @copyright Digital Living Software Corp. 2014-2015
 * @todo
 * - Add sample to sampler app
 */

/* global angular, Webcam */

(function () {
    'use strict';

    var thisModule = angular.module('pipCameraDialog',
        ['ngMaterial', 'pipCore', 'pipPictures.Templates']);

    thisModule.config(function (pipTranslateProvider) {
        pipTranslateProvider.translations('en', {
            'TAKE_PICTURE': 'Take a picture',
            'WEB_CAM_ERROR': 'Webcam is missing or was not found'
        });
        pipTranslateProvider.translations('ru', {
            'TAKE_PICTURE': 'Сделать фото',
            'WEB_CAM_ERROR': 'Web-камера отсутствует или не найдена'
        });
    });

    thisModule.factory('pipCameraDialog',
        function ($mdDialog) {
            return {
                show: function (successCallback) {
                    $mdDialog.show({
                        templateUrl: 'camera_dialog/camera_dialog.html',
                        clickOutsideToClose: true,
                        controller: 'pipCameraController'
                    }).then(function (result) {
                        Webcam.reset();
                        if (successCallback) {
                            successCallback(result);
                        }
                    }, function () {
                        Webcam.reset();
                    });
                }
            };
        });

    thisModule.controller('pipCameraController',
        function ($scope, $rootScope, $timeout, $mdMenu, $mdDialog, pipUtils) { // $cordovaCamera
            $scope.browser = pipUtils.getBrowser().os;
            $scope.theme = $rootScope.$theme;

            if ($scope.browser !== 'android') {
                Webcam.init();

                setTimeout(function () {
                    Webcam.attach('.camera-stream');
                }, 0);

                Webcam.on('error', function (err) {
                    $scope.webCamError = true;
                    console.error(err);
                });

                Webcam.set({
                    width: 400,
                    height: 300,

                    dest_width: 400,
                    dest_height: 300,

                    crop_width: 400,
                    crop_height: 300,

                    image_format: 'jpeg',
                    jpeg_quality: 90
                });

                //Webcam.setSWFLocation('../../../dist/webcam.swf');
                Webcam.setSWFLocation('webcam.swf');

            } else {
                document.addEventListener("deviceready",onDeviceReady,false);

            }
            // todo add logic in callbacks
            function onDeviceReady() {
                navigator.camera.getPicture(onSuccess, onFail,
                    {
                        sourceType: Camera.PictureSourceType.CAMERA,
                        correctOrientation: true,
                        quality: 75,
                        targetWidth: 200,
                        destinationType: Camera.DestinationType.DATA_URL
                    });
            }


            function onSuccess(imageData) {
                var picture = imageData;
                var picture = 'data:image/jpeg;base64,' + imageData;
                $mdDialog.hide(picture);
            }

            function onFail(message) {
                alert('Failed because: ' + message);
                $mdDialog.hide();
            }

            $scope.$freeze = false;

            $scope.onTakePictureClick = onTakePictureClick;
            $scope.onResetPicture = onResetPicture;
            $scope.onCancelClick = onCancelClick;

            return;

            function onTakePictureClick() {
                if (Webcam) {
                    if ($scope.$freeze) {
                        Webcam.snap(function (dataUri) {
                            $scope.$freeze = false;
                            $mdDialog.hide(dataUri);
                        });
                    } else {
                        $scope.$freeze = true;
                        Webcam.freeze();
                    }
                }
            };

            function onResetPicture() {
                $scope.$freeze = false;
                Webcam.unfreeze();
            };

            function onCancelClick() {
                $mdDialog.cancel();
            };
        }
    );

})();