(function (angular) {
    'use strict';

    var thisModule = angular.module('appPictures.Avatar', []);

    thisModule.config(function (pipTranslateProvider) {
        pipTranslateProvider.translations('en', {
            PARTY_ENTITY_AVATAR_EDIT: 'Party and entity avatar edit control',
            RESET: 'Reset',
            DISABLED: 'Disabled',
            DISABLE_RESET: 'Disable reset',
            ENABLE_RESET: 'Enable reset',
            ENABLE_DISABLE: 'Enable/disable',
            AVATARS_FOR_USER_WITH_IMAGES: 'Avatars for users with images',
            UPDATE_AVATAR: 'Update avatar',
            AVATARS_FOR_USERS_WITHOUT_IMAGES: 'Avatars for users without images',
            AVATARS_FOR_ENTITIES_WITHOUT_IMAGES: 'Avatars for entities without images',
            AVATARS_FOR_ENTITIES_WITH_IMAGES: 'Avatars for entities with images',
            AVATAR_GIANT: 'Giant avatar'
        });
        pipTranslateProvider.translations('ru', {
            EDIT: 'изменить',
            PARTY_ENTITY_AVATAR_EDIT: 'Контрол изменения аватара пользователя или сущности',
            RESET: 'Сброс',
            DISABLED: 'Отключен',
            DISABLE_RESET: 'Отключить сброс',
            ENABLE_RESET: 'Включить сброс',
            ENABLE_DISABLE: 'Включить/отключить контрол',
            AVATARS_FOR_USER_WITH_IMAGES: 'Аватары пользователей с изображением',
            UPDATE_AVATAR: 'Обновить аватар',
            AVATARS_FOR_USERS_WITHOUT_IMAGES: 'Аватары пользователей без изображений',
            AVATARS_FOR_ENTITIES_WITHOUT_IMAGES: 'Аватары сущностей без изображений',
            AVATARS_FOR_ENTITIES_WITH_IMAGES: 'Аватары сущностей с изображением',
            AVATAR_GIANT: 'Большие аватары'
        });
    });

    thisModule.controller('AvatarController',
        function ($scope, $rootScope, pipUtils) {

            $scope.browser = pipUtils.getBrowser().os;
            $scope.avatars = [
                {
                    id: '56184c24c98f6e504a8965d9',
                    name: 'Зайка'
                },
                {
                    id: '53b63780bf898e927e49325b',
                    name: 'Bill'
                }
            ];

            $scope.avatar1 = {
                id: '56184c24c98f6e504a8965d9',
                name: 'Зайка'
            };

            $scope.isReset = true;

            $scope.onDisableReset = function () {
                $scope.isReset = !$scope.isReset;
            };

            $scope.onChangeID = function () {
                $scope.avatar1.id = $scope.avatar1.id === '53b63780bf898e927e49325b'
                    ? '56184c24c98f6e504a8965d9' : '56184c24c98f6e504a8965d9';
            };

            $scope.isReseting = function () {
                return $scope.isReset;
            };

            $scope.avatarIndex = 0;

            $scope.picture = null;

            $scope.pictureEditId = '56324b11830c5b1b16bfaae8';
            $scope.pictureEditDisabled = false;

            $scope.newAvatars = function () {
                $scope.avatarIndex = $scope.avatarIndex === 0 ? 1 : 0;
            };

            $scope.onPictureCreated = function ($event) {
                console.log('Picture created'); // eslint-disable-line
                $scope.picture = $event.sender;
            };

            $scope.onPictureChanged = function ($control) {
                console.log('Picture changed'); // eslint-disable-line
            };

            $scope.onSaveClick = function () {
                $scope.picture.save(
                    // Success callback
                    function () {
                        console.log('Picture saved'); // eslint-disable-line

                        $rootScope.$broadcast('pipPartyAvatarUpdated');
                    },
                    // Error callback
                    function (error) {
                        console.error(error); // eslint-disable-line
                    }
                );
            };

            $scope.onResetClick = function () {
                $scope.picture.reset();
            };
        }
    );

    thisModule.controller('partyAvatarController',
        function ($scope, $rootScope) {
            $scope.picture = null;

            $scope.pictureEditId = '56324b11830c5b1b16bfaae8';
            $scope.pictureEditDisabled = false;

            $scope.onPictureCreated = function ($event) {
                console.log('Picture created'); // eslint-disable-line
                $scope.picture = $event.sender;
            };

            $scope.onPictureChanged = function ($control) {
                console.log('Picture changed'); // eslint-disable-line
            };

            $scope.onSaveClick = function () {
                $scope.picture.save(
                    // Success callback
                    function () {
                        console.log('Picture saved'); // eslint-disable-line
                        $rootScope.$broadcast('pipPartyAvatarUpdated');
                    },
                    // Error callback
                    function (error) {
                        console.error(error); // eslint-disable-line
                    }
                );
            };

            $scope.onResetClick = function () {
                console.log('Picture reset'); // eslint-disable-line
                $scope.picture.reset();
            };
        }
    );

    thisModule.controller('entityAvatarController',
        function ($scope, $rootScope) {
            $scope.picture = null;

            $scope.pictureEditId = '56324b11830c5b1b16bfaae8';
            $scope.pictureEditDisabled = false;

            $scope.onPictureCreated = function ($event) {
                console.log('Picture created'); // eslint-disable-line
                $scope.picture = $event.sender;
            };

            $scope.onPictureChanged = function ($control) {
                console.log('Picture changed'); // eslint-disable-line
            };

            $scope.onSaveClick = function () {
                $scope.picture.save(
                    // Success callback
                    function () {
                        console.log('Picture saved'); // eslint-disable-line
                        $rootScope.$broadcast('pipPartyAvatarUpdated');
                    },
                    // Error callback
                    function (error) {
                        console.error(error); // eslint-disable-line
                    }
                );
            };

            $scope.onResetClick = function () {
                $scope.picture.reset();
            };
        }
    );

})(window.angular);

