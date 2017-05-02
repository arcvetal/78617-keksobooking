'use strict';
var offers = [];
var OFFER_COUNT = 8;
var offerTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var offerTypes = ['flat', 'house', 'bungalo'];
var offerCheckins = ['12:00', '13:00', '14:00'];
var offerCheckouts = ['12:00', '13:00', '14:00'];
var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// Сделать случайный массив из переданого
var getRandomArray = function (array) {
  return array.slice(0, Math.floor(Math.random() * array.length));
};

// Вернуть СЛУЧАЙНОЕ ЦЕЛОЕ число из диапазона min-max
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Создание ОБЪЕКТОВ объявлений
var createOfferObject = function () {
  for (var i = 0; i < OFFER_COUNT; i++) {
    var locX = getRandomInt(300, 900);
    var locY = getRandomInt(100, 500);

    var newOffer = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png',
      },

      'offer': {
        'title': offerTitles[i],
        'address': locX + ' ,' + locY,
        'price': getRandomInt(1000, 1000000),
        'type': offerTypes[getRandomInt(0, offerTypes.length - 1)],
        'rooms': getRandomInt(1, 5),
        'guests': getRandomInt(1, 12),
        'checkin': offerCheckins[getRandomInt(0, offerCheckins.length - 1)],
        'checkout': offerCheckouts[getRandomInt(0, offerCheckouts.length - 1)],
        'features': getRandomArray(offerFeatures),
        'description': '',
        'photos': []
      },

      'location': {
        'x': locX,
        'y': locY
      }
    };
    offers.push(newOffer);
  }
};

// Создаем объекты объявлений
createOfferObject();


// Создание DOM Элемента

var firstOffer = offers[0];

// Создаем фрагмент документа
var fragment = document.createDocumentFragment();

// Создание ДОМ элементов
var createDomElements = function () {
  for (var i = 0; i < OFFER_COUNT; i++) {
    var newElement = document.createElement('div');
    var newPicture = document.createElement('img');

    newElement.className = 'pin';
    newElement.style.left = offers[i].location.x + 'px';
    newElement.style.top = offers[i].location.y + 'px';
    newElement.id = 'pin' + i;
    newElement.setAttribute('value', i);

    newPicture.className = 'rounded';
    newPicture.src = offers[i].author.avatar;
    newPicture.setAttribute('tabindex', 0);
    newPicture.width = 40;
    newPicture.height = 40;

    newElement.appendChild(newPicture);

    fragment.appendChild(newElement);
  }
};

// Создаем ДОМ элементы
createDomElements();

// Добавляем ДОМ элеметы в документ
var tokioMap = document.querySelector('.tokyo__pin-map');
tokioMap.appendChild(fragment);

// Наполнение ДОМ элементов содержимым
var createOffer = function (obj) {
  var lodgeTemplate = document.querySelector('#lodge-template').content.cloneNode(true);
  var dialogCard = lodgeTemplate.querySelector('.dialog__panel');

// Селектор типа жилья
  var translateOfferType = function (elem) {
    if (elem === 'flat') {
      return 'Квартира';
    } else if (elem === 'bungalo') {
      return 'Бунгало';
    } else if (elem === 'house') {
      return 'Дом';
    } else {
      return 'Не определено';
    }
  };

// Создание фич из массива
  var showFeatures = function (arr) {
    var codeFeatures = '';
    for (var i = 0; i < arr.length; i++) {
      codeFeatures += '<span class="feature__image feature__image--' + arr[i] + '"></span>';
    }
    return codeFeatures;
  };

  dialogCard.querySelector('.lodge__title').textContent = obj.offer.title;

  dialogCard.querySelector('.lodge__address').textContent = obj.offer.address;

  dialogCard.querySelector('.lodge__price').innerHTML = obj.offer.price + ' Руб/ночь';

  dialogCard.querySelector('.lodge__type').textContent = translateOfferType(obj.offer.type);

  dialogCard.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + obj.offer.guests + ' гостей в ' + obj.offer.rooms + ' комнатах';

  dialogCard.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;

  dialogCard.querySelector('.lodge__features').innerHTML = showFeatures(obj.offer.features);

  dialogCard.querySelector('.lodge__description').textContent = obj.offer.description;

  document.querySelector('.dialog__title img[alt=Avatar]').src = obj.author.avatar;

  return dialogCard;
};

