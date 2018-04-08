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
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

// Случайный элемент массива
var getRandomIndex = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}


// Объект описание фотографии
var userPhoto = {
  url: function() {
      var image = document.createElement('img');
      image.src = 'photos/' + i + '.jpg';
      return image.src;
  },
  likes: function () {
    var minLikes = 15;
    var maxLikes = 200;
    var likes = findRandomInt(minLikes, maxLikes);
    return likes;
  },
  comments: function () {
    var minСomments = 1;
    var maxСomments = 2;
    var numberComments = findRandomInt(minСomments, maxСomments);
    return numberComments;
  },
  description: function () {
    getRandomIndex(photoDescriptions);
  }
};

var allPictures = document.querySelector('.pictures');
var template = document.querySelector('#picture').content.querySelector('.picture__link');
// Зачем создаем, если уже есть один на странице???
var fragment = document.createDocumentFragment();

var array = [];
for (var i = 1; i <= 25; i++) {
  var newPhoto = template.cloneNode(true);
  newPhoto.querySelector('img').src = userPhoto.url();
  newPhoto.querySelector('.picture__stat--likes').textContent = userPhoto.likes();
  newPhoto.querySelector('.picture__stat--comments').textContent = userPhoto.comments();
  array.push(newPhoto);
  fragment.appendChild(newPhoto);
}
allPictures.appendChild(fragment);


// Большая фотка
var bigPicture = document.querySelector('.big-picture');

var getBigPhoto = function () {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('img').src = userPhoto.url(i=1);
  bigPicture.querySelector('.likes-count').textContent = userPhoto.likes(i=1);
  bigPicture.querySelector('.comments-count').textContent = userPhoto.comments(i=1);
  bigPicture.querySelector('.social__comments').innerHTML = '<li class="social__comment social__comment--text"><img class="social__picture" src="img/avatar-' + findRandomInt(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35">' + getRandomIndex(photoComments) + '</li>';
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
  document.querySelector('.social__comments li').style.maxWidth = '600px';
}
getBigPhoto();
