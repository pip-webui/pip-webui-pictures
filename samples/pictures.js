(function (angular) {
    'use strict';

    var thisModule = angular.module('appPictures.Pictures', []);

    thisModule.config(function (pipTranslateProvider) {
        pipTranslateProvider.translations('en', {
            PICTURE_LIST_EDIT: 'Picture list edit',
            SAVE: 'Save',
            CLICK_HERE_OR_DRAG_FILES: 'Click here or drag files',
            COPIED_CONTENT: 'Copied content'
        });
        pipTranslateProvider.translations('ru', {
            PICTURE_LIST_EDIT: 'Контрол для редактрования списка изображений',
            SAVE: 'Сохранить',
            CLICK_HERE_OR_DRAG_FILES: 'Нажмите сюда или перетащите файл',
            COPIED_CONTENT: 'Скопированный контент'
        });
    });

    thisModule.controller('PicturesController',
        function ($scope) {
            $scope.pictureIds = [];
            $scope.pictureList = null;

            $scope.onPictureListCreated = function ($event) {
                console.log('Picture list created'); // eslint-disable-line
                $scope.pictureList = $event.sender;
            };

            $scope.onSaveListClick = function () {
                $scope.pictureList.save(
                    function () {
                        console.log('Picture list saved');  // eslint-disable-line
                    },
                    function (error) {
                        console.error(error); // eslint-disable-line
                    }
                );
            };

            $scope.onResetListClick = function () {
                $scope.pictureList.reset();
            };

            $scope.pictureContentIds = [
                '56790b4960958daa664fd8c2',
                '56790b4960958daa664fd8c1',
                '56790b4960958daa664fd8c4',
                '56790b4960958daa664fd8c3',
                '56790b4960958daa664fd8c5'
            ];
            $scope.pictureContent = null;

            $scope.onPictureContentCreated = function ($event) {
                console.log('Picture list created'); // eslint-disable-line
                $scope.pictureContent = $event.sender;
            };

            $scope.onSaveContentClick = function () {
                $scope.pictureContent.save(
                    function () {
                        console.log('Picture list saved'); // eslint-disable-line
                    },
                    function (error) {
                        console.error(error); // eslint-disable-line
                    }
                );
            };

        }
    );
})(window.angular);
