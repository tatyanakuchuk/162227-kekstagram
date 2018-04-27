'use strict';

var photoComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var photoDescriptions = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

// Случайное число от min до max
var findRandomInt = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

// Случайный элемент массива
var getRandomIndex = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

var allPictures = document.querySelector('.pictures');
var template = document.querySelector('#picture').content.querySelector('.picture__link');
var fragment = document.createDocumentFragment();

var newElement = function () {
  var newPhoto = template.cloneNode(true);
  newPhoto.querySelector('img').src = 'photos/' + i + '.jpg';
  newPhoto.querySelector('.picture__stat--likes').textContent = findRandomInt(15, 200);
  newPhoto.querySelector('.picture__stat--comments').textContent = findRandomInt(1, 2);
  fragment.appendChild(newPhoto);
};

for (var i = 1; i <= 25; i++) {
  newElement(i);
}

allPictures.appendChild(fragment);

// Большая фотка
var bigPicture = document.querySelector('.big-picture');

var getRandomComment = function () {
  return '<li class="social__comment social__comment--text"><img class="social__picture" src="img/avatar-' + findRandomInt(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35">' + getRandomIndex(photoComments) + '</li>';
};

var writeComments = function (min, max) {
  var comment = '';
  for (i = 1; i <= findRandomInt(min, max); i++) {
    comment += getRandomComment();
  }
  return comment;
};

var getBigPhoto = function () {
  bigPicture.querySelector('img').src = 'photos/' + 1 + '.jpg';
  bigPicture.querySelector('.social__caption').innerHTML = getRandomIndex(photoDescriptions);
  bigPicture.querySelector('.likes-count').textContent = findRandomInt(15, 200);
  bigPicture.querySelector('.comments-count').textContent = findRandomInt(1, 2);
  bigPicture.querySelector('.social__comments').innerHTML = writeComments(1, 2);
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
  document.querySelector('.social__comments li').style.maxWidth = '600px';
  openBigPhoto();
};
// getBigPhoto();

var bigPhotoEscPressHandler = function (evt) {
  if (evt.keyCode === 27) {
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
  for (i = 0; i < thumbsPhotos.length; i++) {
    thumbsPhotos[i].addEventListener('click', getBigPhoto);
  }
};
showBigPhoto();

// ДОБАВЛЕНИЕ ФОТО
var uploadFile = document.querySelector('.img-upload__input');
var uploadPopup = document.querySelector('.img-upload__overlay');
var uploadPopupClose = document.querySelector('#upload-cancel');
var uploadForm = document.querySelector('.img-upload__form');

var popupEscPressHandler = function (evt) {
  if (evt.keyCode === 27) {
    closePopup();
  }
};

var openPopup = function () {
  uploadPopup.classList.remove('hidden');
  document.addEventListener('keydown', popupEscPressHandler);
};

var closePopup = function () {
  uploadPopup.classList.add('hidden');
  document.removeEventListener('keydown', popupEscPressHandler);
};

uploadFile.addEventListener('change', function () {
  openPopup();
  scaleValue.value = defaultValue + '%';
});

uploadPopupClose.addEventListener('click', function () {
  closePopup();
  imgPreview.removeAttribute('style');
  uploadForm.reset();
});

// МАСШТАБИРОВАНИЕ ИЗОБРАЖЕНИЯ
var increaseControl = document.querySelector('.resize__control--plus');
var decreaseControl = document.querySelector('.resize__control--minus');

var MAX_VALUE = 100;
var MIN_VALUE = 25;
var step = 25;
var defaultValue = 100;

var scaleValue = document.querySelector('.resize__control--value');
scaleValue.value = defaultValue + '%';
var imgPreview = document.querySelector('.img-upload__preview  img');
var scaleImgPreview = function (val) {
  imgPreview.style.transform = 'scale(' + val / 100 + ')';
};
// Функция при клике на минус
var decreaseControlClickHandler = function () {
  var currentValue = parseInt(scaleValue.value);
  while (currentValue > MIN_VALUE) {
    var newValue = currentValue - step;
    scaleImgPreview(newValue);
    return scaleValue.value = newValue + '%';
  }
};
// Функция при клике на плюс
var increaseControlClickHandler = function () {
  var currentValue = parseInt(scaleValue.value);
  while (currentValue < MAX_VALUE) {
    var newValue = currentValue + step;
    scaleImgPreview(newValue);
    return scaleValue.value = newValue + '%';
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

var getLevelEffect = function (minLevel, maxLevel) {
  var rangeLineWidth = rangeLine.getBoundingClientRect().width;
  var pinCoordX = rangePin.offsetLeft;
  var pinPosition = pinCoordX / rangeLineWidth;
  rangeValue.value = pinPosition * 100;
  rangeLevel.style.width = rangeValue.value + '%';
  return pinPosition * (maxLevel - minLevel) + minLevel;
};

// Эффект ХРОМ
var effectСhromeHandler = function (minLevel, maxLevel) {
  return imgPreview.style.filter = 'grayscale(' + (getLevelEffect(minLevel, maxLevel).toFixed(1)) + ')';
};
// Эффект СЕПИЯ
var effectSepiaHandler = function (minLevel, maxLevel) {
  return imgPreview.style.filter = 'sepia(' + (getLevelEffect(minLevel, maxLevel).toFixed(1)) + ')';
};
// Эффект МАРВИН
var effectMarvinHandler = function (minLevel, maxLevel) {
  return imgPreview.style.filter = 'invert(' + Math.round(getLevelEffect(minLevel, maxLevel)) + '%' + ')';
};
// Эффект ФОБОС
var effectPhobosHandler = function (minLevel, maxLevel) {
  return imgPreview.style.filter = 'blur(' + (getLevelEffect(minLevel, maxLevel).toFixed(1)) + 'px' + ')';
};
// Эффект ЗНОЙ
var effectHeatHandler = function (minLevel, maxLevel) {
  return imgPreview.style.filter = 'brightness(' + (getLevelEffect(minLevel, maxLevel).toFixed(1)) + ')';
};

var rangePinDragHandler = function () {
  if (imgPreview.classList.contains('effects__preview--chrome')) {
    effectСhromeHandler(0, 1);
  }
  if (imgPreview.classList.contains('effects__preview--sepia')) {
    effectSepiaHandler(0, 1);
  }
  if (imgPreview.classList.contains('effects__preview--marvin')) {
    effectMarvinHandler(0, 100);
  }
  if (imgPreview.classList.contains('effects__preview--phobos')) {
    effectPhobosHandler(0, 3);
  }
  if (imgPreview.classList.contains('effects__preview--heat')) {
    effectHeatHandler(1, 3);
  }
};
rangePin.addEventListener('mouseup', rangePinDragHandler);


var radioChangeHandler = function () {
  var radioButtonsList = document.querySelectorAll('.effects__radio');
  var radioButtonVal;
  imgPreview.removeAttribute('class');
  imgPreview.style.filter = '';
  for (i = 0; i < radioButtonsList.length; i++) {
    if (radioButtonsList[i].checked) {
      radioButtonVal = radioButtonsList[i].value;
      imgPreview.classList.add('effects__preview--' + radioButtonVal);
    }
  }
  var range = document.querySelector('.img-upload__scale');
  if (imgPreview.classList.contains('effects__preview--none')) {
    range.classList.add('hidden');
    imgPreview.removeAttribute('style');
  }
  else {
    range.classList.remove('hidden');
  }
};
radioChangeHandler();
var radioArea = document.querySelector('.effects__list');
radioArea.addEventListener('change', radioChangeHandler);


// ХЭШ-ТЕГИ
var hashtagsInput = document.querySelector('.text__hashtags');
var regexp = /^#\S+/i;
var space = /\s#/;

var errorMessage = function (elem, text) {
  elem.setCustomValidity(text);
  elem.style.outline = '2px solid red';
};

var hashtagsInputHandler = function () {
  var hashtagsStr = hashtagsInput.value.toLowerCase().trim();
  var hashtagsArray = hashtagsStr.split(' ');
  errorMessage(hashtagsInput, '');

  // Прверка на количество хештегов
  if (hashtagsArray.length > 5) {
    errorMessage(hashtagsInput, 'Количество хэштегов не должно превышать 5');
  }
  // Проверка длины хештегов
  for (i = 0; i < hashtagsArray.length; i++) {
    if (hashtagsArray[i].length > 20) {
      errorMessage(hashtagsInput, 'Длина хештега не должно превышать 20 символов');
      break;
    }
    if (hashtagsArray[i].length < 2) {
      errorMessage(hashtagsInput, 'Xештег не может состоять только из символа #');
      break;
    }
    if (!regexp.test(hashtagsArray[i])) {
      errorMessage(hashtagsInput, 'Хештег должен начинаться с символа #');
      break;
    }
  }
  for (i = 1; i < hashtagsArray.length; i++) {
    // Проверка на повторяющиеся хештеги
    if (hashtagsArray[i] === hashtagsArray[i - 1]) {
      errorMessage(hashtagsInput, 'Хэштеги не должны повторяться');
      break;
    }
    // Проверка на наличие пробела ?????
    if (!space.test(hashtagsArray[i])) {
      errorMessage(hashtagsInput, 'Между хэштегами должны быть пробелы');
      break;
    }
  }
};

var btnImgUpload = document.querySelector('.img-upload__submit');
btnImgUpload.addEventListener('click', hashtagsInputHandler);

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
