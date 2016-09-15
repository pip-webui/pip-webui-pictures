/**
 * @file Areas data cache
 * @copyright Digital Living Software Corp. 2014-2015
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipImageUtils', []);

    thisModule.service('pipImageUtils',
        function($http, pipStrings, $rootScope, pipRest) {

// todo to data_avatar
            var
//                 colorClasses = [
//                     'pip-avatar-color-0', 'pip-avatar-color-1', 'pip-avatar-color-2', 'pip-avatar-color-3',
//                     'pip-avatar-color-4', 'pip-avatar-color-5', 'pip-avatar-color-6', 'pip-avatar-color-7',
//                     'pip-avatar-color-8', 'pip-avatar-color-9', 'pip-avatar-color-10', 'pip-avatar-color-11',
//                     'pip-avatar-color-12', 'pip-avatar-color-13', 'pip-avatar-color-14', 'pip-avatar-color-15'
//                 ],
// // todo to data_avatar
//                 colors = [
//                     'rgba(239,83,80,1)', 'rgba(236,64,122,1)', 'rgba(171,71,188,1)',
//                     'rgba(126,87,194,1)', 'rgba(92,107,192,1)', 'rgba(3,169,244,1)',
//                     'rgba(0,188,212,1)', 'rgba(0,150,136,1)', 'rgba(76,175,80,1)',
//                     'rgba(139,195,74,1)', 'rgba(205,220,57,1)', 'rgba(255,193,7,1)',
//                     'rgba(255,152,0,1)', 'rgba(255,87,34,1)', 'rgba(121,85,72,1)',
//                     'rgba(96,125,139,1)'
//                 ],
// // todo to data_avatar
//                 entityTypes = {
//                     goal: 'goals',
//                     objective: 'goals',
//                     dream: 'goals',
//                     accomplishment: 'goals',
//                     area: 'areas',
//                     overall: 'visions',
//                     vision: 'visions',
//                     event: 'events',
//                     instance: 'events'
//                 },

                collageSchemes = [
                    // 1
                    [
                        { flex: 100, fullWidth: true, fullHeight: true }
                    ],
                    // 2
                    [
                        {
                            group: true,
                            layout: 'row',
                            flex: 100,
                            fullHeight: true,
                            children: [
                                { flex: 50, fullHeight: true, rightPadding: true },
                                { flex: 50, fullHeight: true, leftPadding: true }
                            ]
                        }
                    ],
                    // 3
                    [
                        {
                            group: true,
                            layout: 'row',
                            flex: 100,
                            fullHeight: true,
                            children: [
                                { flex: 33, fullHeight: true, rightPadding: true },
                                { flex: 33, fullHeight: true, leftPadding: true, rightPadding: true },
                                { flex: 33, fullHeight: true, leftPadding: true }
                            ]
                        },
                        {
                            group: true,
                            layout: 'row',
                            flex: 100,
                            fullHeight: true,
                            children: [
                                { flex: 50, fullHeight: true, rightPadding: true },
                                {
                                    group: true,
                                    layout: 'column',
                                    flex: 50,
                                    fullHeight: true,
                                    children: [
                                        { flex: 50, leftPadding: true, bottomPadding: true },
                                        { flex: 50, leftPadding: true, topPadding: true }
                                    ]
                                }
                            ]
                        },
                        {
                            group: true,
                            layout: 'row',
                            flex: 100,
                            fullHeight: true,
                            children: [
                                { flex: 70, fullHeight: true, rightPadding: true },
                                {
                                    group: true,
                                    layout: 'column',
                                    flex: 30,
                                    fullHeight: true,
                                    children: [
                                        { flex: 50, leftPadding: true, bottomPadding: true },
                                        { flex: 50, leftPadding: true, topPadding: true }
                                    ]
                                }
                            ]
                        },
                        {
                            group: true,
                            layout: 'column',
                            flex: 100,
                            fullHeight: true,
                            children: [
                                { flex: 50, fullWidth: true, bottomPadding: true },
                                {
                                    group: true,
                                    layout: 'row',
                                    flex: 50,
                                    fullHeight: true,
                                    children: [
                                        { flex: 50, rightPadding: true, topPadding: true },
                                        { flex: 50, leftPadding: true, topPadding: true }
                                    ]
                                }
                            ]
                        }
                    ],
                    // 4
                    [
                        {
                            group: true,
                            layout: 'column',
                            flex: 100,
                            fullHeight: true,
                            children: [
                                {
                                    group: true,
                                    layout: 'row',
                                    flex: 50,
                                    fullHeight: true,
                                    children: [
                                        { flex: 50, fullWidth: true, rightPadding: true, bottomPadding: true },
                                        { flex: 50, fullWidth: true, leftPadding: true, bottomPadding: true }
                                    ]
                                },
                                {
                                    group: true,
                                    layout: 'row',
                                    flex: 50,
                                    fullHeight: true,
                                    children: [
                                        { flex: 50, fullWidth: true, rightPadding: true, topPadding: true },
                                        { flex: 50, fullWidth: true, leftPadding: true, topPadding: true }
                                    ]
                                }
                            ]
                        },
                        {
                            group: true,
                            layout: 'row',
                            flex: 100,
                            fullHeight: true,
                            children: [
                                { flex: 50, fullWidth: true, rightPadding: true },
                                {
                                    group: true,
                                    layout: 'column',
                                    flex: 50,
                                    fullHeight: true,
                                    children: [
                                        { flex: 50, fullWidth: true, leftPadding: true, bottomPadding: true },
                                        {
                                            group: true,
                                            layout: 'row',
                                            flex: 50,
                                            fullHeight: true,
                                            children: [
                                                { flex: 50, fullWidth: true, leftPadding: true, rightPadding: true, topPadding: true },
                                                { flex: 50, fullWidth: true, leftPadding: true, topPadding: true }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            group: true,
                            layout: 'row',
                            flex: 100,
                            fullHeight: true,
                            children: [
                                { flex: 30, fullWidth: true, rightPadding: true },
                                {
                                    group: true,
                                    layout: 'column',
                                    flex: 70,
                                    fullHeight: true,
                                    children: [
                                        { flex: 50, fullWidth: true, leftPadding: true, bottomPadding: true },
                                        {
                                            group: true,
                                            layout: 'row',
                                            flex: 50,
                                            fullHeight: true,
                                            children: [
                                                { flex: 50, fullWidth: true, leftPadding: true, rightPadding: true, topPadding: true },
                                                { flex: 50, fullWidth: true, leftPadding: true, topPadding: true }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            group: true,
                            layout: 'column',
                            flex: 100,
                            fullHeight: true,
                            children: [
                                {
                                    group: true,
                                    layout: 'row',
                                    flex: 50,
                                    fullHeight: true,
                                    children: [
                                        { flex: 100, fullWidth: true, bottomPadding: true }
                                    ]
                                },
                                {
                                    group: true,
                                    layout: 'row',
                                    flex: 50,
                                    fullHeight: true,
                                    children: [
                                        { flex: 33, fullWidth: true, rightPadding: true, topPadding: true },
                                        { flex: 33, fullWidth: true, leftPadding: true, rightPadding: true, topPadding: true },
                                        { flex: 33, fullWidth: true, leftPadding: true, topPadding: true }
                                    ]
                                }
                            ]
                        }
                    ],
                    // 5
                    [
                        {
                            group: true,
                            layout: 'column',
                            flex: 100,
                            fullHeight: true,
                            children: [
                                {
                                    group: true,
                                    layout: 'row',
                                    flex: 50,
                                    fullHeight: true,
                                    children: [
                                        { flex: 50, fullWidth: true, rightPadding: true, bottomPadding: true },
                                        { flex: 50, fullWidth: true, leftPadding: true, bottomPadding: true }
                                    ]
                                },
                                {
                                    group: true,
                                    layout: 'row',
                                    flex: 50,
                                    fullHeight: true,
                                    children: [
                                        { flex: 33, fullWidth: true, rightPadding: true, topPadding: true },
                                        { flex: 33, fullWidth: true, leftPadding: true, rightPadding: true, topPadding: true },
                                        { flex: 33, fullWidth: true, leftPadding: true, topPadding: true }
                                    ]
                                }
                            ]
                        },
                        {
                            group: true,
                            layout: 'row',
                            flex: 100,
                            fullHeight: true,
                            children: [
                                { flex: 50, fullWidth: true, rightPadding: true },
                                {
                                    group: true,
                                    layout: 'column',
                                    flex: 50,
                                    fullHeight: true,
                                    children: [
                                        {
                                            group: true,
                                            layout: 'row',
                                            flex: 50,
                                            fullHeight: true,
                                            children: [
                                                { flex: 50, fullWidth: true, leftPadding: true, rightPadding: true, bottomPadding: true },
                                                { flex: 50, fullWidth: true, leftPadding: true, bottomPadding: true }
                                            ]
                                        },
                                        {
                                            group: true,
                                            layout: 'row',
                                            flex: 50,
                                            fullHeight: true,
                                            children: [
                                                { flex: 50, fullWidth: true, leftPadding: true, rightPadding: true, topPadding: true },
                                                { flex: 50, fullWidth: true, leftPadding: true, topPadding: true }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            group: true,
                            layout: 'row',
                            flex: 100,
                            fullHeight: true,
                            children: [
                                { flex: 33, fullWidth: true, rightPadding: true },
                                {
                                    group: true,
                                    layout: 'column',
                                    flex: 67,
                                    fullHeight: true,
                                    children: [
                                        {
                                            group: true,
                                            layout: 'row',
                                            flex: 50,
                                            fullHeight: true,
                                            children: [
                                                { flex: 50, fullWidth: true, leftPadding: true, rightPadding: true, bottomPadding: true },
                                                { flex: 50, fullWidth: true, leftPadding: true, bottomPadding: true }
                                            ]
                                        },
                                        {
                                            group: true,
                                            layout: 'row',
                                            flex: 50,
                                            fullHeight: true,
                                            children: [
                                                { flex: 50, fullWidth: true, leftPadding: true, rightPadding: true, topPadding: true },
                                                { flex: 50, fullWidth: true, leftPadding: true, topPadding: true }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            group: true,
                            layout: 'column',
                            flex: 100,
                            fullHeight: true,
                            children: [
                                {
                                    group: true,
                                    layout: 'row',
                                    flex: 50,
                                    fullHeight: true,
                                    children: [
                                        { flex: 100, fullWidth: true, bottomPadding: true }
                                    ]
                                },
                                {
                                    group: true,
                                    layout: 'row',
                                    flex: 50,
                                    fullHeight: true,
                                    children: [
                                        { flex: 25, fullWidth: true, rightPadding: true, topPadding: true },
                                        { flex: 25, fullWidth: true, leftPadding: true, rightPadding: true, topPadding: true },
                                        { flex: 25, fullWidth: true, leftPadding: true, rightPadding: true, topPadding: true },
                                        { flex: 25, fullWidth: true, leftPadding: true, topPadding: true }
                                    ]
                                }
                            ]
                        }
                    ],
                    // 6
                    [
                        {
                            group: true,
                            layout: 'column',
                            flex: 100,
                            fullHeight: true,
                            children: [
                                {
                                    group: true,
                                    layout: 'row',
                                    flex: 50,
                                    fullHeight: true,
                                    children: [
                                        { flex: 33, fullWidth: true, rightPadding: true, bottomPadding: true },
                                        { flex: 33, fullWidth: true, leftPadding: true, rightPadding: true, bottomPadding: true },
                                        { flex: 33, fullWidth: true, leftPadding: true, bottomPadding: true }
                                    ]
                                },
                                {
                                    group: true,
                                    layout: 'row',
                                    flex: 50,
                                    fullHeight: true,
                                    children: [
                                        { flex: 33, fullWidth: true, rightPadding: true, topPadding: true },
                                        { flex: 33, fullWidth: true, leftPadding: true, rightPadding: true, topPadding: true },
                                        { flex: 33, fullWidth: true, leftPadding: true, topPadding: true }
                                    ]
                                }
                            ]
                        },
                        {
                            group: true,
                            layout: 'column',
                            flex: 100,
                            fullHeight: true,
                            children: [
                                {
                                    group: true,
                                    layout: 'row',
                                    flex: 50,
                                    fullHeight: true,
                                    children: [
                                        { flex: 50, fullWidth: true, rightPadding: true, bottomPadding: true },
                                        { flex: 25, fullWidth: true, leftPadding: true, rightPadding: true, bottomPadding: true },
                                        { flex: 25, fullWidth: true, leftPadding: true, bottomPadding: true }
                                    ]
                                },
                                {
                                    group: true,
                                    layout: 'row',
                                    flex: 50,
                                    fullHeight: true,
                                    children: [
                                        { flex: 50, fullWidth: true, rightPadding: true, topPadding: true },
                                        { flex: 25, fullWidth: true, leftPadding: true, rightPadding: true, topPadding: true },
                                        { flex: 25, fullWidth: true, leftPadding: true, topPadding: true }
                                    ]
                                }
                            ]
                        },
                        {
                            group: true,
                            layout: 'row',
                            flex: 100,
                            fullHeight: true,
                            children: [
                                { flex: 33, fullWidth: true, rightPadding: true },
                                {
                                    group: true,
                                    layout: 'column',
                                    flex: 67,
                                    fullHeight: true,
                                    children: [
                                        {
                                            group: true,
                                            layout: 'row',
                                            flex: 50,
                                            fullHeight: true,
                                            children: [
                                                { flex: 50, fullWidth: true, leftPadding: true, rightPadding: true, bottomPadding: true },
                                                { flex: 50, fullWidth: true, leftPadding: true, bottomPadding: true }
                                            ]
                                        },
                                        {
                                            group: true,
                                            layout: 'row',
                                            flex: 50,
                                            fullHeight: true,
                                            children: [
                                                { flex: 33, fullWidth: true, leftPadding: true, rightPadding: true, topPadding: true },
                                                { flex: 33, fullWidth: true, leftPadding: true, rightPadding: true, topPadding: true },
                                                { flex: 33, fullWidth: true, leftPadding: true, topPadding: true }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            group: true,
                            layout: 'column',
                            flex: 100,
                            fullHeight: true,
                            children: [
                                {
                                    group: true,
                                    layout: 'row',
                                    flex: 50,
                                    fullHeight: true,
                                    children: [
                                        { flex: 50, fullWidth: true, rightPadding: true, bottomPadding: true },
                                        { flex: 50, fullWidth: true, leftPadding: true, bottomPadding: true }
                                    ]
                                },
                                {
                                    group: true,
                                    layout: 'row',
                                    flex: 50,
                                    fullHeight: true,
                                    children: [
                                        { flex: 25, fullWidth: true, rightPadding: true, topPadding: true },
                                        { flex: 25, fullWidth: true, leftPadding: true, rightPadding: true, topPadding: true },
                                        { flex: 25, fullWidth: true, leftPadding: true, rightPadding: true, topPadding: true },
                                        { flex: 25, fullWidth: true, leftPadding: true, topPadding: true }
                                    ]
                                }
                            ]
                        }
                    ],
                    // 7
                    [
                        {
                            group: true,
                            layout: 'column',
                            flex: 100,
                            fullHeight: true,
                            children: [
                                {
                                    group: true,
                                    layout: 'row',
                                    flex: 50,
                                    fullHeight: true,
                                    children: [
                                        { flex: 33, fullWidth: true, rightPadding: true, bottomPadding: true },
                                        { flex: 33, fullWidth: true, leftPadding: true, rightPadding: true, bottomPadding: true },
                                        { flex: 33, fullWidth: true, leftPadding: true, bottomPadding: true }
                                    ]
                                },
                                {
                                    group: true,
                                    layout: 'row',
                                    flex: 50,
                                    fullHeight: true,
                                    children: [
                                        { flex: 25, fullWidth: true, rightPadding: true, topPadding: true },
                                        { flex: 25, fullWidth: true, leftPadding: true, rightPadding: true, topPadding: true },
                                        { flex: 25, fullWidth: true, leftPadding: true, rightPadding: true, topPadding: true },
                                        { flex: 25, fullWidth: true, leftPadding: true, topPadding: true }
                                    ]
                                }
                            ]
                        },
                        {
                            group: true,
                            layout: 'column',
                            flex: 100,
                            fullHeight: true,
                            children: [
                                {
                                    group: true,
                                    layout: 'row',
                                    flex: 50,
                                    fullHeight: true,
                                    children: [
                                        { flex: 50, fullWidth: true, rightPadding: true, bottomPadding: true },
                                        { flex: 25, fullWidth: true, leftPadding: true, rightPadding: true, bottomPadding: true },
                                        { flex: 25, fullWidth: true, leftPadding: true, bottomPadding: true }
                                    ]
                                },
                                {
                                    group: true,
                                    layout: 'row',
                                    flex: 50,
                                    fullHeight: true,
                                    children: [
                                        { flex: 25, fullWidth: true, rightPadding: true, topPadding: true },
                                        { flex: 25, fullWidth: true, leftPadding: true, rightPadding: true, topPadding: true },
                                        { flex: 25, fullWidth: true, leftPadding: true, rightPadding: true, topPadding: true },
                                        { flex: 25, fullWidth: true, leftPadding: true, topPadding: true }
                                    ]
                                }
                            ]
                        },
                        {
                            group: true,
                            layout: 'row',
                            flex: 100,
                            fullHeight: true,
                            children: [
                                { flex: 25, fullWidth: true, rightPadding: true },
                                {
                                    group: true,
                                    layout: 'column',
                                    flex: 75,
                                    fullHeight: true,
                                    children: [
                                        {
                                            group: true,
                                            layout: 'row',
                                            flex: 50,
                                            fullHeight: true,
                                            children: [
                                                { flex: 33, fullWidth: true, leftPadding: true, rightPadding: true, bottomPadding: true },
                                                { flex: 33, fullWidth: true, leftPadding: true, rightPadding: true, bottomPadding: true },
                                                { flex: 33, fullWidth: true, leftPadding: true, bottomPadding: true }
                                            ]
                                        },
                                        {
                                            group: true,
                                            layout: 'row',
                                            flex: 50,
                                            fullHeight: true,
                                            children: [
                                                { flex: 33, fullWidth: true, leftPadding: true, rightPadding: true, topPadding: true },
                                                { flex: 33, fullWidth: true, leftPadding: true, rightPadding: true, topPadding: true },
                                                { flex: 33, fullWidth: true, leftPadding: true, topPadding: true }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    // 8
                    [
                        {
                            group: true,
                            layout: 'column',
                            flex: 100,
                            fullHeight: true,
                            fullWidth: true,
                            children: [
                                {
                                    group: true,
                                    layout: 'row',
                                    flex: 50,
                                    fullWidth: true,
                                    children: [
                                        { flex: 25, fullWidth: true, rightPadding: true, bottomPadding: true },
                                        { flex: 25, fullWidth: true, leftPadding: true, rightPadding: true, bottomPadding: true },
                                        { flex: 25, fullWidth: true, leftPadding: true, rightPadding: true, bottomPadding: true },
                                        { flex: 25, fullWidth: true, leftPadding: true, bottomPadding: true }
                                    ]
                                },
                                {
                                    group: true,
                                    layout: 'row',
                                    flex: 50,
                                    fullWidth: true,
                                    children: [
                                        { flex: 25, fullWidth: true, rightPadding: true, topPadding: true },
                                        { flex: 25, fullWidth: true, leftPadding: true, rightPadding: true, topPadding: true },
                                        { flex: 25, fullWidth: true, leftPadding: true, rightPadding: true, topPadding: true },
                                        { flex: 25, fullWidth: true, leftPadding: true, topPadding: true }
                                    ]
                                }
                            ]
                        }
                    ]
                ];


            return {
                // getColorClasses: getColorClasses,
                // getAvatarColors: getAvatarColors, // todo to data_avatar
                // getEntityTypes: getEntityTypes,
                setErrorImageCSS: setErrorImageCSS,
                setImageMarginCSS: setImageMarginCSS,
                setIconMarginCSS: setIconMarginCSS,
                // getAvatarUrl: getAvatarUrl,
                bindFile: bindFile,
                getCollageSchemes: getCollageSchemes
            };
// // todo to data_avatar
//             function getEntityTypes() {
//                 return entityTypes;
//             };
// // todo to data_avatar
//             function getColorClasses() {
//                 return colorClasses;
//             };
// // todo to data_avatar
//             function getAvatarColors() {
//                 return colors;
//             };

            function getCollageSchemes() {
                return collageSchemes;
            };

// todo to data_avatar
            // function getAvatarUrl(partyId, partyName, id, type, noRedirect, noDefault) {
            //     var
            //         timestamp = Math.floor(new Date().getTime() / 1000) * 1000,
            //         colorClassIndex = pipStrings.hashCode(id) % colors.length,
            //         chr = null,
            //         url = null, default_template = '',
            //         serverUrl = pipRest.serverUrl();

            //     noRedirect = noRedirect && noRedirect === true ? '&no_redirect=true' : '';
            //     if ((type && id && partyId) || (partyId)) {
            //         if (type && id && partyId) {
            //             if (type == 'category') return;
            //             if (!noDefault) default_template = 'default_template='
            //             + type + '&bg=' + colors[colorClassIndex]
            //             + '&fg=white&';
            //             if (entityTypes[type] == 'goals' || entityTypes[type] == 'areas' ) {
            //                 url = serverUrl + '/api/parties/' + partyId + '/' + entityTypes[type]
            //                 + '/' + id + '/avatar?' + default_template + 'timestamp=' + timestamp
            //                 + '&obj_id=' + id + noRedirect;
            //             }
            //         } else if (partyId && partyName) {
            //             colorClassIndex = pipStrings.hashCode(partyId) % colors.length;
            //             chr = (partyName[0] || '?').toUpperCase();
            //             if (!noDefault) default_template = 'default_template=letter&bg=' + colors[colorClassIndex]
            //             + '&fg=white&chr=' + chr + '&';
            //             url = serverUrl + '/api/parties/' + partyId
            //             + '/avatar?' + default_template + 'timestamp=' + timestamp + '&obj_id=' + partyId + noRedirect;
            //         } else if (partyId && (!type && !id)) {
            //             url = serverUrl + '/api/parties/' + partyId
            //             + '/avatar?timestamp=' + timestamp + '&obj_id=' + partyId + noRedirect;
            //         }
            //     }

            //     return url;
            // };

            function bindFile(imageId, successCallback, errorCallback) {
                var url,
                    userId = ($rootScope.$user || {}).id,
                    partyId = ($rootScope.$party || {}).id || userId,
                    fileUrl = pipRest.serverUrl() + "/api/parties/" + partyId + "/files/" + imageId;

                //if (addHttpHeaders() && fileUrl)
                if (fileUrl)
                    $http.get(fileUrl)
                        .success(function (response) {
                            url = response && response.url ? response.url : '';

                            if (successCallback) successCallback(url);
                        })
                        .error(function (error) {
                            if (errorCallback) errorCallback(error);
                        });
            };

            function setErrorImageCSS(image, params) {
                var cssParams = {
                    'width': '',
                    'margin-left': '',
                    'height': '',
                    'margin-top': ''
                };

                if (params) cssParams = _.assign(cssParams, params);

                if (image)  image.css(cssParams);
            };

            function setImageMarginCSS($element, image, params) {
                var
                    containerWidth = $element.width ? $element.width() : $element.clientWidth, // || 80,
                    //containerWidth = $element.clientWidth ? $element.clientWidth : $element.width, // || 80,
                    //containerHeight = $element.clientHeight ? $element.clientHeight : $element.height, // || 80,
                    containerHeight = $element.height ? $element.height() : $element.clientHeight, // || 80,
                    imageWidth = image[0].naturalWidth || image.width,
                    imageHeight = image[0].naturalHeight || image.height,
                    margin = 0;
                var cssParams = {};

                if ((imageWidth / containerWidth) > (imageHeight / containerHeight)) {
                    margin = -((imageWidth / imageHeight * containerHeight - containerWidth) / 2);
                    cssParams['margin-left'] = '' + margin + 'px';
                    cssParams['height'] = '' + containerHeight + 'px';//'100%';
                    cssParams['width'] = '' + imageWidth * containerHeight/imageHeight + 'px';//'100%';
                    cssParams['margin-top'] = '';
                } else {
                    margin = -((imageHeight / imageWidth * containerWidth - containerHeight) / 2);
                    cssParams['margin-top'] = '' + margin + 'px';
                    cssParams['height'] = '' + imageHeight * containerWidth/imageWidth + 'px';//'100%';
                    cssParams['width'] = '' + containerWidth + 'px';//'100%';
                    cssParams['margin-left'] = '';
                }

                if (params) cssParams = _.assign(cssParams, params);

                image.css(cssParams);
            };

            function setIconMarginCSS(container, icon) {
                var
                    containerWidth = container.clientWidth ? container.clientWidth : container.width,
                    containerHeight = container.clientHeight ? container.clientHeight : container.height,
                    margin = 0,
                    iconSize = containerWidth > containerHeight ? containerHeight : containerWidth;

                var cssParams = {
                    'width': '' + iconSize + 'px',
                    'margin-left': '',
                    'height': '' + iconSize + 'px',
                    'margin-top': ''
                };

                if ((containerWidth) > (containerHeight)) {
                    margin = ((containerWidth - containerHeight) / 2);
                    cssParams['margin-left'] = '' + margin + 'px';
                } else {
                    margin = ((containerHeight - containerWidth) / 2);
                    cssParams['margin-top'] = '' + margin + 'px';
                }

                icon.css(cssParams);
            };

        }
    );

})();

