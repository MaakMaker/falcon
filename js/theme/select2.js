/*-----------------------------------------------
|   Select2
-----------------------------------------------*/

window.utils.$document.ready(() => {
  const select2 = $('.selectpicker');
  select2.length && select2.each((index, value) => {
    const $this = $(value);
    const options = $.extend({},$this.data('options'));
    $this.select2(options);
  });
});