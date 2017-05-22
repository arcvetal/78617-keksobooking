'use strict';

var mainPin = document.querySelector('.pin__main');

var mapSurface = document.querySelector('.tokyo');
var addressInput = document.getElementById('address');
// console.dir(addressInput);

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
    addressInput.value = 'X: ' + startCoords.x + '  Y: ' + startCoords.y;
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
