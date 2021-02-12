/*-----------------------------------------------
|   Dropzone
-----------------------------------------------*/

window.Dropzone ? window.Dropzone.autoDiscover = false : '';

window.utils.$document.ready(() => {

  const Selector = {
    DROPZONE: '[data-dropzone]',
    DZ_ERROR_MESSAGE: '.dz-error-message',
    DZ_PREVIEW: '.dz-preview',
    DZ_PROGRESS: '.dz-preview .dz-preview-cover .dz-progress',
    DZ_PREVIEW_COVER: '.dz-preview .dz-preview-cover',
  }

  const ClassName = {
    DZ_FILE_PROCESSING: 'dz-file-processing',
    DZ_FILE_COMPLETE: 'dz-file-complete',
    DZ_COMPLETE: 'dz-complete',
    DZ_PROCESSING: 'dz-processing'
  }

  const DATA_KEY = {
    OPTIONS: 'options'
  }

  const Events = {
    ADDED_FILE: 'addedfile',
    COMPLETE: 'complete'
  }

  const dropzones = $(Selector.DROPZONE);

  !!dropzones.length && dropzones.each((index, value) => {
    const element = value;
    const $this = $(element);
    let userOptions = $this.data(DATA_KEY.OPTIONS);
    userOptions = userOptions ? userOptions : {};
    const data = userOptions.data ? userOptions.data : {};
    const options = $.extend({
        url: '/assets/php/',
        addRemoveLinks: false,
        previewsContainer: element.querySelector(Selector.DZ_PREVIEW),
        previewTemplate: element.querySelector(Selector.DZ_PREVIEW).innerHTML,
        thumbnailWidth: null,
        thumbnailHeight: null,
        init: function init() {
          const thisDropzone = this;

          if(data.length){
            $.each(data, (i, v) => {
              const mockFile = { name: v.name, size: v.size };
              thisDropzone.options.addedfile.call(thisDropzone, mockFile);
              thisDropzone.options.thumbnail.call(thisDropzone, mockFile, `${v.url}/${v.name}`);
            })
          }

          thisDropzone.on(Events.ADDED_FILE, function addedfile() {
            if('maxFiles' in userOptions){
              if(userOptions.maxFiles === 1 && 
                $this.find(Selector.DZ_PREVIEW_COVER).length > 1){
                $this.find(Selector.DZ_PREVIEW_COVER).first().remove();
              }
              if(userOptions.maxFiles === 1 &&
                  this.files.length > 1){
                  this.removeFile(this.files[0]);
              }
            }
          });

        },

    }, userOptions);

    element.querySelector(Selector.DZ_PREVIEW).innerHTML = '';
    
    const dropzone = new window.Dropzone(value, options )

    dropzone.on(Events.ADDED_FILE, () => {
      $this.find(Selector.DZ_PREVIEW_COVER).removeClass(ClassName.DZ_FILE_COMPLETE);
      $this.addClass(ClassName.DZ_FILE_PROCESSING);
    })
    dropzone.on(Events.COMPLETE, () => {
      $this.find(Selector.DZ_PREVIEW_COVER).removeClass(ClassName.DZ_PROCESSING);
      $this.addClass(ClassName.DZ_FILE_COMPLETE);
    })
  });

});