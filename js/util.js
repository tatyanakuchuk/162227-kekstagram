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
    },
    sortDecrease: function (first, second) {
      if (second === first) {
        return 0;
      } else if (second < first) {
        return -1;
      } else {
        return 1;
      }
    },
    shuffleArray: function (array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
  };
})();
