'use strict';

import utils from './Utils';

/*
 global ProgressBar
*/

utils.$document.ready(() => {
  const { merge } = window._;
  
  // progressbar.js@1.0.0 version is used
  // Docs: http://progressbarjs.readthedocs.org/en/1.0.0/

  /*-----------------------------------------------
  |   Progress Circle
  -----------------------------------------------*/
  const progresCircle = $('.progress-circle');
  if (progresCircle.length) {
    progresCircle.each((index, value) => {
      const $this = $(value);
      const userOptions = $this.data('options');

      const defaultOptions = {
        strokeWidth: 2,
        trailWidth: 2,
        trailColor: utils.grays['200'],
        easing: 'easeInOut',
        duration: 3000,
        svgStyle: {
          'stroke-linecap': 'round',
          display: 'block',
          width: '100%',
        },
        text: {
          autoStyleContainer: false,
        },
        // Set default step function for all animate calls
        step: (state, circle) => {
          // Change stroke color during progress
          // circle.path.setAttribute('stroke', state.color);
          
          // Change stroke width during progress
          // circle.path.setAttribute('stroke-width', state.width); 

          const percentage = Math.round(circle.value() * 100);
          circle.setText(`<span class='value'>${percentage}<b>%</b></span> <span>${userOptions.text || ''}</span>`);
        },
      };

      // Assign default color for IE
      if(window.is.ie()){  userOptions.color = utils.colors.primary; }
      const options = merge(defaultOptions, userOptions);
     
      const bar = new ProgressBar.Circle(value, options);
      let linearGradient = `<defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color='#1970e2' />
            <stop offset="100%" stop-color='#4695ff' />
          </linearGradient>
        </defs>`;

      // Disable gradient color in IE
      !window.is.ie() && bar.svg.insertAdjacentHTML('beforeEnd', linearGradient);

      let playProgressTriggered = false;
      const progressCircleAnimation = () => {
        if (!playProgressTriggered) {
          if (utils.isScrolledIntoView(value) || utils.nua.match(/puppeteer/i)) {
            bar.animate(options.progress / 100);
            playProgressTriggered = true;
          }
        }
        return playProgressTriggered;
      };
      progressCircleAnimation();
      utils.$window.scroll(() => {
        progressCircleAnimation();
      });
    });
  }

  /*-----------------------------------------------
  |   Progress Line
  -----------------------------------------------*/
  const progressLine = $('.progress-line');
  if (progressLine.length) {
    progressLine.each((index, value) => {
      const $this = $(value);
      const options = $this.data('options');

      const bar = new ProgressBar.Line(value, {
        strokeWidth: 1,
        easing: 'easeInOut',
        duration: 3000,
        color: '#333',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: {
          width: '100%',
          height: '0.25rem',
          'stroke-linecap': 'round',
          'border-radius': '0.125rem',
        },
        text: {
          style: { transform: null },
          autoStyleContainer: false,
        },
        from: { color: '#aaa' },
        to: { color: '#111' },
        step(state, line) {
          line.setText(`<span class='value'>${Math.round(line.value() * 100)}<b>%</b></span> <span>${options.text}</span>`);
        },
      });
      let playProgressTriggered = false;
      const progressLineAnimation = () => {
        if (!playProgressTriggered) {
          if (utils.isScrolledIntoView(value) || utils.nua.match(/puppeteer/i)) {
            bar.animate(options.progress / 100);
            playProgressTriggered = true;
          }
        }
        return playProgressTriggered;
      };
      progressLineAnimation();
      utils.$window.scroll(() => {
        progressLineAnimation();
      });
    });
  }
});