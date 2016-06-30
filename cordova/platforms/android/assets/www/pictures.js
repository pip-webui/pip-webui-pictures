/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('appPictures.Pictures', []);

    thisModule.controller('PicturesController',
        function($scope) {
            $scope.pictureIds = [];            
            $scope.pictureList = null;

            $scope.onPictureListCreated = function ($event) {
                console.log('Picture list created');
                $scope.pictureList = $event.sender;
            };

            $scope.onSaveListClick = function () {
                $scope.pictureList.save(
                        function () {
                            console.log('Picture list saved');
                        },
                        function (error) {
                            console.error(error);
                        }
                    );
            };

            $scope.onResetListClick = function () {
                $scope.pictureList.reset();
            };


            $scope.pictureContentIds = [
                "56790b4960958daa664fd8c2",
                "56790b4960958daa664fd8c1",
                "56790b4960958daa664fd8c4",
                "56790b4960958daa664fd8c3",
                "56790b4960958daa664fd8c5"
            ];
            $scope.pictureContent = null;

            $scope.onPictureContentCreated = function ($event) {
                console.log('Picture list created');
                $scope.pictureContent = $event.sender;
            };

            $scope.onSaveContentClick = function () {
                $scope.pictureContent.save(
                    function () {
                        console.log('Picture list saved');
                    },
                    function (error) {
                        console.error(error);
                    }
                );
            };

        }
    );

})();
