'use strict';

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
