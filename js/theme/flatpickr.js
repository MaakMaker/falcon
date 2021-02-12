/*-----------------------------------------------
|   Flatpickr
-----------------------------------------------*/

window.utils.$document.ready(() => {
  const datetimepicker = $('.datetimepicker');
  datetimepicker.length && datetimepicker.each((index, value) => {
    const $this = $(value);
    const options = $.extend({dateFormat: 'd/m/y', disableMobile: true }, $this.data('options'));
    $this.attr('placeholder', options.dateFormat);
    $this.flatpickr(options);
  });
});
