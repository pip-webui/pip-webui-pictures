/* global angular */
/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('appPictures.Avatar', []);

    thisModule.controller('AvatarController',
        function($scope, $rootScope, pipUtils) {

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

            $scope.onDisableReset = function() {
                $scope.isReset = !$scope.isReset;
            };

            $scope.onChangeID = function() {
                if ($scope.avatar1.id == '53b63780bf898e927e49325b') $scope.avatar1.id = '56184c24c98f6e504a8965d9';
                else $scope.avatar1.id='56184c24c98f6e504a8965d9';
            };

            $scope.isReseting = function() {
                return $scope.isReset;
            };

            $scope.avatarIndex = 0;

            $scope.picture = null;

            $scope.pictureEditId = '56324b11830c5b1b16bfaae8';
            $scope.pictureEditDisabled = false;

            $scope.newAvatars = function() {
                $scope.avatarIndex = $scope.avatarIndex == 0 ? 1: 0;
            };

            $scope.onPictureCreated = function ($event) {
                console.log('Picture created');
                $scope.picture = $event.sender;
            };

            $scope.onPictureChanged = function ($control) {
                console.log('Picture changed');
            };

            $scope.onSaveClick = function () {
                $scope.picture.save(
                    // Success callback
                    function () {
                        console.log('Picture saved');

                        $rootScope.$broadcast('pipPartyAvatarUpdated');
                    },
                    // Error callback
                    function (error) {
                        console.error(error);
                    }
                );
            };

            $scope.onResetClick = function () {
                $scope.picture.reset();
            };

            console.log('$rootScope', $rootScope);
        }
    );

    thisModule.controller('partyAvatarController',
        function($scope, $rootScope) {
            $scope.picture = null;

            $scope.pictureEditId = '56324b11830c5b1b16bfaae8';
            $scope.pictureEditDisabled = false;

            $scope.onPictureCreated = function ($event) {
                console.log('Picture created');
                $scope.picture = $event.sender;
            };

            $scope.onPictureChanged = function ($control) {
                console.log('Picture changed');
            };

            $scope.onSaveClick = function () {
                $scope.picture.save(
                    // Success callback
                    function () {
                        console.log('Picture saved');
                        $rootScope.$broadcast('pipPartyAvatarUpdated');
                    },
                    // Error callback
                    function (error) {
                        console.error(error);
                    }
                );
            };

            $scope.onResetClick = function () {
                console.log('Picture reset');
                $scope.picture.reset();
            };

            console.log('$rootScope', $rootScope);
        }
    );

    thisModule.controller('entityAvatarController',
        function($scope, $rootScope) {
            $scope.picture = null;

            $scope.pictureEditId = '56324b11830c5b1b16bfaae8';
            $scope.pictureEditDisabled = false;

            $scope.onPictureCreated = function ($event) {
                console.log('Picture created');
                $scope.picture = $event.sender;
            };

            $scope.onPictureChanged = function ($control) {
                console.log('Picture changed');
            };

            $scope.onSaveClick = function () {
                $scope.picture.save(
                    // Success callback
                    function () {
                        console.log('Picture saved');
                        $rootScope.$broadcast('pipPartyAvatarUpdated');
                    },
                    // Error callback
                    function (error) {
                        console.error(error);
                    }
                );
            };

            $scope.onResetClick = function () {
                $scope.picture.reset();
            };

            console.log('$rootScope', $rootScope);
        }
    );

})();

