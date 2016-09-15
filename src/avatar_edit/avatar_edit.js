/**
 * @file Avatar control
 * @copyright Digital Living Software Corp. 2014-2015
 * @todo
 * - Improve samples in sampler app
 * - Replace placeholder with default image generated on server
 * - Generate file url based on entity type, do not set it as full url via pipSrc
 */
 
/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module("pipAvatarEdit", ['ui.event', 'angularFileUpload', 'pipPicturePaste', 'pipRest',
        'pipImageUtils', 'pipPictures.Templates']);

    thisModule.config(function(pipTranslateProvider) {
        pipTranslateProvider.translations('en', {
            'PICTURE_EDIT_TEXT': 'Click here to upload a picture'
        });
        pipTranslateProvider.translations('ru', {
            'PICTURE_EDIT_TEXT': 'Нажмите сюда для загрузки картинки'
        });
    });

    thisModule.directive('pipAvatarEdit',
        function() {
            return {
                restrict: 'EA',
                scope: {
                    ngDisabled: '&',
                    pipPartyId: '&',
                    pipEntityType: '&',
                    pipId: '&',
                    pipCreated: '&',
                    pipChanged: '&',
                    pipReset: '&'
                },
                templateUrl: 'picture_edit/picture_edit.html',
                controller: 'pipAvatarEditController' 
            };
        }
    );

    thisModule.controller('pipAvatarEditController',
        function($scope, $element, $attrs, $http, $upload, $rootScope, pipPicturePaste, pipRest, pipImageUtils) {
            var 
                $control = $element.children('.pip-picture-upload'),
                $input = $control.children('input[type=file]'),
                entityTypes = pipDataAvatar.getEntityTypes();
                // serverUrl = pipRest.serverUrl();
            
            $scope.text = $attrs.pipDefaultText || 'PICTURE_EDIT_TEXT'; 
            $scope.icon = $attrs.pipDefaultIcon || 'picture-no-border';
            $scope.control = {
                url: '',
                progress: 0,
                uploaded: false,
                uploading: false,
                loaded: false,

                file: null,
                state: 'original'
            };

            $scope.control.reset = reset;
            $scope.control.save = save;
            $scope.empty = empty;
            $scope.isUpdated = isUpdated;
            $scope.readItemLocally = readItemLocally;
            $scope.onDeleteClick = onDeleteClick;
            $scope.onKeyDown = onKeyDown;
            $scope.onImageError = onImageError;
            $scope.onImageLoad = onImageLoad;
            $scope.onChange = onChange;

            // Watching for changes
            $scope.$watch($scope.pipId, function(newValue) {
                if ($scope.pipReset() !== false)
                    $scope.control.reset();
            });

            $scope.$watch($scope.pipPartyId, function(newValue) {
                if ($scope.pipReset() !== false)
                    $scope.control.reset();
            });

            $scope.$watch($scope.ngDisabled, function(newValue) {
                $input.attr('disabled', $scope.control.disabled);
            });

            // Add paste listener
            $element.children('.pip-picture-upload').focus(function () {
                pipPicturePaste.addPasteListener(function (item) {
                    $scope.readItemLocally(item.url, item.file);
                });
            });

            $element.children('.pip-picture-upload').blur(function () {
                pipPicturePaste.removePasteListener();
            });

            // Add class
            $element.addClass('pip-picture-edit');

            // Execute callback
            if ($scope.pipCreated) {
                $scope.pipCreated({
                    $event: { sender: $scope.control },
                    $control: $scope.control
                });
            }

            // Initialize control
            $scope.control.reset();

            return;

            // --------------------------------

            // Utility functions

            function reset(afterDeleting) {
                $scope.control.progress = 0;
                $scope.control.uploading = false;
                $scope.control.uploaded = false;

                $scope.control.file = null;
                $scope.control.state = 'original';
                $scope.control.url = '';

                if (!afterDeleting) {
                    var url = pipDataAvatar.getAvatarUrl($scope.pipPartyId(), '',
                        $scope.pipId(), $scope.pipEntityType(), false, true);

                    if (!url) return;

                    //pipImageUtils.addHttpHeaders();
                    $scope.control.progress = 0;

                    $scope.control.url = url;
                    $scope.control.uploaded = $scope.control.url != '';
                    $scope.onChange();

                } else $scope.onChange();
            };
// tofo move to pipDataAvatar
            // function generateUrl() {
            //     if ($scope.pipEntityType() && $scope.pipId() && $scope.pipPartyId()) {
            //         return serverUrl + '/api/parties/' + $scope.pipPartyId() + '/'
            //             + entityTypes[$scope.pipEntityType()] + '/' + $scope.pipId() + '/avatar';
            //     } else {
            //         if ($scope.pipPartyId() && !$scope.pipEntityType()) {
            //             if ($attrs.pipEntityType || $attrs.pipId)
            //                 return '';
            //             return serverUrl + '/api/parties/' + $scope.pipPartyId()
            //                 + '/avatar';
            //         }
            //     }

            //     return '';
            // }
            function getParams() {
                return {
                        entityType:  $scope.pipEntityType(),
                        id: $scope.pipId(),
                        partyId: $scope.pipPartyId()
                    };
            }

            function saveItemUrl() {
                var url = $scope.control.url,
                    // FILE_URL = generateUrl();
                    // name = url.slice(url.lastIndexOf('/') + 1, url.length).split('?')[0];
                // return FILE_URL + '?name=' + name + '&url=' + url

                    name = url.slice(url.lastIndexOf('/') + 1, url.length).split('?')[0],
                    filter = name + '&url=' + url;

                return pipDataAvatar.getAvatarPostUrl(getParams(), filter);  
            };

            function savePicture(successCallback, errorCallback) {
                var
                    control = $scope.control,
                    file = control.file;

                if ($scope.control.file !== null) {
                    var 
                        fileReader = new FileReader();
                        // FILE_URL = generateUrl();
                        
                    fileReader.onload = function (e) {
                        control.uploading = true;

                        var upload = pipDataAvatar.createAvatar({
                                name: file.name,
                                params: getParams(),
                                type: file.type,
                                data: e.target.result
                            },
                            function (response) {
                                control.reset();
                                if (successCallback) successCallback(response);
                            },
                            function (error) {
                                control.uploading = false;
                                control.upload = false;
                                control.progress = 0;

                                if (errorCallback) errorCallback(error);
                                else console.error(error);
                            },
                            function (e) {
                                control.progress = Math.min(100, parseInt(100.0 * e.loaded / e.total));
                            }
                        );
                    };

                    fileReader.readAsArrayBuffer(file);
                } else {
                     control.uploading = true;

                     pipDataAvatar.createAvatarByUrl(
                         saveItemUrl(),
                         function (response) {
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

                pipDataAvatar.deleteDocument(
                    getParams(), 
                    function (data) {
                        control.reset(true);

                        if (successCallback) successCallback();
                    },
                    function (error) {
                        control.uploading = false;
                        control.upload = false;
                        control.progress = 0;

                        if (errorCallback) errorCallback(error);
                        else console.error(error);
                    }
                );
            };

            function save(successCallback, errorCallback) {
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
                $scope.control.state = 'deleted';

                $scope.onChange();
            };

            function onKeyDown($event) {
                if ($event.keyCode == 13 || $event.keyCode == 32) {
                    setTimeout(function() {
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
                $scope.$apply(function() {
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
                        $event: { sender: $scope.control },
                        $control: $scope.control
                    });
                }
            };
        }        
    );
    
})();

