'use strict';

(function () {

  // Рекомендуемые
  var filterPopular = document.querySelector('#filter-popular');
  var recommendedHandler = function () {

  };
  filterPopular.addEventListener('click', recommendedHandler);

  // Новые
  var filterNew = document.querySelector('#filter-new');
  var newHandler = function () {

  };
  filterPopular.addEventListener('click', newHandler);

  // Обсуждаемые
  var filterDiscussed = document.querySelector('#filter-discussed');
  var arr = [];
  var discussedHandler = function () {
    // Сортировка по убыванию
    arr.sort(function(first, second) {
      if (first.comments < second.comments) {
        return 1;
      } else if (first.comments > second.comments) {
        return -1;
      } else {
        return 0;
      }
    });
  };
  filterPopular.addEventListener('click', discussedHandler);

})();
