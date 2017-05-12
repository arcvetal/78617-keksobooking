'use strict';

window.renderCard = (function () {

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

  //   Наполненение содержимым
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

  // Отрисовка карточки
  var renderDialogCard = function (element) {
    var newCard = createOffer(element);
    var dialogPanel = document.querySelector('.dialog__panel');
    dialogPanel.innerHTML = '';
    dialogPanel.appendChild(newCard);
  };

  // Отрисуем элемент в карточке
  return function (arrItem) {
    return renderDialogCard(arrItem);
  };
})();
