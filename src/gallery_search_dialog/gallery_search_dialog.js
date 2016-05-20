/**
 * @file Camera dialog
 * @copyright Digital Living Software Corp. 2014-2015
 * @todo
 * - Add sample to sampler app
 */

/* global angular, Webcam */

(function () {
    'use strict';

    var thisModule = angular.module('pipGallerySearchDialog',
        ['ngMaterial', 'pipCore', 'pipPictures.Templates', 'pipRest']);

    thisModule.config(function (pipTranslateProvider) {
        pipTranslateProvider.translations('en', {
            'IMAGE_GALLERY': 'Add from image gallery',
            'SEARCH_PICTURES': 'Search for pictures...',
            'IMAGE_START_SEARCH': 'Images will appear here once you start searching'
        });
        pipTranslateProvider.translations('ru', {
            'IMAGE_GALLERY': 'Добавить из галереи изображений',
            'SEARCH_PICTURES': 'Поиск изображений...',
            'IMAGE_START_SEARCH': 'Картинки появятся после начала поиска'
        });
    });

    thisModule.factory('pipGallerySearchDialog',
        function ($mdDialog) {
            return {
                show: function (successCallback, multiple) {
                    $mdDialog.show({
                        templateUrl: 'gallery_search_dialog/gallery_search_dialog.html',
                        clickOutsideToClose: true,
                        controller: 'pipGallerySearchController',
                        locals: {
                            multiple: multiple
                        }
                    }).then(function (result) {
                        if (successCallback) {
                            successCallback(result);
                        }
                    }, function () {

                    });
                }
            };
        });

    thisModule.controller('pipGallerySearchController',
        function ($scope, $rootScope, $timeout, $mdMenu, $mdDialog, $http, pipRest, multiple, pipTransaction) {

            var prevSearch = '',
                url = pipRest.serverUrl() + '/api/images/search',
                images = [];

            $scope.theme = $rootScope.$theme;
            $scope.$serverUrl = pipRest.serverUrl();
            $scope.$search = '';
            $scope.$images = [];
            $scope.transaction = pipTransaction('search', $scope);

            $scope.onSearchClick = onSearchClick;
            $scope.onKeyPress = onKeyPress;
            $scope.onImageClick = onImageClick;
            $scope.onAddClick = onAddClick;
            $scope.onCancelClick = onCancelClick;
            $scope.addButtonDisabled = addButtonDisabled;
            $scope.onStopSearchClick = onStopSearchClick;

            focusSearchText();

            return;

            function onSearchClick() {
                if ($scope.transaction.busy()) return;

                if ($scope.$search == '' || $scope.$search == prevSearch) return;

                prevSearch = $scope.$search;
                $scope.$images = [];
                $scope.stop = null;
                var requestUrl = url + '?q=' + $scope.$search;

                var transactionId = $scope.transaction.begin('ENTERING');
                if (!transactionId) return;

                $http['get'](requestUrl)
                    .success(function (results) {
                        if ($scope.transaction.aborted(transactionId))return;


                        for (var i = 0; i < results.length; i++) {
                            $scope.$images.push({
                                checked: false,
                                url: results[i].link,
                                thumbnail: results[i].thumbnail
                            });
                        }
                        $scope.transaction.end();


                    }).
                    error(function (error) {
                        console.error(error)
                    });
            }

            function onStopSearchClick() {
                $scope.transaction.abort();
                prevSearch = '';
            }

            function onKeyPress($event) {
                if ($event.keyCode === 13)
                    $scope.onSearchClick();
            }

            function onImageClick(image) {
                if ($scope.transaction.busy()) return;

                image.checked = !image.checked;

                if (multiple) {
                    if (image.checked) {
                        images.push(image);
                    } else {
                        _.remove(images, {url: image.url});
                    }
                } else {
                    if (image.checked) {
                        if (images.length > 0) {
                            images[0].checked = false;
                            images[0] = image;
                        } else {
                            images.push(image);
                        }
                    } else {
                        images = [];
                    }
                }
            }

            function onAddClick() {
                if ($scope.transaction.busy()) return;

                var result = [];
                images.forEach(function (image) {
                    if (image.checked)
                        result.push(image.url);
                });
                $mdDialog.hide(result);
            }

            function onCancelClick() {
                $mdDialog.cancel();
            }

            function addButtonDisabled() {
                return images.length == 0 || $scope.transaction.busy();
            }

            function focusSearchText() {
                setTimeout(function () {
                    var element = $('.pip-gallery-search-dialog .search-images');
                    if (element.length > 0)
                        element.focus();
                }, 0);
            }

        }
    );

})();