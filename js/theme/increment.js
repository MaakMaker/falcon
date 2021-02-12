'use strict';

import utils from './Utils';

/*-----------------------------------------------
|   Incrment/Decrement Input Fields
-----------------------------------------------*/
utils.$document.ready(() => {

  const Selector = {
    DATA_FIELD: '[data-field]',
    INPUT_GROUP: '.input-group'
  }
  const DATA_KEY = {
    FIELD: 'field',
    TYPE: 'type'
  }
  const Events = { CLICK: 'click' }
  const Attributes = { MIN: 'min' }

  utils.$document.on(Events.CLICK, Selector.DATA_FIELD, (e) => {
    const $this = $(e.target);
    const inputField = $this.data(DATA_KEY.FIELD);
    const $inputField = $this.parents(Selector.INPUT_GROUP).children('.' + inputField);
    const $btnType = $this.data(DATA_KEY.TYPE);
    let value = parseInt($inputField.val(), 10);
    let min = $inputField.attr(Attributes.MIN);
    
    if(min)
      min = parseInt(min, 10);
    else
      min = 0;

    if($btnType === 'plus'){
      value += 1
    }else{
      if(value > min)
        value -= 1
    }
    $inputField.val(value);
  });

});
