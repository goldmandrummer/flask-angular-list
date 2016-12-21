(function() {

    'use strict';

    angular.module('FlasklistApp', [])

    .controller('FlasklistController', ['$scope', '$log', '$http', '$timeout',
        function($scope, $log, $http, $timeout) {

            $scope.loading = false;

            $scope.getPeople = function() {

                var timeout = '';

                $scope.loading = true;

                $http.get('/get').
                success(function(data, status, headers, config) {
                    if (status === 202) {
                        $log.log(data, status);
                    } else if (status === 200) {
                        $log.log(data);
                        $scope.loading = false;
                        // $scope.submitButtonText = "Submit";
                        $scope.people = data;
                        $timeout.cancel(timeout);
                        return false;
                    }
                    // continue to call the poller() function every 2 seconds
                    // until the timeout is cancelled
                    timeout = $timeout(poller, 2000);
                }).
                error(function(error) {
                    $log.log(error);
                    $scope.loading = false;
                    // $scope.submitButtonText = "Submit";
                    // $scope.urlerror = true;
                });

            };

            $scope.getPeople();

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
