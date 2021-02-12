'use strict';

/*-----------------------------------------------
|   Dashboard Table dropdown
-----------------------------------------------*/
window.utils.$document.ready(() => {
  
  // Only for ios
  if(window.is.ios()){
    const Event  = {
      SHOWN_BS_DROPDOWN: 'shown.bs.dropdown',
      HIDDEN_BS_DROPDOWN: 'hidden.bs.dropdown'
    }
    const Selector = {
      TABLE_RESPONSIVE: '.table-responsive',
      DROPDOWN_MENU: '.dropdown-menu'
    }  
    $(Selector.TABLE_RESPONSIVE).on(Event.SHOWN_BS_DROPDOWN, function dashboardTableDropdown(e) {
      var t = $(this), 
          m = $(e.target).find(Selector.DROPDOWN_MENU),
          tb = t.offset().top + t.height(),
          mb = m.offset().top + m.outerHeight(true),
          d = 20; // Space for shadow + scrollbar.   
        if (t[0].scrollWidth > t.innerWidth()) {
            if (mb + d > tb) {
                t.css('padding-bottom', ((mb + d) - tb));  
            }
        } else {
            t.css('overflow', 'visible');
        }
    }).on(Event.HIDDEN_BS_DROPDOWN, function(e) {
      const $this = $(e.currentTarget);
      $this.css({'padding-bottom': '', 'overflow': ''});
    });
  }


});

// Reference
// https://github.com/twbs/bootstrap/issues/11037#issuecomment-274870381