/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('appPictures.Collage', []);

    thisModule.controller('CollageController',
        function($scope) {
            $scope.srcs_1 = ['images/square.jpg'];
            $scope.srcs_2 = ['images/square.jpg', 'images/vertical.jpg'];
            $scope.srcs_3 = ['images/square.jpg', 'images/vertical.jpg', 'images/horizontal.jpg'];
            $scope.srcs_4 = ['images/square.jpg', 'images/vertical.jpg', 'images/horizontal.jpg', 'images/nonexisting.jpg'];
            $scope.srcs_5 = [
                'images/square.jpg', 'images/vertical.jpg', 'images/horizontal.jpg', 'images/nonexisting.jpg',
                'images/square.jpg'
            ];
            $scope.srcs_6 = [
                'images/square.jpg', 'images/vertical.jpg', 'images/horizontal.jpg', 'images/nonexisting.jpg',
                'images/square.jpg', 'images/vertical.jpg'
            ];
            $scope.srcs_7 = [
                'images/square.jpg', 'images/vertical.jpg', 'images/horizontal.jpg', 'images/nonexisting.jpg',
                'images/square.jpg', 'images/vertical.jpg', 'images/horizontal.jpg'
            ];
            $scope.srcs_8 = [
                'images/square.jpg', 'images/vertical.jpg', 'images/horizontal.jpg', 'images/nonexisting.jpg',
                'images/square.jpg', 'images/vertical.jpg', 'images/horizontal.jpg', 'images/nonexisting.jpg'
            ];
            $scope.srcs_9 = [
                'images/square.jpg', 'images/vertical.jpg', 'images/horizontal.jpg', 'images/nonexisting.jpg',
                'images/square.jpg', 'images/vertical.jpg', 'images/horizontal.jpg', 'images/nonexisting.jpg',
                'images/square.jpg'
            ];
            $scope.srcs_10 = [
                'images/square.jpg', 'images/vertical.jpg', 'images/horizontal.jpg', 'images/nonexisting.jpg',
                'images/square.jpg', 'images/vertical.jpg', 'images/horizontal.jpg', 'images/nonexisting.jpg',
                'images/square.jpg', 'images/vertical.jpg'
            ];

            $scope.pids_1 = [
                "56790b4960958daa664fd8c2"
            ];
            $scope.pids_2 = [
                "56790b4960958daa664fd8c2",
                "56790b4960958daa664fd8c1"
            ];
            $scope.pids_3 = [
                "56790b4960958daa664fd8c2",
                "56790b4960958daa664fd8c1",
                "56790b4960958daa664fd8c4"
            ];
            $scope.pids_4 = [
                "56790b4960958daa664fd8c2",
                "56790b4960958daa664fd8c1",
                "56790b4960958daa664fd8c4",
                "56790b4960958daa664fd8c3"
            ];
            $scope.pids_7 = [
                "56790b4960958daa664fd8c2",
                "56790b4960958daa664fd8c1",
                "56790b4960958daa664fd8c4",
                "56790b4960958daa664fd8c3",
                "56790b4960958daa664fd8c5",
                "56790b4960958daa664fd8c6",
                "56790b4c60958daa664fd8c7"
            ];
            $scope.pids_18 = [
                "56790b4960958daa664fd8c2",
                "56790b4960958daa664fd8c1",
                "56790b4960958daa664fd8c4",
                "56790b4960958daa664fd8c3",
                "56790b4960958daa664fd8c5",
                "56790b4960958daa664fd8c6",
                "56790b4c60958daa664fd8c7",
                "56790b4c60958daa664fd8c8",
                "56790b4e60958daa664fd8c9",
                "56790b4f60958daa664fd8ca",
                "56790b4f60958daa664fd8cb",
                "56790b4f60958daa664fd8cc",
                "56790b5060958daa664fd8cd",
                "56790b5160958daa664fd8ce",
                "56790b5160958daa664fd8cf",
                "56790b5260958daa664fd8d0",
                "567911f060958daa664fd8ff",
                "567911f060958daa664fd8fe"
            ];
        }
    );

})();
