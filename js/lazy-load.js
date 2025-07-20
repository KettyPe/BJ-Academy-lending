// Lasy load библиотек для лендинга
(function () {
     'use strict';

     function loadInputMask() {
          if (!window.inputMaskLoaded) {
               const script = document.createElement('script');
               script.src = 'js/libs/inputmask.min.js';
               script.onload = () => {
                    window.inputMaskLoaded = true;
                    if (typeof Inputmask !== 'undefined') {
                         const inputMasks = document.querySelectorAll(".input-tell");
                         if (inputMasks.length > 0) Inputmask({
                              mask: "+7 (999) 999-9999"
                         }).mask(inputMasks);
                    }
               };
               document.head.appendChild(script);
          }
     }

     function loadFancybox() {
          if (!window.fancyboxLoaded) {
               const script = document.createElement('script');
               script.src = 'js/libs/fancybox.min.js';
               script.onload = () => {
                    window.fancyboxLoaded = true;
                    // Инициализация Fancybox после загрузки
                    if (typeof Fancybox !== 'undefined') {
                         Fancybox.bind('[data-fancybox]', {
                              // Настройки Fancybox
                         });
                    }
               };
               document.head.appendChild(script);
          }
     }

     document.addEventListener('DOMContentLoaded', () => {
          const maskInputs = document.querySelectorAll(".input-tell");
          maskInputs.forEach(input => {
               input.addEventListener('focus', loadInputMask, { once: true });
          });

          const fancyboxElements = document.querySelectorAll('[data-fancybox]');
          fancyboxElements.forEach(element => {
               element.addEventListener('mouseenter', loadFancybox, { once: true });
               element.addEventListener('click', loadFancybox, { once: true });
          });
     });

})();