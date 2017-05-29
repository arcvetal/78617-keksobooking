'use strict';

var formContent = document.querySelector('.form__content');
var formSubmit = document.querySelector('.form__submit');

window.useForm = (function () {

  var headline = document.querySelector('#title');

  var timeArrive = formContent.querySelector('#time');
  var timeLeft = formContent.querySelector('#timeout');
  var houseType = formContent.querySelector('#type');
  var housePrice = formContent.querySelector('#price');
  var roomNumber = formContent.querySelector('#room_number');
  var guestsCount = formContent.querySelector('#capacity');

  var timeValues = ['12', '13', '14'];
  var roomsValues = ['1', '2', '100'];
  var capacityValues = ['0', '3', '3'];
  var houseTypeValues = ['Квартира', 'Лачуга', 'Дворец'];
  var priceValues = ['1000', '0', '10000'];

  //      Валидация заголовка
  var validateHeadline = function () {
    if (headline.value.length < 30 || headline.value.length > 100) {
      headline.setAttribute('style', 'border : 2px solid red');
      return;
    }
    headline.setAttribute('style', 'border : 1px solid #d9d9d3');
  };

  //      Валидация цены
  var validatePrice = function () {
    if (housePrice.value < 1000 || housePrice.value > 1000000) {
      housePrice.setAttribute('style', 'border : 2px solid red');
      return;
    }
    housePrice.setAttribute('style', 'border : 1px solid #d9d9d3');
  };

  var syncValues = function (element, value) {
    element.value = value;
  };

  window.synchronizeFields(timeArrive, timeLeft, timeValues, timeValues, syncValues);

  window.synchronizeFields(timeLeft, timeArrive, timeValues, timeValues, syncValues);

  window.synchronizeFields(houseType, housePrice, houseTypeValues, priceValues, syncValues);

  window.synchronizeFields(housePrice, houseType, priceValues, houseTypeValues, syncValues);

  window.synchronizeFields(roomNumber, guestsCount, roomsValues, capacityValues, syncValues);

  var validateForm = function (evt) {
    var formElement = evt.target;
    switch (formElement) {
      case (headline):
        validateHeadline();
        break;
      case (housePrice):
        validatePrice();
        break;
    }
  };

  var validateSubmit = function () {
    validateHeadline();
    validatePrice();
  };

  return {
    validateForm: validateForm,
    validateSubmit: validateSubmit
  };
})();

formContent.addEventListener('change', window.useForm.validateForm);
formSubmit.addEventListener('click', window.useForm.validateSubmit);
