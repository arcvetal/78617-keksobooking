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

  //   Связка время заезда и выезда
  var changeTimeIn = function () {
    var index = timeArrive.selectedIndex;
    timeLeft.selectedIndex = index;
  };

  var changeTimeOut = function () {
    var index = timeLeft.selectedIndex;
    timeArrive.selectedIndex = index;
  };

  //   Связка тип жилья и стоимость
  var changeSelectHouse = function () {
    switch (houseType.value) {
      case 'Квартира':
        housePrice.value = 1000;
        break;
      case 'Лачуга':
        housePrice.value = 0;
        break;
      case 'Дворец':
        housePrice.value = 10000;
        break;
    }
  };

  var changeSelectRooms = function () {
    switch (roomNumber.selectedIndex) {
      case 0:
        guestsCount.selectedIndex = 1;
        break;
      case 1:
        guestsCount.selectedIndex = 0;
        break;
      case 2:
        guestsCount.selectedIndex = 0;
        break;
    }
  };

  var validateForm = function (evt) {
    var formElement = evt.target;
    switch (formElement) {
      case (headline):
        validateHeadline();
        break;
      case (housePrice):
        validatePrice();
        break;
      case (houseType):
        changeSelectHouse();
        break;
      case (roomNumber):
        changeSelectRooms();
        break;
      case (timeArrive):
        changeTimeIn();
        break;
      case (timeLeft):
        changeTimeOut();
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
