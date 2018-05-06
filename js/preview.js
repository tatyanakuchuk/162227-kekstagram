'use strict';

(function () {
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
  };
  var closeBigPhoto = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', bigPhotoEscPressHandler);
    document.querySelector('body').classList.remove('modal-open');
  };

  var bigPhotoClose = document.querySelector('.big-picture__cancel');
  bigPhotoClose.addEventListener('click', function () {
    closeBigPhoto();
  });

  // var showBigPhoto = function () {
  //   var thumbsPhotos = document.querySelectorAll('.picture__img');
  //   for (var i = 0; i < thumbsPhotos.length; i++) {
  //     thumbsPhotos[i].addEventListener('click', getBigPhoto);
  //   }
  // };
  // showBigPhoto();
})();
