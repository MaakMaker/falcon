'use strict';

import utils from './Utils';
/*-----------------------------------------------
|   Bootstrap Wizard
-----------------------------------------------*/
utils.$document.ready(() => {

  const Selector = {
    DATA_WIZARD: '[data-wizard]',
    PREVIOUS_BUTTON: '.previous .btn',
    TAB_PANE: '.tab-pane',
    FORM_VALIDATION: '.form-validation',
    NAV_ITEM_CIRCLE: '.nav-item-circle',
    NAV_ITEM: '.nav-item',
    NAV_LINK: '.nav-link',
    WIZARD_LOTTIE: '.wizard-lottie'
  }
  const ClassName = {
    ACTIVE: 'active',
    DONE: 'done',
    NAV: 'nav'
  }

  const DATA_KEY = {
    OPTIONS: 'options',
    WIZARD_STATE: 'wizard-state',
    CONTROLLER: 'controller',
    ERROR_MODAL: 'error-modal',
  }

  const wizards = $(Selector.DATA_WIZARD);


  const isFormValidate = ($currentTab) => {
    const $currentTabForms = $currentTab.find(Selector.FORM_VALIDATION);
    let isValidate = false;

    $currentTabForms.each((i, v) => {
      isValidate = $(v).valid();
      return isValidate;
    });
    return isValidate;
  }

  !!wizards.length && wizards.each((index, value) => {
    const $this = $(value);
    const controller = $this.data(DATA_KEY.CONTROLLER);
    const $controller = $(controller);
    const $buttonPrev = $controller.find(Selector.PREVIOUS_BUTTON);
    const $modal = $($this.data(DATA_KEY.ERROR_MODAL));
    const $lottie = $(value).find(Selector.WIZARD_LOTTIE);
    const options = $.extend({
      container: value.querySelector(Selector.WIZARD_LOTTIE),
      renderer: 'svg',
      loop: true,
      autoplay: false,
      name: "Hello World"
    }, $lottie.data(DATA_KEY.OPTIONS));
    
    const animation = window.bodymovin.loadAnimation(options);
    
    $this.bootstrapWizard({
      tabClass: ClassName.NAV,
      onNext: function(tab, navigation, idx){
        const $currentTab = $this.find(Selector.TAB_PANE).eq(idx - 1);
        return isFormValidate($currentTab);
      },
      onTabClick(tab, navigation, idx, clickedIndex){

        const stepDone = $this.find(`.nav-item:nth-child(${clickedIndex + 1}) .nav-link`).data(DATA_KEY.WIZARD_STATE);
        
        if(stepDone === 'done'){
          $modal.modal('show');
          return false;
        }

        if(clickedIndex <= idx){
          return true;
        }

        let isValid = true;
        $this.find(Selector.TAB_PANE).each((tabIndex, tabValue) => {
          if(tabIndex < clickedIndex){
            $this.bootstrapWizard('show', tabIndex);
            isValid = isFormValidate($(tabValue));
          }
          return isValid;
        })
        return isValid;

      },
      onTabShow: function (tab, navigation, idx){
        const length = navigation.find('li').length - 1;

        idx === 0 ? $buttonPrev.hide() : $buttonPrev.show();
        idx === length  && setTimeout(() => animation.play(), 300);

        $this.find(Selector.NAV_LINK).removeClass(ClassName.DONE);
        $this.find(Selector.NAV_ITEM).each((i, v) => {
          const link = $(v).find(Selector.NAV_LINK);
          if(idx === length && !link.hasClass(ClassName.ACTIVE)){
            link.attr('data-wizard-state', 'done');
            
          }
          if(!link.hasClass(ClassName.ACTIVE)){
            link.addClass(ClassName.DONE)
            return true;
          }
          if(idx === length){
            link.addClass(ClassName.DONE);
            $controller.hide();
          }
          return false
        })
      }
    });
  });

});
