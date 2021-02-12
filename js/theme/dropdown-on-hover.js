'use strict';

import utils from './Utils';


/*-----------------------------------------------
|   Documentation and Component Navigation
-----------------------------------------------*/
utils.$document.ready(() => {

  const Selector = {
    NAVBAR_THEME_DROPDOWN: '.navbar-theme .dropdown',
    DROPDOWN_ON_HOVER: '.dropdown-on-hover',
    DROPDOWN_MENU: '.dropdown-menu',
    DATA_TOGGLE_DROPDOWN: '[data-toggle="dropdown"]',
    BODY: 'body',
    DROPDOWN_MENU_ANCHOR: '.dropdown-menu a'

  }

  const ClassName = {
    DROPDOWN_ON_HOVER: 'dropdown-on-hover',
    SHOW: 'show',
  }

  const Event = { 
    CLICK: 'click',
    MOUSE_LEAVE: 'mouseleave',
    MOUSE_EVENT: 'mouseenter mouseleave'
  }

  const Attribute = { ARIA_EXPANDED: 'aria-expanded' }

  const $navbarDropdown = $(Selector.NAVBAR_THEME_DROPDOWN);

  if(!window.is.mobile()){
    $navbarDropdown.addClass(ClassName.DROPDOWN_ON_HOVER);
  }else{
    $navbarDropdown.removeClass(ClassName.DROPDOWN_ON_HOVER);
  }

  const toggleDropdown = (e) => {
    const $el = $(e.target);
    let dropdown = $el.closest(Selector.DROPDOWN_ON_HOVER),
        dropdownMenu = $(Selector.DROPDOWN_MENU, dropdown);
    
    setTimeout(() => {
        let shouldOpen = e.type !== Event.CLICK && dropdown.is(':hover');
        dropdownMenu.toggleClass(ClassName.SHOW, shouldOpen);
        dropdown.toggleClass(ClassName.SHOW, shouldOpen);
    
        $(Selector.DATA_TOGGLE_DROPDOWN, dropdown).attr(Attribute.ARIA_EXPANDED, shouldOpen);
    }, e.type === Event.MOUSE_LEAVE ? 100 : 0);
  }
  
  $(Selector.BODY).on(Event.MOUSE_EVENT, Selector.DROPDOWN_ON_HOVER, toggleDropdown)
           .on(Event.CLICK, Selector.DROPDOWN_MENU_ANCHOR, toggleDropdown);

})