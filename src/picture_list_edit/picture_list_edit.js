/**
 * @file Picture list edit control
 * @copyright Digital Living Software Corp. 2014-2015
 * @todo
 * - Improve samples in sampler app
 * - Add animations to add/remove pictures
 * - ?? Replace placeholder with default image generated on server?
 */
 
/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module("pipPictureListEdit", 
        ['ui.event', 'angularFileUpload', 'pipCore', 'pipFocused', 'pipRest', 'pipPicturePaste']);

    thisModule.config(function(pipTranslateProvider) {
        pipTranslateProvider.translations('en', {
            'PICTURE_LIST_EDIT_TEXT': 'Click here to add a picture',
            'ERROR_TRANSACTION_IN_PROGRESS': 'Transaction is in progress. Please, wait until it is finished or abort',
            'ERROR_IMAGE_PRELOADING': 'Image loading error. The picture can not be saved'
        });
        pipTranslateProvider.translations('ru', {
            'PICTURE_LIST_EDIT_TEXT': 'Нажмите сюда чтобы добавить картинку',
            'ERROR_TRANSACTION_IN_PROGRESS': 'Транзакция еще не завершена. Подождите окончания или прервите её',
            'ERROR_IMAGE_PRELOADING': 'Ошибка при загрузки картинки. Картинка не сохранена.'
        });
    });

    thisModule.directive('pipPictureListEdit', 
        function() {
            return {
                restrict: 'EA',
                scope: {
                    pipPictureIds: '=',
                    pipAddedPicture: '=',
                    ngDisabled: '&',
                    pipCreated: '&',
                    pipChanged: '&'
                },
                templateUrl: 'picture_list_edit/picture_list_edit.html',
                controller: 'pipPictureListEditController' 
            };
        }
    );

    thisModule.controller('pipPictureListEditController',
        function($scope, $rootScope, $element, $attrs, $parse, $http, $upload, $timeout, pipUtils,
                 pipRest, pipPicturePaste, pipImageUtils) {
                
            var
                $control = $element.children('.pip-picture-drop'),
                itemPin = 0;

            $scope.text = $attrs.pipDefaultText || 'PICTURE_LIST_EDIT_TEXT';
            $scope.icon = $attrs.pipDefaultIcon || 'picture-no-border';
            $scope.pipRebind = pipUtils.toBoolean($attrs.pipRebind);
            $scope.pictureStartState = pipUtils.toBoolean($scope.pipAddedPicture) ? 'copied' : 'original';

            $scope.control = {
                uploading: 0,
                items: []
            };

            $scope.control.reset = reset;
            $scope.control.save = save;
            $scope.control.abort = abort;
            $scope.filterItem = function(item) {
                return item.state != 'deleted';
            };
            $scope.readItemLocally = readItemLocally;
            $scope.onSelectClick = onSelectClick;
            $scope.onDeleteClick = onDeleteClick;
            $scope.onKeyDown = onKeyDown;
            $scope.onImageError = onImageError;
            $scope.onImageLoad = onImageLoad;
            $scope.onChange = onChange;

            // Watch for changes
            if ($scope.pipRebind) {
                $scope.$watch(
                    function () {
                        // Todo: Optimize change tracking
                        return $scope.pipPictureIds;
                    },
                    function (newValue) {
                        $scope.control.reset();
                    }
                );
            }

            // Add paste listeners
            $element.find('.pip-picture-upload').focus(function () {
                pipPicturePaste.addPasteListener(function (item) {
                    $scope.readItemLocally(item.url, item.file);
                });
            });
            $element.find('.pip-picture-upload').blur(function () {
                pipPicturePaste.removePasteListener();
            });

            // Add class
            $element.addClass('pip-picture-list-edit');

            // Initialize control
            $scope.control.reset();

            // Execute callback
            if ($scope.pipCreated) {
                $scope.pipCreated({
                    $event: { sender: $scope.control },
                    $control: $scope.control
                });
            }

            return;

            function contentUrl(id) {
                var
                    serverUrl = pipRest.serverUrl(),
                    partyId = $scope.$party ? $scope.$party.id : pipRest.userId();

                return serverUrl + '/api/parties/' + partyId + '/files/' + id + '/content';
            }

            function onImageError($event, item) {
                item.error = true;
            };

            function getItems() {
                var
                    pictureIds = $scope.pipPictureIds,
                    items = [];

                if (pictureIds == null || pictureIds.length == 0)
                    return items;

                for (var i = 0; i < pictureIds.length; i++) {
                    items.push({
                        pin: itemPin++,
                        id: pictureIds[i],
                        uploading: false,
                        uploaded: false,
                        progress: 0,
                        file: null,
                        url: contentUrl(pictureIds[i]),
                        state: $scope.pictureStartState //'original'
                    });
                }

                return items;
            }

            function setItems() {
                // Clean the array
                if ($scope.pipPictureIds && $scope.pipPictureIds.length > 0)
                    $scope.pipPictureIds.splice(0, $scope.pipPictureIds.length);

                for (var i = 0; i < $scope.control.items.length; i++) {
                    var item = $scope.control.items[i];
                    if (item.id)
                        $scope.pipPictureIds.push(item.id);
                }
            }

            function reset() {
                $scope.control.uploading = 0;
                $scope.control.items = getItems();

            }

            function addItemUrl(item) {
                var name = item.url.slice(item.url.lastIndexOf('/') + 1, item.url.length).split('?')[0];
                var
                    serverUrl = pipRest.serverUrl(),
                    partyId = $scope.$party ? $scope.$party.id : pipRest.userId();

                return serverUrl + '/api/parties/' + partyId + '/files?name=' + name + '&url=' + item.url
            }

            function addItemUrlWithFile(item) {
                var
                    serverUrl = pipRest.serverUrl(),
                    partyId = $scope.$party ? $scope.$party.id : pipRest.userId();

                return serverUrl + '/api/parties/' + partyId + '/files?name=' + item.file.name
            }

            function addItem(item, callback) {
                if (item.file !== null) {
                    var file = item.file;

                    var fileReader = new FileReader();
                    fileReader.onload = function (e) {
                        if (item.uploading) return;
                        item.uploading = true;
                        item.upload = $upload.http({
                            url: addItemUrlWithFile(item),
                            headers: {'Content-Type': file.type},
                            data: e.target.result
                        })
                            .then(
                            function (response) {
                                item.id = response.data ? response.data.id : null;
                                item.uploaded = true;
                                item.uploading = false;
                                item.progress = 0;
                                item.upload = null;
                                item.file = null;
                                item.url = contentUrl(item.id);
                                item.state = 'original';

                                callback();
                            },
                            function (error) {
                                item.uploaded = false;
                                item.uploading = false;
                                item.progress = 0;
                                item.upload = null;
                                //$scope.$apply();
//
                                callback(error);
                            },
                            function (e) {
                                // Math.min is to fix IE which reports 200% sometimes
                                item.progress = Math.min(100, parseInt(100.0 * e.loaded / e.total));
                            }
                        );
                    };

                    fileReader.readAsArrayBuffer(file);
                } else {
                    var url = addItemUrl(item);
                    item.uploading = true;
                    $http['post'](url)
                        .success(function (response) {
                            item.id = response.data ? response.data.id : response.id || null;
                            item.uploaded = true;
                            item.uploading = false;
                            item.progress = 0;
                            item.upload = null;
                            item.file = null;
                            item.url = contentUrl(item.id);
                            item.state = 'original';

                            callback();
                        })
                        .error(function (error) {
                            item.uploaded = false;
                            item.uploading = false;
                            item.progress = 0;
                            item.upload = null;

                            callback();
                        });
                }
            }

            function deleteItemUrl(item) {
                var
                    serverUrl = pipRest.serverUrl(),
                    partyId = $scope.$party ? $scope.$party.id : pipRest.userId();

                return serverUrl + '/api/parties/' + partyId + '/files/' + item.id;
            }

            function deleteItem(item, callback) {
                var control = $scope.control;

                // Avoid double transactions
                if (item.upload) {
                    item.upload.abort();
                    item.upload = null;
                }

                if (item.state != 'deleted')
                    return;

                //pipImageUtils.addHttpHeaders();
                $http['delete'](deleteItemUrl(item))
                .success(function (data) {
                    _.remove(control.items, {pin: item.pin});
                    callback();
                })
                .error(function (data, status) {
                    // Todo: perform a better processing
                    if (data == null) {
                        _.remove(control.items, {pin: item.pin});
                    } else {
                        item.uploaded = false;
                        item.uploading = false;
                        item.progress = 0;
                        item.upload = null;
                    }

                    callback(data);
                });
            }

            function save(successCallback, errorCallback) {
                var control = $scope.control;

                if (control.uploading) {
                    if (errorCallback) errorCallback('ERROR_TRANSACTION_IN_PROGRESS');
                    return;
                }

                control.error = null;
                control.uploading = 0;

                var onItemCallback = function(error) {
                    // Storing only the first error
                    if (error && !control.error) {
                        control.error = error;
                    }

                    control.uploading--;

                    // Finished uploading
                    if (control.uploading == 0) {
                        if (control.error) {
                            if (errorCallback) errorCallback(control.error);
                            else console.error(control.error);
                        } else {
                            setItems();
                            if (successCallback) successCallback();
                        }
                    }
                };

                for (var i = 0; i < control.items.length; i++) {
                    var item = control.items[i];
                    if (item.state == 'added' && !item.error) {
                        control.uploading++;
                        addItem(item, onItemCallback);
                    } else if (item.state == 'deleted') {
                        control.uploading++;
                        deleteItem(item, onItemCallback);
                    }
                }

                // Nothing was uploaded
                if (control.uploading == 0) {
                    if (successCallback) successCallback();
                }
            }

            function abort() {
                var control = $scope.control;

                for (var i = 0; i < control.items.length; i++) {
                    var item = control.items[i];

                    if (item.uploading) {
                        if (item.upload) item.upload.abort();

                        item.uploaded = false;
                        item.uploading = false;
                        item.progress = 0;
                        item.upload = null;
                    }
                }

                // Abort transaction
                control.uploading = 0;
            }

            function readItemLocally(url, file) {
                $scope.control.items.push({
                    pin: itemPin++,
                    id: null,
                    uploading: false,
                    uploaded: false,
                    progress: 0,
                    file: file,
                    url: url,
                    state: 'added'
                });

                $scope.onChange();
            }

            function onSelectClick($files) {
                $control.focus();

                if ($files == null || $files.length == 0)
                    return;
                for (var i = 0; i < $files.length; i++) {
                    var file = $files[i];

                    if (file.type.indexOf('image') > -1) {
                        readItemLocally(file);
                    }
                }
            }

            function onDeleteClick(item) {
                if (item.state == 'added' || item.state == 'copied') {
                    _.remove($scope.control.items, {pin: item.pin});
                } else {
                    item.state = 'deleted';
                }

                $scope.onChange();
            }

            function onKeyDown($event, item) {
                if (item) {
                    if ($event.keyCode == 46 || $event.keyCode == 8) {
                        if (item.state == 'added') {
                            _.remove($scope.control.items, {pin: item.pin});
                        } else {
                            item.state = 'deleted';
                        }

                        $scope.onChange();
                    }
                } else {
                    if ($event.keyCode == 13 || $event.keyCode == 32) {
                        // !! Avoid clash with $apply()
                        setTimeout(function() {
                            $control.trigger('click');
                        }, 0);
                    }
                }
            }

            function onImageLoad($event, item) {
                item.error = false;
                setTimeout(function () {
                    var image = $($event.target);
                    pipImageUtils.setImageMarginCSS({clientWidth: 80, clientHeight: 80}, image);
                }, 250);

                item.loaded = true;
            }

            // On change event
            function onChange() {
                if ($scope.pipChanged) {
                    $scope.pipChanged({
                        $event: { sender: $scope.control },
                        $control: $scope.control
                    });
                }
            }
        }
        
    ); 

})();

