'use strict';

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
    },
    getBigPhoto: function (bigPicture) {
      bigPicture.querySelector('img').src = 'photos/' + 1 + '.jpg';
      bigPicture.querySelector('.social__caption').innerHTML = window.util.getRandomIndex(window.data.photoDescriptions);
      bigPicture.querySelector('.likes-count').textContent = window.util.findRandomInt(15, 200);
      bigPicture.querySelector('.comments-count').textContent = window.util.findRandomInt(1, 2);
      bigPicture.querySelector('.social__comments').innerHTML = writeComments(1, 2);
      document.querySelector('.social__comment-count').classList.add('visually-hidden');
      document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
      document.querySelector('.social__comments li').style.maxWidth = '600px';
      openBigPhoto();
    },
    showBigPhoto: function () {
      var thumbsPhotos = document.querySelectorAll('.picture__img');
      for (var i = 0; i < thumbsPhotos.length; i++) {
        thumbsPhotos[i].addEventListener('click', window.getBigPhoto);
      }
    }
  };
})();
