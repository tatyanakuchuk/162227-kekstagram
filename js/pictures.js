'use strict';

// data.js который создаёт данные;
(function () {
  window.data = {
    photoComments: [
      'Всё отлично!',
      'В целом всё неплохо. Но не всё.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
    ],
    photoDescriptions: [
      'Тестим новую камеру!',
      'Затусили с друзьями на море',
      'Как же круто тут кормят',
      'Отдыхаем...',
      'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
      'Вот это тачка!'
    ],
    errorText: {
      number: 'Количество хэштегов не должно превышать 5',
      identical: 'Хэштеги не должны повторяться',
      oneСharacter: 'Xештег не может состоять только из одного символа',
      missingHashSymbol: 'Хештег должен начинаться с символа #',
      length: 'Длина хештега не должна превышать 20 символов'
    }
  }
})();

// util.js
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
    }
  }
})();

// gallery.js модуль, который работает с галереей изображений;
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

  var formImgUpload = document.querySelector('.img-upload__form');

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
      formImgUpload.submit();
    }
  };

  formImgUpload.addEventListener('submit', hashtagsInputHandler);

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


// picture.js модуль для отрисовки миниатюры
(function () {
  var allPictures = document.querySelector('.pictures');
  var template = document.querySelector('#picture').content.querySelector('.picture__link');
  var fragment = document.createDocumentFragment();

  var newElement = function () {
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
})();


// preview.js модуль для отрисовки увеличенного изображения
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

  // Показ изображения в полноэкранном режиме
  var showBigPhoto = function () {
    var thumbsPhotos = document.querySelectorAll('.picture__img');
    for (var i = 0; i < thumbsPhotos.length; i++) {
      thumbsPhotos[i].addEventListener('click', getBigPhoto);
    }
  };
  showBigPhoto();
})();

