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
  bigPicture.classList.remove('hidden');
};
// getBigPhoto();


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

uploadFile.addEventListener('change', function() {
  scaleValue.value = defaultValue + '%';
  openPopup();
});

uploadPopupClose.addEventListener('click', function() {
  closePopup();
  imgPreview.removeAttribute('style');
  uploadForm.reset();
});

// МАСШТАБИРОВАНИЕ ИЗОБРАЖЕНИЯ
var increaseControl = document.querySelector('.resize__control--plus');
var decreaseControl = document.querySelector('.resize__control--minus');

var maxValue = 100;
var minValue = 25;
var step = 25;

var defaultValue = 100;
var scaleValue = document.querySelector('.resize__control--value');

var imgPreview = document.querySelector('.img-upload__preview  img');
var scaleImgPreview = function (val) {
  imgPreview.style.transform = 'scale(' + val/100 + ')';
};
// Функция при клике на минус
var decreaseControlClickHandler = function () {
  var currentValue = parseInt(scaleValue.value);
  while (currentValue > minValue) {
    var newValue = currentValue - step;
    scaleImgPreview(newValue);
    return scaleValue.value = newValue + '%';
  }
};
// Функция при клике на плюс
var increaseControlClickHandler = function () {
  var currentValue = parseInt(scaleValue.value);
  while (currentValue < maxValue) {
    var newValue = currentValue + step;
    scaleImgPreview(newValue);
    return scaleValue.value = newValue + '%';
  }
};
decreaseControl.addEventListener('click', decreaseControlClickHandler);
increaseControl.addEventListener('click', increaseControlClickHandler);

// НАЛОЖЕНИЕ ЭФФЕКТА НА ИЗОБРАЖЕНИЕ
var radioChangeHandler = function () {
  var radioButtonsList = document.querySelectorAll('.effects__radio');
  var radioButtonVal;
  imgPreview.removeAttribute('class');
  for (i = 0; i < radioButtonsList.length; i++) {
    if (radioButtonsList[i].checked) {
      radioButtonVal = radioButtonsList[i].value;
      imgPreview.classList.add('effects__preview--' + radioButtonVal);
    }
  }
  var range = document.querySelector('.img-upload__scale');
  if (imgPreview.classList.contains('effects__preview--none')) {
    range.classList.add('hidden');
  }
  else {
    range.classList.remove('hidden');
  }
};
radioChangeHandler();

var radioArea = document.querySelector('.effects__list');
radioArea.addEventListener('change', radioChangeHandler);


// ИНТЕНСИВНОСТЬ ЭФФЕКТА
var rangePin = document.querySelector('.scale__pin');
var rangeValue = document.querySelector('.scale__value');
var rangeLine = document.querySelector('.scale__line');
var rangeLevel = document.querySelector('.scale__level');

var rangeDragHandler = function () {
  var rangeLineWidth = rangeLine.getBoundingClientRect().width;
  var pinCoordX = rangePin.offsetLeft;
  rangeValue.value = Math.round(pinCoordX * 100 / rangeLineWidth);
  rangeLevel.style.width = rangeValue.value + '%';
};

rangePin.addEventListener('mouseup', rangeDragHandler);
