'use strict';
var offers = [];
var OFFER_COUNT = 8;
var offerTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var offerTypes = ['flat', 'house', 'bungalo'];
var offerCheckins = ['12:00', '13:00', '14:00'];
var offerCheckouts = ['12:00', '13:00', '14:00'];
var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var getRandomArray = function (array) {
  return array.slice(0, Math.floor(Math.random() * array.length));
};

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

for (var i = 0; i < OFFER_COUNT; i++) {
  var newOffer = {
    'author': {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png',
    },

    'offer': {
      'title': offerTitles[i],
      'address': function () {
        return newOffer.location.x + ',' + newOffer.location.y;
      },
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
      'x': getRandomInt(300, 900),
      'y': getRandomInt(100, 500)
    }
  };
  offers.push(newOffer);
}
