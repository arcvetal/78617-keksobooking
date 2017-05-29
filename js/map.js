'use strict';

var tokioMap = document.querySelector('.tokyo__pin-map');
var dialogBlock = document.querySelector('.dialog');
var dialogClose = dialogBlock.querySelector('.dialog__close');
var OFFER_COUNT = 8;

var mainPin = document.querySelector('.pin__main');
var mapSurface = document.querySelector('.tokyo');
var addressInput = document.getElementById('address');

var offersArray = window.createData(OFFER_COUNT);
window.createPin(offersArray);

window.renderMap = (function () {

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
tokioMap.addEventListener('click', function (evt) {
  window.showCard.showDescr(evt, offersArray);
});

tokioMap.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    window.showCard.showDescr(evt, offersArray);
  }
});

// Активируем функцию, которая добаляет обработчики ДЛЯ ПЕРЕМЕЩИНИЯ ПИНА
window.renderMap.dragPin();

// Добавляем обработчик для закрытия карточки
dialogClose.addEventListener('click', function () {
  window.showCard.hideDescr();
});
