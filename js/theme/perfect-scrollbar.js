import PerfectScrollbar from "../../pages/assets/lib/perfect-scrollbar/perfect-scrollbar";

/*-----------------------------------------------
|   Perfect Scrollbar
-----------------------------------------------*/
window.utils.$document.ready(() => {

  if(window.is.ie() || window.is.edge()){
    const scrollbars = document.querySelectorAll('.perfect-scrollbar');
    if(scrollbars.length){
      $.each(scrollbars, (item, value) => {
        const $this = $(value);
        const userOptions = $this.data('options');
        const options = $.extend({
          wheelPropagation: true,
          suppressScrollX : true,
          suppressScrollY: false,
        }, userOptions);
        
        const ps = new PerfectScrollbar(value, options);
        ps.update();
      });
    }
  }
});
