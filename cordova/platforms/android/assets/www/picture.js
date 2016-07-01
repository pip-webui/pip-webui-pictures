/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('appPictures.Picture', []);

    thisModule.controller('PictureController',
        function($scope, $rootScope) {
            $scope.picture = null;
            // picIds
            // "56324968830c5b1b16bfaae5", "56324968830c5b1b16bfaae6", "561f61475be02089631a6d29",
            // "56027b4c04dea5ea7f3409be",


            $scope.pictureEditId = '56790b4c60958daa664fd8c7';
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
                        },
                // Error callback
                        function (error) {
                            console.error(error);
                        }
                    );
            };

            $scope.onResetClick = function () {
                $scope.pictureEditId = '56790b4c60958daa664fd8c7';
                $scope.picture.reset();
            };

            $scope.isPictureDisabled = function () {
                return $scope.pictureEditDisabled;
            }

            console.log('$rootScope', $rootScope);
  }
    );

})();
