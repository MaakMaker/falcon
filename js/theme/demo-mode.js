'use strict';

/*-----------------------------------------------
|   Demo mode
-----------------------------------------------*/

window.utils.$document.ready(() => {
  const { utils, location } = window;

  const Event = { CHANGE: 'change' }

  const Selector = {
    RTL: '#mode-rtl',
    FLUID: '#mode-fluid',
    INPUT_NAVBAR: "input[name='navbar']",
    INPUT_COLOR_SCHEME: "input[name='colorScheme']"
  }

  const DATA_KEY = { 
    URL: 'url',
    HOME_URL: 'home-url',
    PAGE_URL: 'page-url',
  }

  // Redirect on Checkbox change
  const handleChange = (selector) => {
    utils.$document.on(Event.CHANGE, selector, (e) => {
      const $this = $(e.currentTarget);
      const isChecked = $this.prop('checked');
      if(isChecked){
        const url = $this.data(DATA_KEY.URL);
        location.replace(url);
      }else{
        const homeUrl = $this.data(DATA_KEY.HOME_URL);
        location.replace(homeUrl);
      }

    });
  }

  const handleInputChange = (selector) => {
    utils.$document.on(Event.CHANGE, selector, (e) => {
      const $this = $(e.currentTarget);
      const pageUrl = $this.data(DATA_KEY.PAGE_URL);
      location.replace(pageUrl);
    })
  }
  
  // Mode checkbox handler
  handleChange(Selector.RTL);
  handleChange(Selector.FLUID);
  handleInputChange(Selector.INPUT_NAVBAR);
  handleInputChange(Selector.INPUT_COLOR_SCHEME);

});
