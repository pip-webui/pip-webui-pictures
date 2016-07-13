
(function (angular) {
    'use strict';

    var thisModule = angular.module('appPictures.Picture', []);
    
    thisModule.controller('PictureController',
        function ($scope) {
            $scope.picture = null;
            $scope.partyId = '56184c24c98f6e504a8965d9';
            $scope.pictureEditId = '56790b4c60958daa664fd8c7';
            $scope.pictureEditDisabled = false;

            $scope.onPictureCreated = function ($event) {
                console.log('Picture created'); // eslint-disable-line
                $scope.picture = $event.sender;
            };

            $scope.onPictureChanged = function () {
                console.log('Picture changed'); // eslint-disable-line
            };

            $scope.onSaveClick = function () {
                $scope.picture.save(
                    // Success callback
                    function () {
                        console.log('Picture saved'); // eslint-disable-line
                    },
                    // Error callback
                    function (error) {
                        console.error(error); // eslint-disable-line
                    }
                );
            };

            $scope.onResetClick = function () {
                $scope.pictureEditId = '56790b4c60958daa664fd8c7';
                $scope.picture.reset();
            };

            $scope.isPictureDisabled = function () {
                return $scope.pictureEditDisabled;
            };
        }
    );

})(window.angular);
