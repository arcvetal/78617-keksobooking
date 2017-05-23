'use strict';

var tokioMap = document.querySelector('.tokyo__pin-map');
var dialogBlock = document.querySelector('.dialog');
var dialogClose = dialogBlock.querySelector('.dialog__close');
var OFFER_COUNT = 8;

var mainPin = document.querySelector('.pin__main');
var mapSurface = document.querySelector('.tokyo');
var addressInput = document.getElementById('address');

window.renderMap = (function () {
  var offersArray = window.createData(OFFER_COUNT);
  window.createPin(offersArray);

  var pinsArray = tokioMap.querySelectorAll('[id^="pin"]');

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

  var dragPin = function () {
    var mainPinWidth = mainPin.offsetWidth;
    var mainPinHeight = mainPin.offsetHeight;

    mainPin.addEventListener('click', function (clickEvt) {
      clickEvt.stopPropagation();
    });

    mainPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        var pinCoords = mainPin.getBoundingClientRect();
        var pinCoordX = pinCoords.left + (mainPinWidth / 2);
        var pinCoordY = pinCoords.top + mainPinHeight;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
        addressInput.value = 'X: ' + pinCoordX + ', Y: ' + pinCoordY;
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        mapSurface.removeEventListener('mousemove', onMouseMove);
        mapSurface.removeEventListener('mouseup', onMouseUp);
      };

      mapSurface.addEventListener('mousemove', onMouseMove);
      mapSurface.addEventListener('mouseup', onMouseUp);
    });
  };

  return {
    onPinClick: onPinClick,
    onKeyPress: onKeyPress,
    onCloseButtonClick: onCloseButtonClick,
    dragPin: dragPin
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

// Активируем функцию, которая добаляет обработчики ДЛЯ ПЕРЕМЕЩИНИЯ ПИНА
window.renderMap.dragPin();

// Добавляем обработчик для закрытия карточки
dialogClose.addEventListener('click', window.renderMap.onCloseButtonClick);
