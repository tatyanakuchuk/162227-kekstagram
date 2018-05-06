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

  var getBigPhoto = function () {
    bigPicture.querySelector('img').src = 'photos/' + 1 + '.jpg';
    bigPicture.querySelector('.social__caption').innerHTML = window.util.getRandomIndex(window.data.photoDescriptions);
    bigPicture.querySelector('.likes-count').textContent = window.util.findRandomInt(15, 200);
    bigPicture.querySelector('.comments-count').textContent = window.util.findRandomInt(1, 2);
    bigPicture.querySelector('.social__comments').innerHTML = writeComments(1, 2);
    document.querySelector('.social__comment-count').classList.add('visually-hidden');
    document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
    document.querySelector('.social__comments li').style.maxWidth = '600px';
    openBigPhoto();
  };

  var showBigPhoto = function () {
    var thumbsPhotos = document.querySelectorAll('.picture__img');
    for (var i = 0; i < thumbsPhotos.length; i++) {
      thumbsPhotos[i].addEventListener('click', getBigPhoto);
    }
  };

  var clearAllPictures = function () {
    var pictureList = document.querySelectorAll('.picture__link');
    for (var i = 0; i < pictureList.length; i++) {
      pictureList[i].parentNode.removeChild(pictureList[i]);
    }
  };

  document.querySelector('.img-filters').classList.remove('img-filters--inactive');

  var filtersPicturesHandler = function (evt) {
    var allPictures = document.querySelector('.pictures');

    var id = evt.target.id;
    if (id === 'filter-popular') {
      clearAllPictures();
      renderAllPictures();
    } else if (id === 'filter-random') {
      clearAllPictures();

      renderAllPictures();
    } else if (id === 'filter-discussed') {
      clearAllPictures();
      renderAllPictures();
    } else if (id === 'filter-recommend') {
      clearAllPictures();
      renderAllPictures();
    }
  };

  var filtersButtonArea = document.querySelector('.img-filters__form');
  filtersButtonArea.addEventListener('click', filtersPicturesHandler);
})();
