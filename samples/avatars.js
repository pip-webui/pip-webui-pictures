(function (angular) {
    'use strict';

    var thisModule = angular.module('appPictures.Avatar', []);

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

