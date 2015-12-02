'use strict';

angular.module('vvedSearch')
  .controller('SearchResultController', function ($scope, $routeParams, searchResult) {
    $scope.searchResult = searchResult;
    $scope.query = $routeParams.query;
  });
