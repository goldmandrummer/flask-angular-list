(function() {

    'use strict';

    angular.module('FlasklistApp', [])

    .controller('FlasklistController', ['$scope', '$log', '$http', '$timeout',
        function($scope, $log, $http, $timeout) {

            $scope.onSubmit = function() {

                $log.log('test');

            };

        }
    ]);

}());
