'use strict';

(function () {
  var uploadFile = document.querySelector('.img-upload__input');
  var uploadPopup = document.querySelector('.img-upload__overlay');
  var uploadPopupClose = document.querySelector('#upload-cancel');
  var uploadForm = document.querySelector('.img-upload__form');
  var imgPreview = document.querySelector('.img-upload__preview  img');
  var scaleValue = document.querySelector('.resize__control--value');
  var ESC_KEYCODE = 27;

  var popupEscPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var openPopup = function () {
    uploadPopup.classList.remove('hidden');
    document.addEventListener('keydown', popupEscPressHandler);
    window.util.setDefaultValue(scaleValue, 100);
  };

  var closePopup = function () {
    uploadPopup.classList.add('hidden');
    document.removeEventListener('keydown', popupEscPressHandler);
  };

  uploadFile.addEventListener('change', function () {
    openPopup();
  });

  uploadPopupClose.addEventListener('click', function () {
    closePopup();
    imgPreview.removeAttribute('style');
    uploadForm.reset();
  });

  // ХЭШ-ТЕГИ
  var hashtagsInput = document.querySelector('.text__hashtags');
  var regexp = /^#\S+/i;

  var showErrorMessage = function (elem, text, colorOutline) {
    elem.setCustomValidity(text);
    elem.style.outline = '2px solid ' + colorOutline;
  };

  var hashtagsInputHandler = function (evt) {
    evt.preventDefault();

    var hashtagsArray = hashtagsInput.value.toLowerCase().trim().split(' ');
    var errorOutlineColor = 'red';
    var noErrorOutlineColor = 'transparent';

    showErrorMessage(hashtagsInput, '', noErrorOutlineColor);

    if (hashtagsArray.length > 5) {
      showErrorMessage(hashtagsInput, window.data.errorText.number, errorOutlineColor);
    }

    var obj = {};
    for (var i = 0; i < hashtagsArray.length; i++) {
      if (obj[hashtagsArray[i]]) {
        obj[hashtagsArray[i]]++;
      } else {
        obj[hashtagsArray[i]] = 1;
      }
    }
    for (i in obj) {
      if (obj[i] > 1) {
        showErrorMessage(hashtagsInput, window.data.errorText.identical, errorOutlineColor);
      }
    }

    for (i = 0; i < hashtagsArray.length; i++) {
      if (hashtagsArray[i].length < 2 && !hashtagsArray[i].length === '') {
        showErrorMessage(hashtagsInput, window.data.errorText.oneСharacter, errorOutlineColor);
        break;
      } else if (!regexp.test(hashtagsArray[i]) && !hashtagsArray[i].length === '') {
        showErrorMessage(hashtagsInput, window.data.errorText.missingHashSymbol, errorOutlineColor);
        break;
      } else if (hashtagsArray[i].length > 20) {
        showErrorMessage(hashtagsInput, window.data.errorText.length, errorOutlineColor);
        break;
      }
    }
    if (hashtagsInput.checkValidity()) {
      uploadForm.submit();
    }
  };

  uploadForm.addEventListener('submit', hashtagsInputHandler);

  // AJAX Отправка данных на сервер
  uploadForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(uploadForm), function (response) {
      closePopup();
    });
    evt.preventDefault();
  });

  hashtagsInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', popupEscPressHandler);
  });
  hashtagsInput.addEventListener('blur', function () {
    document.addEventListener('keydown', popupEscPressHandler);
  });

  // Комментарий
  var uploadComment = document.querySelector('.text__description');
  var textareaChangeHandler = function () {
    var LIMIT_NUMBER = 140;
    if (uploadComment.value.length > LIMIT_NUMBER) {
      uploadComment.value = uploadComment.value.substring(0, LIMIT_NUMBER);
    }
  };

  uploadComment.addEventListener('keyup', textareaChangeHandler);

  uploadComment.addEventListener('focus', function () {
    document.removeEventListener('keydown', popupEscPressHandler);
  });
  uploadComment.addEventListener('blur', function () {
    document.addEventListener('keydown', popupEscPressHandler);
  });
})();
