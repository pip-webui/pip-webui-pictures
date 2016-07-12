
(function (angular) {
    'use strict';

    var thisModule = angular.module('appPictures',
        [
            'pipSampleConfig',
            // 3rd Party Modules
            'ui.router', 'ui.utils', 'ngResource', 'ngAria', 'ngCookies', 'ngSanitize', 'ngMessages',
            'ngMaterial', 'wu.masonry', 'LocalStorageModule', 'angularFileUpload', 'ngAnimate',
            // Modules from WebUI Framework
            'pipCore', 'pipRest', 'pipData', 'pipBasicControls', 'pipPictures',
            // testing data modules (have some data for example)
            'pipWebuiTests',
            // Sample Application Modules
            'appPictures.Collage', 'appPictures.CollageResize',
            'appPictures.Picture', 'appPictures.Pictures', 'appPictures.Avatar'
        ]
    );

    thisModule.controller('AppController',
        function ($scope, pipAppBar, $timeout, $state) {
            $scope.pages = [
                {
                    title: 'Avatar',
                    state: 'avatar',
                    url: '/avatar',
                    controller: 'AvatarController',
                    templateUrl: 'avatars.html'
                },
                {
                    title: 'Collage',
                    state: 'collage',
                    url: '/collage',
                    controller: 'CollageController',
                    templateUrl: 'collage.html'
                },
                {
                    title: 'Collage Resizing',
                    state: 'collage_resize',
                    url: '/collage_resize',
                    controller: 'CollageResizeController',
                    templateUrl: 'collage_resize.html'
                },
                /* {
                    title: 'Picture',
                    state: 'picture',
                    url: '/picture',
                    controller: 'PictureController',
                    templateUrl: 'picture.html'
                }, */
                {
                    title: 'Picture List',
                    state: 'pictures',
                    url: '/pictures',
                    controller: 'PicturesController',
                    templateUrl: 'pictures.html'
                }
            ];

            $scope.selected = {};
            $timeout(function () {
                $scope.selected.pageIndex = _.findIndex($scope.pages, {state: $state.current.name});
            });

            pipAppBar.showMenuNavIcon();
            pipAppBar.showLanguage();
            pipAppBar.showTitleText('PICTURE_CONTROLS');

            $scope.onNavigationSelect = function (stateName) {
                if ($state.current.name !== stateName) {
                    $state.go(stateName);
                }
            };

            $scope.onDropdownSelect = function (obj) {
                if ($state.current.name !== obj.state) {
                    $state.go(obj.state);
                }
            };

            $scope.isEntryPage = function () {
                return $state.current.name === 'signin' || $state.current.name === 'signup' ||
                    $state.current.name === 'recover_password' || $state.current.name === 'post_signup';
            };

        }
    );
})(window.angular);
