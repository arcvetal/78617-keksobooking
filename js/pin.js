'use strict';

window.createPin = (function () {
  var tokioMap = document.querySelector('.tokyo__pin-map');

  // Создаем фрагмент документа
  var fragment = document.createDocumentFragment();

  // Создание ДОМ элементов
  var createDomElements = function (array) {

    for (var i = 0; i < array.length; i++) {
      var newElement = document.createElement('div');
      var newPicture = document.createElement('img');

      newElement.className = 'pin';
      newElement.style.left = array[i].location.x + 'px';
      newElement.style.top = array[i].location.y + 'px';
      newElement.id = 'pin' + i;
      newElement.setAttribute('value', i);

      newPicture.className = 'rounded';
      newPicture.src = array[i].author.avatar;
      newPicture.setAttribute('tabindex', 0);
      newPicture.width = 40;
      newPicture.height = 40;

      newElement.appendChild(newPicture);
      fragment.appendChild(newElement);
    }

    tokioMap.appendChild(fragment);
  };

  // Создаем ДОМ элементы
  return function (someArr) {
    return createDomElements(someArr);
  };
})();
