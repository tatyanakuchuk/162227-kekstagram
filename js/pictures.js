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

// Объект описание фотографии
var userPhoto = {
  url: function (i) {
    return 'photos/' + i + '.jpg';
  },
  likes: function (min, max) {
    return findRandomInt(min, max);
  },
  comments: function (min, max) {
    return findRandomInt(min, max);
  },
  description: function () {
    getRandomIndex(photoDescriptions);
  }
};

var allPictures = document.querySelector('.pictures');
var template = document.querySelector('#picture').content.querySelector('.picture__link');
var fragment = document.createDocumentFragment();

var newElement = function () {
  var newPhoto = template.cloneNode(true);
  newPhoto.querySelector('img').src = userPhoto.url(i);
  newPhoto.querySelector('.picture__stat--likes').textContent = userPhoto.likes(15, 200);
  newPhoto.querySelector('.picture__stat--comments').textContent = userPhoto.comments(1, 2);
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
  for (i = 1; i <= userPhoto.comments(min, max); i++) {
    comment += getRandomComment();
  }
  return comment;
};

var getBigPhoto = function () {
  bigPicture.querySelector('img').src = userPhoto.url(1);
  bigPicture.querySelector('.likes-count').textContent = userPhoto.likes(15, 200);
  bigPicture.querySelector('.comments-count').textContent = userPhoto.comments();
  bigPicture.querySelector('.social__comments').innerHTML = writeComments(1, 2);
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
  document.querySelector('.social__comments li').style.maxWidth = '600px';
  bigPicture.classList.remove('hidden');
};
getBigPhoto();
