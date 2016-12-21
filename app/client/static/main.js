(function() {

    'use strict';

    angular.module('FlasklistApp', [])

    .controller('FlasklistController', ['$scope', '$log', '$http', '$timeout',
        function($scope, $log, $http, $timeout) {

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
                        var url_array = window.location.href.split("/");
                        console.log(url_array[url_array.length - 2]);
                        if (url_array[url_array.length - 2] == 'edit-view') {
                            var person_id = url_array[url_array.length - 1];

                            $scope.people.forEach(function (item, index) {
                                if (item.id == url_array[url_array.length - 1]) {
                                    $scope.person = jQuery.extend(true, {}, item);
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
                    // $scope.submitButtonText = "Submit";
                    // $scope.urlerror = true;
                });

            };

            $scope.getPeople();

            $scope.addPerson = function() {

                $log.log('test');
                $scope.loading = true;

                var userInput = $scope.name;

                // fire the API request
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

            $scope.updatePerson = function() {

                // IF edit-view, GET person MATCHING ID IN URL
                var person_id;
                var url_array = window.location.href.split("/");
                console.log(url_array[url_array.length - 2]);
                if (url_array[url_array.length - 2] == 'edit-view') {
                    person_id = url_array[url_array.length - 1];

                    // $scope.people.forEach(function (item, index) {
                    //     if (item.id == url_array[url_array.length - 1]) {
                    //         $scope.person = jQuery.extend(true, {}, item);
                    //     }
                    // });
                }

                $log.log('test');
                $scope.loading = true;

                console.log('TADA $scope.person.name', $scope.person.name);
                var name_copy = $scope.person.name;

                // fire the API request
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

        }
    ]);

}());
