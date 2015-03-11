'use strict';

angular.module('devvSearch', ['ngAnimate', 'ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/search_form/search_form.html',
        controller: 'SearchFormController'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
;
