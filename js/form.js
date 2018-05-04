'use strict';

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
  };
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
