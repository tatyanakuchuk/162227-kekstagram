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

      allPictures.appendChild(fragment);
    });

  };

  renderAllPictures();

  // Показываем кнопки сортировки
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');

  var filtersPicturesHandler = function (evt) {
      var id = evt.target.id;
      if (id === 'filter-popular') {
        renderAllPictures();
        console.log(1);
        // здесь применяем фильтр
      } else if (id === 'filter-new') {
        renderAllPictures();
        console.log(2);
        // здесь применяем фильтр
      } else if (id === 'filter-discussed') {
        renderAllPictures();
        console.log(3);
        // здесь применяем фильтр
      }
  };

  var filtersButtonArea = document.querySelector('.img-filters__form');
  filtersButtonArea.addEventListener('click', filtersPicturesHandler);


})();
