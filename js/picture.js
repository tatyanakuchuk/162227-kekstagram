'use strict';

(function () {
  var renderAllPictures = function () {
    window.load (function (newElement) {
      var allPictures = document.querySelector('.pictures');
      var template = document.querySelector('#picture').content.querySelector('.picture__link');
      var fragment = document.createDocumentFragment();

      newElement.forEach(function(element) {
        var newPhoto = template.cloneNode(true);
        newPhoto.querySelector('img').src = element.url;
        newPhoto.querySelector('.picture__stat--likes').textContent = element.likes;
        newPhoto.querySelector('.picture__stat--comments').textContent = element.comments.length;
        fragment.appendChild(newPhoto);
      });
    });

  };

  renderAllPictures();

  // Показываем кнопки сортировки
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  var filtersButton = document.querySelector('.img-filters__button');

  var filtersPicturesHandler = function (evt) {
    var id = evt.target.id;
    renderAllPictures();
    if (id === 'filter-popular') {
      console.log(1);
    } else if (id === 'filter-new') {
      console.log(2);
    } else if (id === 'filter-discussed') {
      console.log(3);
    }
  };

  filtersButton.addEventListener('click', filtersPicturesHandler);


  // Обсуждаемые
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


})();
