'use strict';

angular.module('devvSearch')
  .controller('SearchResultController', function ($scope, $routeParams, searchResult) {
  	$scope.searchResult = searchResult;
  	$scope.query = $routeParams.query;
  });
