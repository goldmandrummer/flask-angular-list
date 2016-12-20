(function() {

    'use strict';

    angular.module('FlasklistApp', [])

    .controller('FlasklistController', ['$scope', '$log', '$http', '$timeout',
        function($scope, $log, $http, $timeout) {

            $scope.people = $http.data

            $scope.loading = false;

            $scope.addPerson = function() {

                $log.log('test');

                var userInput = $scope.name;

                // fire the API request
                $http.post('/add', {
                    'name': userInput
                }).
                success(function(results) {
                    $log.log(results);
                    $scope.loading = true;
                }).
                error(function(error) {
                    $log.log(error);
                });

            };

        }
    ]);

}());
