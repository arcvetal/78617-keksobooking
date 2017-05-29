'use strict';

window.synchronizeFields = (function (firstField, secondField, firstValue, secondValue, callback) {
  firstField.addEventListener('change', function () {
    var index = firstValue.indexOf(firstField.value);
    var finalValue = secondValue[index];
    callback(secondField, finalValue);
  });
});
