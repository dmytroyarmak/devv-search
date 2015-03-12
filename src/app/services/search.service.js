'use strict';

angular.module('devvSearch')
  .factory('searchService', function ($http) {
    var DATA_URL = 'stubs/data.json'
    var INCLUDE_RELEVANCE = 1;
    var EXCLUDE_RELEVANCE = 1;
    var dataPromise;

    return {
      get: get
    };

    function get (query) {
      return _getData().then(function(data) {
        return _filterDataByQuery(data, query);
      });
    }

    function _filterDataByQuery (data, query) {
      var tokens = _splitQueryToTokens(query);
      return data
        .map(function(item) {
          return {
            data: item,
            relevance: _computeRelevance(item, tokens)
          }
        })
        .filter(_withPositiveRelevance)
        .sort(_compareByRelevance);
    }

    function _getData () {
      dataPromise = dataPromise || _makeHtppRequest();
      return dataPromise
    }

    function _makeHtppRequest () {
      return $http.get(DATA_URL).then(function(resp) {
        return resp.data;
      })
    }

    function _splitQueryToTokens (query) {
      return query.match(/-?(\w+|".+")/g).reduce(function (result, token) {
        var section = (token[0] === '-' ? 'exclude' : 'include'),
          tokenArray = result[section],
          normalizedToken = _normalizeToken(token);

        tokenArray.push(normalizedToken);

        return result;
      }, {include: [], exclude: []});
    }

    function _normalizeToken (token) {
      return token
        .replace(/^-/, '')
        .replace(/^"/, '')
        .replace(/"$/, '')
        .toLowerCase();
    }

    function _computeRelevance (item, tokens) {
      var relevance = 0;

      tokens.include.forEach(function(token) {
        if (_itemContains(item, token)) {
          relevance += INCLUDE_RELEVANCE;
        }
      });

      tokens.exclude.forEach(function(token) {
        if (_itemContains(item, token)) {
          relevance -= EXCLUDE_RELEVANCE;
        }
      });

      return relevance;
    }

    function _itemContains (item, token) {
      return Object.keys(item).some(function(itemKey) {
        return item[itemKey].toLowerCase().indexOf(token) !== -1;
      });
    }

    function _withPositiveRelevance (searchResult) {
      return searchResult.relevance > 0;
    }

    function _compareByRelevance (first, second) {
      var firstRelevance = first.relevance,
        secondRelevance = second.relevance;

      if (firstRelevance < secondRelevance) {
        return 1;
      } else if (firstRelevance > secondRelevance) {
        return -1;
      } else {
        return 0;
      }
    }
  });

