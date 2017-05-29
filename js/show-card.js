'use strict';

window.showCard = (function () {
  var dialogBlock = document.querySelector('.dialog');
  var pinsArray = document.querySelectorAll('[id^="pin"]');

  // Убрать класс 'active' у пинов
  var removeClassActive = function () {
    for (var i = 0; i < pinsArray.length; i++) {
      pinsArray[i].classList.remove('pin--active');
    }
  };

  var showDescr = function (evt, array) {
    var index = evt.target.parentNode.getAttribute('value');

    removeClassActive();
    if (evt.target.className === 'rounded') {
      evt.target.parentNode.classList.toggle('pin--active');
    }
    dialogBlock.classList.remove('hidden');
    window.renderCard((array[index]));
  };

  var hideDescr = function () {
    dialogBlock.classList.add('hidden');
    removeClassActive();
  };

  return {
    showDescr: showDescr,
    hideDescr: hideDescr
  };
})();
