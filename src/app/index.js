'use strict';

angular.module('devvSearch', ['ngAnimate', 'ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/search_form/search_form.html',
        controller: 'SearchFormController'
      })
      .when('/search', {
        templateUrl: 'app/search_result/search_result.html',
        controller: 'SearchResultController',
        resolve: {
          searchResult: function($route, searchService) {
            return searchService.get($route.current.params.query);
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  })
;
