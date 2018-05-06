'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');

  var ESC_KEYCODE = 27;

  var bigPhotoEscPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeBigPhoto();
    }
  };



})();
