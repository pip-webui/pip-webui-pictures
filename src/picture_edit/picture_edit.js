/**
 * @file Picture control
 * @copyright Digital Living Software Corp. 2014-2015
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipPictureEdit', ['ui.event', 'angularFileUpload', 'pipData', 'pipPicturePaste',
        'pipTranslate', 'pipPictures.Templates']);

    thisModule.config(function (pipTranslateProvider) {
        pipTranslateProvider.translations('en', {
            ERROR_WRONG_IMAGE_FILE: 'Incorrect image file. Please, choose another one',
            PICTURE_EDIT_TEXT: 'Click here to upload a picture'
        });
        pipTranslateProvider.translations('ru', {
            ERROR_WRONG_IMAGE_FILE: 'Неправильный файл с изображением. Выберете другой файл',
            PICTURE_EDIT_TEXT: 'Нажмите сюда для загрузки картинки'
        });
    });

    thisModule.directive('pipPictureEdit',
        function () {
            return {
                restrict: 'EA',
                scope: {
                    ngDisabled: '&',
                    pipCreated: '&',
                    pipChanged: '&',
                    pipReset: '&',
                    pipPictureId: '=',
                    pipPartyId: '=',
                    pipAddedPicture: '='
                },
                templateUrl: 'picture_edit/picture_edit.html',
                controller: 'pipPictureEditController'
            };
        }
    );

    thisModule.controller('pipPictureEditController',
        function ($scope, $element, $attrs, $http, $upload, $timeout, $rootScope, $parse, pipDataPicture, pipPicturePaste,
                  pipImageUtils, pipUtils) {
            var
                $control = $element.children('.pip-picture-upload'),
                $input = $control.children('input[type=file]');

            $scope.text = $attrs.pipDefaultText || 'PICTURE_EDIT_TEXT';
            $scope.icon = $attrs.pipDefaultIcon || 'picture-no-border';
            $scope.pictureStartState = pipUtils.toBoolean($scope.pipAddedPicture) ? 'copied' : 'original';

            $scope.control = {
                url: '',
                progress: 0,
                uploaded: false,
                uploading: false,
                loaded: false,
                file: null,
                state: $scope.pictureStartState //'original'
            };

            $scope.control.reset = resetImage;
            $scope.control.save = saveImage;
            $scope.empty = empty;
            $scope.isUpdated = isUpdated;
            $scope.readItemLocally = readItemLocally;
            $scope.onDeleteClick = onDeleteClick;
            $scope.onKeyDown = onKeyDown;
            $scope.onImageError = onImageError;
            $scope.onImageLoad = onImageLoad;
            $scope.onChange = onChange;
            $scope.onBlur = onBlur;
            $scope.onFocus = onFocus;

            // Also optimization to avoid watch if it is unnecessary
            if (pipUtils.toBoolean($attrs.pipRebind)) {
                $scope.$watch('pipPictureId', function (newValue) {
                    $scope.control.reset();
                });
            }

            $scope.$watch($scope.ngDisabled, function (newValue) {
                $input.attr('disabled', $scope.control.disabled);
            });

            // Add class
            $element.addClass('pip-picture-edit');

            // Initialize control
            $scope.control.reset();

            // Execute callback
            if ($scope.pipCreated) {
                $scope.pipCreated({
                    $event: {sender: $scope.control},
                    $control: $scope.control
                });
            }

            return;

            function resetImage(afterDeleting) {
                $scope.control.progress = 0;
                $scope.control.uploading = false;
                $scope.control.uploaded = false;
                $scope.control.file = null;
                $scope.control.state = $scope.pictureStartState; //'original';
                $scope.control.url = '';
                var url = '';

                if (!afterDeleting) {
                    if ($rootScope.$party && $rootScope.$party.id && $scope.pipPictureId) {
                        url = pipDataPicture.getPictureContentUrl($scope.pipPictureId);
                    }
                    if (!url) return;

                    $scope.control.url = url;
                    $scope.control.uploaded = true;
                    $scope.onChange();
                } else $scope.onChange();
            };

            function onFocus() {
                pipPicturePaste.addPasteListener(function (item) {
                    $scope.readItemLocally(item.url, item.file);
                });
            };

            function onBlur() {
                pipPicturePaste.removePasteListener();
            };

            function savePicture(successCallback, errorCallback) {
                var
                    control = $scope.control,
                    file = control.file;

                if ($scope.control.file !== null) {
                    var fileReader = new FileReader();

                    fileReader.onload = function (e) {
                        control.uploading = true;

                        var upload = pipDataPicture.createPicture(
                            {
                                name: file.name,
                                type: file.type,
                                data: e.target.result
                            }, 
                            function (response) {
                                    $scope.pipPictureId = response.data.id;
                                    control.reset();
                                    if (successCallback) successCallback(response);
                            },
                            function () {
                                    control.uploading = false;
                                    control.upload = false;
                                    control.progress = 0;

                                    if (errorCallback) errorCallback(error);
                                    else console.error(error);
                            },
                            function (e) {
                                // Math.min is to fix IE which reports 200% sometimes
                                item.progress = Math.min(100, parseInt(100.0 * e.loaded / e.total));
                            }
                        );
                    };

                    fileReader.readAsArrayBuffer(file);
                } else {
                    var name = $scope.control.url.slice(item.url.lastIndexOf('/') + 1, $scope.control.url.length).split('?')[0],
                        filter = name + '&url=' + $scope.control.url;
                    
                    control.uploading = true;
                 
                     pipDataAvatar.createAvatarByUrl(
                         pipDatPicture.getPicturePostUrl(filter),
                         function (response) {
                            $scope.pipPictureId = response.id;
                            control.reset();

                            if (successCallback) successCallback(response);
                         },
                         function (error) {
                            control.uploading = false;
                            control.upload = false;

                            if (errorCallback) errorCallback(error);
                            else console.error(error);
                         }
                     );
                }

            };

            function deletePicture(successCallback, errorCallback) {
                var control = $scope.control;

                pipDataPicture.deletePicture(
                    $scope.pipPictureId, 
                    function () {
                        $scope.pipPictureId = null;
                        control.reset(true);

                        if (successCallback) successCallback();
                    }, 
                    function (error) {
                        control.uploading = false;
                        control.upload = false;
                        control.progress = 0;

                        if (errorCallback) errorCallback(error);
                        else console.error(error);
                    });
            };

            function saveImage(successCallback, errorCallback) {
                // Process changes of the image
                if ($scope.control.state == 'changed') {
                    savePicture(successCallback, errorCallback);
                }
                // Process deletion of the image
                else if ($scope.control.state == 'deleted') {
                    deletePicture(successCallback, errorCallback);
                }
                // Process if no changes were made
                else {
                    if (successCallback) successCallback();
                }
            };

            // Visual functions
            function empty() {
                return $scope.control.url == '' && !$scope.control.uploading;
            };

            function isUpdated() {
                return $scope.control.state != 'original';
            };

            // Process user events
            function readItemLocally(url, file) {
                $scope.control.file = file;
                $scope.control.url = url;
                $scope.control.state = 'changed';
                $scope.onChange();
            };

            function onDeleteClick($event) {
                $event.stopPropagation();

                $control.focus();

                $scope.control.file = null;
                $scope.control.url = '';
                if ($scope.control.state != 'copied') $scope.control.state = 'deleted';

                $scope.onChange();
            };

            function onKeyDown($event) {
                if ($event.keyCode == 13 || $event.keyCode == 32) {
                    // !! Avoid clash with $apply()
                    setTimeout(function () {
                        $control.trigger('click');
                    }, 0);
                } else if ($event.keyCode == 46 || $event.keyCode == 8) {
                    $scope.control.file = null;
                    $scope.control.url = '';

                    $scope.control.state = 'deleted';

                    $scope.onChange();
                } else if ($event.keyCode == 27) {
                    $scope.control.reset();
                }
            };

            // Clean up url to remove broken icon
            function onImageError($event) {
                $scope.$apply(function () {
                    $scope.control.url = '';

                    var image = $($event.target);

                    pipImageUtils.setErrorImageCSS(image, {width: 'auto', height: '100%'});
                });
            };

            // When image is loaded resize/reposition it
            function onImageLoad($event) {
                var image = $($event.target);
                pipImageUtils.setImageMarginCSS({clientWidth: 80, clientHeight: 80}, image);
                $scope.control.uploading = false;
            };

            // On change event
            function onChange() {
                if ($scope.pipChanged) {
                    $scope.pipChanged({
                        $event: {sender: $scope.control},
                        $control: $scope.control
                    });
                }
            };

        }
    );

})();

