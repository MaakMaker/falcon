'use strict';

import utils from './Utils';

/*-----------------------------------------------
|   Modal
-----------------------------------------------*/

utils.$document.ready(() => {
  const Selector = {
    MODAL_THEME: '.modal-theme',
  }
  const DataKey = {
    OPTIONS: 'options',
  }
  const Events = {
    HIDDEN_BS_MODAL: 'hidden.bs.modal'
  }
  const modals = $(Selector.MODAL_THEME);
  let showModal = true;
  const getCookie = (name) => {
    var keyValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : keyValue;
  }
  const setCookie = (name, value, expire) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + expire );
    document.cookie = name + '=' + value + ';expires=' + expires.toUTCString();
  }

 
  if(!!modals.length){
    modals.each((index, value) => {
      const $this = $(value);
      const userOptions = $this.data(DataKey.OPTIONS);
      const options = $.extend({ autoShow: false, autoShowDelay: 0, showOnce: false}, userOptions);
      if(options.showOnce){
        const modal = getCookie('modal');
        showModal = modal === null ? true : false;
      }
      if(options.autoShow && showModal){
        setTimeout(() => {
          $this.modal('show');
        }, options.autoShowDelay)
      }
    })
  }

  $(Selector.MODAL_THEME).on(Events.HIDDEN_BS_MODAL , (e) => {
    const $this = $(e.currentTarget);
    const userOptions = $this.data(DataKey.OPTIONS);
    const options = $.extend({ cookieExpireTime: 7200000, showOnce: false}, userOptions);
    options.showOnce && setCookie('modal', false, options.cookieExpireTime);

  })
});
