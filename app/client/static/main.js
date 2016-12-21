(function() {

    'use strict';

    angular.module('FlasklistApp', [])

    .controller('FlasklistController', ['$scope', '$log', '$http', '$location', '$timeout',
        function($scope, $log, $http, $location, $timeout) {

            $scope.loading = false;
            $scope.person = { 'id': 0, 'name': 'test'};

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

                        // IF edit-view, GET person MATCHING ID IN URL
                        var url_array = $location.$$absUrl.split("/");
                        console.log('$location.$$absUrl.split("/")', url_array);
                        if (url_array[url_array.length - 2] == 'edit-view') {
                            var person_id = url_array[url_array.length - 1];

                            $scope.people.forEach(function (item, index) {
                                if (item.id == person_id) {
                                    $scope.person = item;
                                    console.log('$scope.person', $scope.person);
                                }
                            });
                        }

                        return false;
                    }
                    // continue to call the poller() function every 2 seconds
                    // until the timeout is cancelled
                    timeout = $timeout(poller, 2000);
                }).
                error(function(error) {
                    $log.log(error);
                    $scope.loading = false;
                });

            };

            $scope.getPeople();

            $scope.addPerson = function() {

                $scope.loading = true;

                // TODO: Remove unnecessary variable
                var userInput = $scope.name;

                $http.post('/add', {
                    'name': userInput
                }).
                success(function(results) {
                    $log.log(results);
                    $scope.loading = false;
                }).
                error(function(error) {
                    $log.log(error);
                });

            };

            $scope.editPerson = function() {

                $scope.loading = true;

                // TODO: Remove unnecessary variable
                var name_copy = $scope.person.name;

                $http.post('/edit/'+$scope.person.id, {
                    'new_name': name_copy
                }).
                success(function(results) {
                    $log.log(results);
                    $scope.loading = false;
                    window.location = "/";
                }).
                error(function(error) {
                    $log.log(error);
                });

            };

            $scope.removePerson = function() {

                $scope.loading = true;

                $http.post('/delete/'+$scope.person.id).
                success(function(results) {
                    $log.log(results);
                    $scope.loading = false;
                    window.location = "/";
                }).
                error(function(error) {
                    $log.log(error);
                });

            };

        }
    ]);

}());
