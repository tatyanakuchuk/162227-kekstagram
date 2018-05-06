'use strict';

(function () {
  window.load (function (newElement) {
    var allPictures = document.querySelector('.pictures');
    var template = document.querySelector('#picture').content.querySelector('.picture__link');
    var fragment = document.createDocumentFragment();

    newElement = function () {
      var newPhoto = template.cloneNode(true);
      newPhoto.querySelector('img').src = 'photos/' + i + '.jpg';
      newPhoto.querySelector('.picture__stat--likes').textContent = window.util.findRandomInt(15, 200);
      newPhoto.querySelector('.picture__stat--comments').textContent = window.util.findRandomInt(1, 2);
      fragment.appendChild(newPhoto);
    };

    for (var i = 1; i <= 25; i++) {
      newElement(i);
    }
    allPictures.appendChild(fragment);

    // Показываем кнопки сортировки
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');

    // Получаем массив картинок
    var getAllPictures = function () {
      var allPicturesArr = [];
      var pictureList = document.querySelectorAll('.picture__link img');
      for (var i =0; i < pictureList.length; i++) {
        allPicturesArr.push(picture);
      }
      return allPicturesArr;
    };
      console.log(getAllPictures());

  });

  // Рекомендуемые
  var filterPopular = document.querySelector('#filter-popular');
  var recommendedHandler = function () {
    console.log('1');
  };
  filterPopular.addEventListener('click', recommendedHandler);

  // Новые
  var filterNew = document.querySelector('#filter-new');
  var newHandler = function () {
    console.log('2');
  };
  filterNew.addEventListener('click', newHandler);

  // Обсуждаемые
  var filterDiscussed = document.querySelector('#filter-discussed');
  var arr = [];
  var discussedHandler = function () {
    console.log('3');
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
  filterDiscussed.addEventListener('click', discussedHandler);

})();
