'use strict';

(function () {
  window.util = {
    findRandomInt: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
    getRandomIndex: function (arr) {
      var randomIndex = Math.floor(Math.random() * arr.length);
      return arr[randomIndex];
    },
    setDefaultValue: function (elem, defaultValue) {
      elem.value = defaultValue + '%';
    }
  };
})();
