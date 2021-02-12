/*-----------------------------------------------
|   Lottie
-----------------------------------------------*/
window.utils.$document.ready(() => {
  const lotties = $(".lottie");
  if(lotties.length){
    lotties.each((index, value) => {   
      const $this = $(value);
      const options = $.extend({
        container: value,
        path: '../img/animated-icons/warning-light.json',
        renderer: 'svg',
        loop: true,
        autoplay: true,
        name: "Hello World",
      }, $this.data('options')); 
      window.bodymovin.loadAnimation(options)
    });
  }
});
