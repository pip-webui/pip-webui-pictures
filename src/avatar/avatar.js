/**
 * @file Avatar control
 * @copyright Digital Living Software Corp. 2014-2015
 * @todo
 * - Improve samples in sampler app
 * - Replace placeholder with default image generated on server
 * - Fix resizing problem
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module("pipAvatar", ['pipCore', 'pipRest', 'pipImageUtils']);

    thisModule.directive('pipAvatar',
        function () {
            return {
                restrict: 'EA',
                scope: false,
                template: '<md-icon></md-icon><img/>'
                + '<div><md-icon class="default_icon" id="icon-film" md-svg-icon="icons:film"></md-icon>'
                + '<md-icon class="default_icon" id="icon-task" md-svg-icon="icons:task"></md-icon>'
                + '<md-icon class="default_icon" id="icon-folder" md-svg-icon="icons:folder"></md-icon></div>',
                controller: 'pipAvatarController'
            }
        }
    );

    thisModule.controller('pipAvatarController',
        function ($scope, $rootScope, $element, $attrs, $parse, pipUtils, pipStrings, pipRest, $http, pipImageUtils) {
            var
                $svg = $element.children('md-icon'),
                $image = $element.children('img'),
                $defaultBlock = $element.children('div'),
                $iconFilm = $element.find('#icon-film'),
                $iconTask = $element.find('#icon-task'),
                $iconFolder = $element.find('#icon-folder'),
                image = null,

                partyIdGetter = $parse($attrs.pipPartyId),
                partyNameGetter = $parse($attrs.pipPartyName),
                typeGetter = $parse($attrs.pipEntityType),
                idGetter = $parse($attrs.pipId),
                urlGetter = $parse($attrs.pipImageUrl),

                colors = pipDataAvatar.getAvatarColors(),
                colorClasses = pipDataAvatar.getColorClasses(),
                entityTypes = pipDataAvatar.getEntityTypes();

            // When image is loaded resize/reposition it
            $image.load(function ($event) {
                image = $($event.target);
                pipImageUtils.setImageMarginCSS($element, image);
            });

            // Add class
            $element.addClass('pip-avatar flex-fixed');

            if ($attrs.ngClass) {
                $scope.$watch($attrs.ngClass, function () {
                    setTimeout(function () {
                        pipImageUtils.setImageMarginCSS($element, image);
                    }, 50);
                });
            }

            // Optimization to avoid binding
            bindControl();

            if (pipUtils.toBoolean($attrs.pipRebindAvatar)) {
                $rootScope.$on('pipPartyAvatarUpdated', refreshAvatar);
            }

            // Also optimization to avoid watch if it is unnecessary
            if (pipUtils.toBoolean($attrs.pipRebind)) {
                $scope.$watch(partyIdGetter, function (newValue, oldValue) {
                    if (oldValue !== newValue)
                        bindControl();
                });

                $scope.$watch(idGetter, function (newValue, oldValue) {
                    if (oldValue !== newValue)
                        bindControl();
                });

                $scope.$watch(urlGetter, function (newValue, oldValue) {
                    if (oldValue !== newValue)
                        bindControl();
                });
            }

            return;

            function refreshAvatar() {
                $iconTask.css('display', 'none');
                $iconFilm.css('display', 'none');
                $iconFolder.css('display', 'none');
                $defaultBlock.css('display', 'none');
                $image.attr('src', '');
                $svg.css('display', 'none');
                $image.css('display', 'inline-block');
                bindControl();
            };

            function bindControl() {
                var
                    partyName = partyNameGetter($scope),
                    partyId = partyIdGetter($scope),
                    id = idGetter($scope),
                    type = typeGetter($scope),
                    transUrl = urlGetter($scope);

                $iconTask.css('display', 'none');
                $iconFilm.css('display', 'none');
                $iconFolder.css('display', 'none');
                $defaultBlock.css('display', 'none');

                // Timestamp to avoid caching images for too long
                var params = {
                    partyId: partyId, 
                    partyName: partyName, 
                    id: id, 
                    type: type, 
                    noRedirect: false, 
                    noDefault: false
                },
                    url = transUrl || pipDataAvatar.getAvatarUrl(params);

// todo abstract this code!!!
                if ((type && id && partyId) || (partyId && partyName) || transUrl) {
                    if (type && id && partyId) {
                        if (type == 'category') return;

                        if (entityTypes[type] == 'goals' || entityTypes[type] == 'areas' ) {
                            $image.attr('src', url);
                            $svg.css('display', 'none');
                            $image.css('display', 'inline-block');
                        } else {
                            $defaultBlock.css('display', 'block');
                            var colorClassIndex = pipStrings.hashCode(id) % colors.length;
                            $element.addClass(colorClasses[colorClassIndex]);
                            switch(type) {
                                case 'vision':
                                    $svg.css('display', 'none');
                                    $iconFilm.css('display', 'inline-block');
                                    $iconTask.css('display', 'none');
                                    $iconFolder.css('display', 'none');
                                    $image.css('display', 'none');
                                    break;
                                case 'event':
                                    $svg.css('display', 'none');
                                    $iconTask.css('display', 'inline-block');
                                    $iconFilm.css('display', 'none');
                                    $iconFolder.css('display', 'none');
                                    $image.css('display', 'none');
                                    break;
                                case 'note':
                                    $svg.css('display', 'none');
                                    $iconFolder.css('display', 'inline-block');
                                    $iconTask.css('display', 'none');
                                    $iconFilm.css('display', 'none');
                                    $image.css('display', 'none');
                                    break;
                            }
                        }
                    } else {
                        $image.attr('src', url);
                        $svg.css('display', 'none');
                        $image.css('display', 'inline-block');
                    }
                }
            };

        }
    );

})();

