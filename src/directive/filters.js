/* eslint-disable */
import Vue from 'vue';

export const JustDigits = () => {
  Vue.directive('digitsonly', (el, binding) => {
    if (/[\d\.]+/i.test(el.value)) {
      console.log('ok');
    } else {
      let newValue = el.value.replace(/[a-zA-Z]+/gi, '');
      el.value = newValue;
      console.log('should fix', newValue);
      binding.value = el.value;
    }
  });
};
