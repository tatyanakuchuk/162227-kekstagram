'use strict';

// Функция для отправки данных на сервер
(function () {

  var URL = 'https://js.dump.academy/kekstagram';

  window.upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 1000;

    xhr.open('POST', URL);
    xhr.send(data);
  }

})();

// Функция получения данных с сервера
(function () {

  var URL = 'https://js.dump.academy/kekstagram/data';

  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 1000;

    xhr.open('GET', URL);
    xhr.send();
  }

  window.load(function (newElement) {
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
  });

})();