// Отрисовка элемента в карточке
var renderDialogCard = function (element) {
  var dialogPanel = document.querySelector('.dialog__panel');
  dialogPanel.innerHTML = '';
  dialogPanel.appendChild(element);
};

// Отрисуем элемент в карточке
renderDialogCard(createOffer(firstOffer));

// ///////////Module4-task1

var pinsArray = tokioMap.querySelectorAll('.pin');
var dialogBlock = document.querySelector('.dialog');
var dialogClose = dialogBlock.querySelector('.dialog__close');

// Убрать класс 'active' у пинов
var removeClassActive = function () {
  for (var i = 0; i < pinsArray.length; i++) {
    pinsArray[i].classList.remove('pin--active');
  }
};

var showCard = function (evt) {
  var index = evt.target.parentNode.getAttribute('value');
  dialogBlock.classList.remove('hidden');
  renderDialogCard(createOffer(offers[index]));
};

// Закрыть карточку
var onCloseButtonClick = function () {
  dialogBlock.classList.add('hidden');
  removeClassActive();
};

// Выбрать пин и отрисовать в карточке (клик)
var onPinClick = function (evt) {
  removeClassActive();
  if (evt.target.className === 'rounded') {
    evt.target.parentNode.classList.toggle('pin--active');
  }
  showCard(evt);
};

// Выбрать пин и отрисовать в карточке (клавиатура)
var onKeyPress = function (evt) {
  if (evt.keyCode === 13) {
    evt.target.parentNode.classList.toggle('pin--active');
    showCard(evt);
  }
};

// Установливаем фокус на первом пине
tokioMap.querySelector('#pin0 .rounded').focus();

// Добавляем обработчики для пинов
tokioMap.addEventListener('click', onPinClick);
tokioMap.addEventListener('keydown', onKeyPress);

// Добавляем обработчик для закрытия карточки
dialogClose.addEventListener('click', onCloseButtonClick);


// ***********************************************
// Module4-task2

var formContent = document.querySelector('.form__content');

var timeArrive = formContent.querySelector('#time');
var timeLeft = formContent.querySelector('#timeout');
var houseType = formContent.querySelector('#type');
var housePrice = formContent.querySelector('#price');
var roomNumber = formContent.querySelector('#room_number');
var guestsCount = formContent.querySelector('#capacity');

//   Связка время заезда и выезда
var changeTimeIn = function () {
  var index = timeArrive.selectedIndex;
  timeLeft.selectedIndex = index;
};

var changeTimeOut = function () {
  var index = timeLeft.selectedIndex;
  timeArrive.selectedIndex = index;
};

//   Связка тип жилья и стоимость
var changeSelectHouse = function () {
  switch (houseType.value) {
    case 'Квартира':
      housePrice.value = 1000;
      break;
    case 'Лачуга':
      housePrice.value = 0;
      break;
    case 'Дворец':
      housePrice.value = 10000;
      break;
  }
};

var changeSelectRooms = function () {
  switch (roomNumber.selectedIndex) {
    case 0:
      guestsCount.selectedIndex = 1;
      break;
    case 1:
      guestsCount.selectedIndex = 0;
      break;
    case 2:
      guestsCount.selectedIndex = 0;
      break;
  }
};

var validateForm = function (evt) {
  var formElement = evt.target;
  switch (formElement) {
    case (houseType):
      changeSelectHouse();
      break;
    case (roomNumber):
      changeSelectRooms();
      break;
    case (timeArrive):
      changeTimeIn();
      break;
    case (timeLeft):
      changeTimeOut();
      break;
  }
};

formContent.addEventListener('change', validateForm);

// console.dir(roomNumber);