// form.js - модуль, который работает с формой редактирования изображения
(function () {
  // МАСШТАБИРОВАНИЕ ИЗОБРАЖЕНИЯ
  var increaseControl = document.querySelector('.resize__control--plus');
  var decreaseControl = document.querySelector('.resize__control--minus');

  var MAX_VALUE = 100;
  var MIN_VALUE = 25;
  var step = 25;

  var scaleValue = document.querySelector('.resize__control--value');

  window.util.setDefaultValue(scaleValue, 100);

  var imgPreview = document.querySelector('.img-upload__preview  img');
  var scaleImgPreview = function (val) {
    imgPreview.style.transform = 'scale(' + val / 100 + ')';
  };
  var getCurrentValue = function (val) {
    return parseInt(val, 10);
  }
  // Функция при клике на минус
  var decreaseControlClickHandler = function () {
    while (getCurrentValue(scaleValue.value) > MIN_VALUE) {
      var newValue = getCurrentValue(scaleValue.value) - step;
      scaleImgPreview(newValue);
      scaleValue.value = newValue + '%';
      return;
    }
  };
  // Функция при клике на плюс
  var increaseControlClickHandler = function () {
    while (getCurrentValue(scaleValue.value) < MAX_VALUE) {
      var newValue = getCurrentValue(scaleValue.value) + step;
      scaleImgPreview(newValue);
      scaleValue.value = newValue + '%';
      return;
    }
  };
  decreaseControl.addEventListener('click', decreaseControlClickHandler);
  increaseControl.addEventListener('click', increaseControlClickHandler);

  // НАЛОЖЕНИЕ ЭФФЕКТА НА ИЗОБРАЖЕНИЕ
  var rangePin = document.querySelector('.scale__pin');
  var rangeValue = document.querySelector('.scale__value');
  var rangeLine = document.querySelector('.scale__line');
  var rangeLevel = document.querySelector('.scale__level');

  // Дефолтное положение пина слайдера
  var defaultPin = 100;
  rangePin.style.left = defaultPin + '%';
  rangeLevel.style.width = defaultPin + '%';
  rangePin.style.zIndex = 25;

  var rangePinDragHandler = function (evt) {
    var pinCoords = getCoords(rangePin);
    var shiftX = evt.pageX - pinCoords.left;
    var sliderCoords = getCoords(rangeLine);

    var pinMousemoveHandler = function (moveEvt) {
      var newLeft = moveEvt.pageX - shiftX - sliderCoords.left;
      if (newLeft < 0) {
        newLeft = 0;
      }
      var rightEdge = rangeLine.offsetWidth;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }
      rangePin.style.left = newLeft + 'px';
    };

    var pinMouseupHandler = function () {
      document.removeEventListener('mouseup', pinMouseupHandler);
      document.removeEventListener('mousemove', pinMousemoveHandler);
      setLevelEffect();
    };

    document.addEventListener('mousemove', pinMousemoveHandler);
    document.addEventListener('mouseup', pinMouseupHandler);
    return false;
  };

  rangePin.addEventListener('mousedown', rangePinDragHandler);

  rangePin.ondragstart = function () {
    return false;
  };

  var getCoords = function (elem) {
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  };

  var getLevelEffect = function (minLevel, maxLevel) {
    var rangeLineWidth = rangeLine.getBoundingClientRect().width;
    var pinCoordX = rangePin.offsetLeft;
    var pinPosition = pinCoordX / rangeLineWidth;
    rangeValue.value = pinPosition * 100;
    rangeLevel.style.width = rangeValue.value + '%';
    return pinPosition * (maxLevel - minLevel) + minLevel;
  };

  // Эффект ХРОМ
  var getСhromeEffect = function (minLevel, maxLevel) {
    return 'grayscale(' + (getLevelEffect(minLevel, maxLevel).toFixed(1)) + ')';
  };
  // Эффект СЕПИЯ
  var getSepiaEffect = function (minLevel, maxLevel) {
    return 'sepia(' + (getLevelEffect(minLevel, maxLevel).toFixed(1)) + ')';
  };
  // Эффект МАРВИН
  var getMarvinEffect = function (minLevel, maxLevel) {
    return 'invert(' + Math.round(getLevelEffect(minLevel, maxLevel)) + '%' + ')';
  };
  // Эффект ФОБОС
  var getPhobosEffect = function (minLevel, maxLevel) {
    return 'blur(' + (getLevelEffect(minLevel, maxLevel).toFixed(1)) + 'px' + ')';
  };
  // Эффект ЗНОЙ
  var getHeatEffect = function (minLevel, maxLevel) {
    return 'brightness(' + (getLevelEffect(minLevel, maxLevel).toFixed(1)) + ')';
  };

  var setLevelEffect = function () {
    if (imgPreview.classList.contains('effects__preview--chrome')) {
      imgPreview.style.filter = getСhromeEffect(0, 1);
    } else if (imgPreview.classList.contains('effects__preview--sepia')) {
      imgPreview.style.filter = getSepiaEffect(0, 1);
    } else if (imgPreview.classList.contains('effects__preview--marvin')) {
      imgPreview.style.filter = getMarvinEffect(0, 100);
    } else if (imgPreview.classList.contains('effects__preview--phobos')) {
      imgPreview.style.filter = getPhobosEffect(0, 3);
    } else if (imgPreview.classList.contains('effects__preview--heat')) {
      imgPreview.style.filter = getHeatEffect(1, 3);
    }
  };

  var radioChangeHandler = function () {
    var radioButtonsList = document.querySelectorAll('.effects__radio');
    var radioButtonVal;
    imgPreview.removeAttribute('class');
    imgPreview.style.filter = '';
    for (var i = 0; i < radioButtonsList.length; i++) {
      if (radioButtonsList[i].checked) {
        radioButtonVal = radioButtonsList[i].value;
        imgPreview.classList.add('effects__preview--' + radioButtonVal);
        setLevelEffect();
      }
    }
    var range = document.querySelector('.img-upload__scale');
    if (imgPreview.classList.contains('effects__preview--none')) {
      range.classList.add('hidden');
    } else {
      range.classList.remove('hidden');
      setLevelEffect();
    }
  };
  radioChangeHandler();
  var radioArea = document.querySelector('.effects__list');
  radioArea.addEventListener('change', radioChangeHandler);

})();
