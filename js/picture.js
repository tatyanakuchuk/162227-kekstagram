'use strict';

(function () {
  var renderAllPictures = function () {
    window.load(function (newElement) {
      var allPictures = document.querySelector('.pictures');
      var template = document.querySelector('#picture').content.querySelector('.picture__link');
      var fragment = document.createDocumentFragment();
      newElement.forEach(function (element) {
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
  var bigPicture = document.querySelector('.big-picture');

  var getRandomComment = function () {
    return '<li class="social__comment social__comment--text"><img class="social__picture" src="img/avatar-' + window.util.findRandomInt(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35">' + window.util.getRandomIndex(window.data.photoComments) + '</li>';
  };

  var writeComments = function (min, max) {
    var comment = '';
    for (var i = 1; i <= window.util.findRandomInt(min, max); i++) {
      comment += getRandomComment();
    }
    return comment;
  };

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

  var ESC_KEYCODE = 27;

  var bigPhotoEscPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeBigPhoto();
    }
  };

  var openBigPhoto = function () {
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', bigPhotoEscPressHandler);
    document.querySelector('body').classList.add('modal-open');
    showBigPhoto();
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
