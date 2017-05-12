'use strict';

var tokioMap = document.querySelector('.tokyo__pin-map');
var dialogBlock = document.querySelector('.dialog');
var dialogClose = dialogBlock.querySelector('.dialog__close');
var OFFER_COUNT = 8;

window.renderMap = (function () {
  var offersArray = window.createData(OFFER_COUNT);
  window.createPin(offersArray);

  var pinsArray = tokioMap.querySelectorAll('.pin');

  // Убрать класс 'active' у пинов
  var removeClassActive = function () {
    for (var i = 0; i < pinsArray.length; i++) {
      pinsArray[i].classList.remove('pin--active');
    }
  };

  var showCard = function (evt) {
    var index = evt.target.parentNode.getAttribute('value');
    dialogBlock.classList.remove('hidden');
    window.renderCard((offersArray[index]));
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

  return {
    onPinClick: onPinClick,
    onKeyPress: onKeyPress,
    onCloseButtonClick: onCloseButtonClick
  };
})();


//  Отобразим первое объявление по умолчанию

(function () {
  var firstDataElement = window.createData(OFFER_COUNT)[0];
  window.renderCard(firstDataElement);
})();


// Установливаем фокус на первом пине
tokioMap.querySelector('#pin0 .rounded').focus();

// Добавляем обработчики для пинов
tokioMap.addEventListener('click', window.renderMap.onPinClick);
tokioMap.addEventListener('keydown', window.renderMap.onKeyPress);

// Добавляем обработчик для закрытия карточки
dialogClose.addEventListener('click', window.renderMap.onCloseButtonClick);
