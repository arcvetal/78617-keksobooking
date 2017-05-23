'use strict';

var mainPin = document.querySelector('.pin__main');

var mapSurface = document.querySelector('.tokyo');
var addressInput = document.getElementById('address');
// console.dir(addressInput);

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

// console.log(mainPin);

// ******************************** ОГРАНИЧЕНИЕ ОБЛАСТИ ПЕРЕМЕЩЕНИЯ ПИНА

// var mapSurfaceWidth = mapSurface.offsetWidth;
// var mapSurfaceHeight = mapSurface.offsetHeight;
// var mapLeftBorder = mapSurface.getBoundingClientRect().left;
// var mapTopBorder = mapSurface.getBoundingClientRect().top;
// var mapMinX = mapLeftBorder + (mainPinWidth / 2);
// var mapMaxX = mapLeftBorder + mapSurfaceWidth - (mainPinWidth / 2);
// var mapMinY = mapTopBorder + mainPinHeight;
// var mapMaxY = mapTopBorder + mapSurfaceHeight - mainPinHeight;

// //   установим границы карты
// var setMapBorder = function (addressValue) {
//   var coordsArray = addressValue.split(', ');
//
//   var coordX = coordsArray[0].slice(3);
//   var coordY = coordsArray[1].slice(3);
//
//   if (coordX > mapMaxX) {
//     coordX = mapMaxX;
//   } else if (coordX < mapMinX) {
//     coordX = mapMinX;
//   }
//
//   if (coordY > mapMaxY) {
//     coordY = mapMaxY;
//   } else if (coordY < mapMinY) {
//     coordY = mapMinY;
//   }
//
//   mainPin.style.top = coordY - mainPinHeight + 'px';
//   mainPin.style.left = coordX - (mainPinWidth / 2) + 'px';
// };
//
// addressInput.addEventListener('change', function () {
//   setMapBorder(addressInput.value);
// });
