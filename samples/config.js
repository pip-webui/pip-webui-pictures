/**
 * @file Global configuration for sample application
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular) {
    'use strict';

    var thisModule = angular.module('pipSampleConfig', ['pipRest.State', 'pipRest', 'pipSideNav',
        'pipAppBar']);

    // Configure application services before start
    thisModule.config(
        function ($mdThemingProvider, $stateProvider, $urlRouterProvider, pipAuthStateProvider, pipTranslateProvider,
                  pipRestProvider, pipSideNavProvider, pipAppBarProvider, $mdIconProvider) {

            var content = [
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
                {
                    title: 'Picture',
                    state: 'picture',
                    url: '/picture',
                    controller: 'PictureController',
                    templateUrl: 'picture.html'
                },
                {
                    title: 'Picture List',
                    state: 'pictures',
                    url: '/pictures',
                    controller: 'PicturesController',
                    templateUrl: 'pictures.html'
                }
                ], contentItem, i;

            $mdIconProvider.iconSet('icons', 'images/icons.svg', 512);

            // String translations
            pipTranslateProvider.translations('en', {
                PICTURE_CONTROLS: 'Picture Controls',
                CODE: 'Code',
                SAMPLE: 'sample'
            });

            pipTranslateProvider.translations('ru', {
                PICTURE_CONTROLS: 'Контролы для работы с изображениями',
                CODE: 'Код',
                SAMPLE: 'пример'
            });

            pipAuthStateProvider.unauthorizedState('signin');
            pipAuthStateProvider.authorizedState('avatar');

            for (i = 0; i < content.length; i++) {
                contentItem = content[i];
                $stateProvider.state(contentItem.state, contentItem);
            }

            $urlRouterProvider.otherwise(function ($injector, $location) {
                if ($location.$$path === '') {
                    return '/signin';
                }

                return '/avatar';
            });

            // Configure navigation menu
            pipSideNavProvider.sections([
                {
                    links: [{title: 'PICTURE_CONTROLS', url: '/avatar'}]
                },
                {
                    links: [{title: 'SIGNOUT', url: '/signout'}]
                }
            ]);
        }
    );

})(window.angular);

