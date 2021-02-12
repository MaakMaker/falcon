'use strict';

import storage from './config.dark-mode'

/*-----------------------------------------------
|   Chart
-----------------------------------------------*/

window.utils.$document.ready(() => {
  /*-----------------------------------------------
  |   Helper functions and Data
  -----------------------------------------------*/

  const { utils } = window;
  const chartData = [
    3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4,
    6, 2, 6, 4, 3, 3, 8, 3, 2, 7, 9, 5, 0, 2, 8, 8, 4, 1, 9, 7,
  ];
  const labels = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];
  
  /*-----------------------------------------------
 |   Chart Initialization
 -----------------------------------------------*/
  const newChart = (chart, config) => {
    const ctx = chart.getContext('2d');
    return new window.Chart(ctx, config);
  };

  /*-----------------------------------------------
  |   Line Chart
  -----------------------------------------------*/
  const chartLine = document.getElementById('chart-line');
  if (chartLine) {

    const getChartBackground  = (chart) => {
      const ctx = chart.getContext('2d');
      if(storage.isDark){
        const gradientFill = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
        gradientFill.addColorStop(0, utils.rgbaColor(utils.colors.primary, 0.5));
        gradientFill.addColorStop(1, "transparent");
        return gradientFill;
      } else {
        const gradientFill = ctx.createLinearGradient(0, 0, 0, 250);
        gradientFill.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        gradientFill.addColorStop(1, 'rgba(255, 255, 255, 0)');
        return gradientFill;
      }
    }

    const dashboardLineChart = newChart(chartLine, {
      type: 'line',
      data: {
        labels: labels.map(label => label.substring(0, label.length - 3)),
        datasets: [
          {
            borderWidth: 2,
            data: chartData.map(d => (d * 3.14).toFixed(2)),
            borderColor: utils.settings.chart.borderColor,
            backgroundColor: getChartBackground(chartLine),
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        tooltips: {
          mode: 'x-axis',
          xPadding: 20,
          yPadding: 10,
          displayColors: false,
          callbacks: {
            label: tooltipItem => `${labels[tooltipItem.index]} - ${tooltipItem.yLabel} USD`,
            title: () => null,
          },
        },
        hover: {
          mode: 'label',
        },
        scales: {
          xAxes: [{
            scaleLabel: {
              show: true,
              labelString: 'Month',
            },
            ticks: {
              fontColor: utils.rgbaColor('#fff', 0.7),
              fontStyle: 600,
            },
            gridLines: {
              color: utils.rgbaColor('#fff', 0.1),
              zeroLineColor: utils.rgbaColor('#fff', 0.1),
              lineWidth: 1,
            },
          }],
          yAxes: [{ display: false }],
        },
      },
    });
    $('#dashboard-chart-select').on('change', (e) => {
      const LineDB = {
        all: [4, 1, 6, 2, 7, 12, 4, 6, 5, 4, 5, 10].map(d => (d * 3.14).toFixed(2)),
        successful: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8].map(d => (d * 3.14).toFixed(2)),
        failed: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2].map(d => (d * 3.14).toFixed(2)),
      };
      dashboardLineChart.data.datasets[0].data = LineDB[e.target.value];
      dashboardLineChart.update();
    });

  }



  /*-----------------------------------------------
  |   Bar Chart
  -----------------------------------------------*/
  const chartBar = document.getElementById('chart-bar');
  if (chartBar) {
    newChart(chartBar, {
      type: 'bar',
      data: {
        labels: labels.slice(0, 2),
        datasets: [
          {
            label: 'First dataset',
            backgroundColor: [
              utils.rgbaColor(utils.colors.info), 
              utils.rgbaColor(utils.colors.warning)
            ],
            borderColor: [utils.rgbColor(utils.colors.info), utils.rgbColor(utils.colors.warning)],
            borderWidth: 2,
            data: [6, 10],
          },
          {
            label: 'Second dataset',
            backgroundColor: [
              utils.rgbaColor(utils.colors.success), 
              utils.rgbaColor(utils.colors.danger)
            ],
            borderColor: [
              utils.rgbColor(utils.colors.success), 
              utils.rgbColor(utils.colors.danger)
            ],
            borderWidth: 2,
            data: [3, 7],
          },
        ],
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
      },
    });
  }

  /*-----------------------------------------------
  |   Radar Chart
  -----------------------------------------------*/
  const chartRadar = document.getElementById('chart-radar');
  if (chartRadar) {
    newChart(chartRadar, {
      type: 'radar',
      data: {
        labels,
        datasets: [
          {
            label: 'First dataset',
            backgroundColor: utils.rgbaColor(utils.colors.warning),
            borderColor: utils.rgbColor(utils.colors.warning),
            borderWidth: 2,
            data: chartData.slice(0, 12),
            fill: 1,
          },
          {
            label: 'Second dataset',
            backgroundColor: utils.rgbaColor(utils.colors.danger),
            borderColor: utils.rgbColor(utils.colors.danger),
            borderWidth: 2,
            data: chartData.slice(12, 24),
            fill: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: true,
        spanGaps: false,
        elements: {
          line: {
            tension: 0.000001,
          },
        },
      },
    });
  }

  /*-----------------------------------------------
  |   Pie Chart
  -----------------------------------------------*/
  
  const chartPie = document.getElementById('chart-pie');
  if (chartPie) {
    newChart(chartPie, {
      type: 'pie',
      data: {
        labels: labels.slice(0, 3),
        datasets: [
          {
            backgroundColor: utils.rgbaColors(),
            borderColor: utils.rgbColors(),
            data: chartData.slice(0, 3),
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }

  /*-----------------------------------------------
  |   Doughnut Chart
  -----------------------------------------------*/
  const chartDoughnut = document.getElementById('chart-doughnut');
  if (chartDoughnut) {
    newChart(chartDoughnut, {
      type: 'doughnut',
      data: {
        labels: labels.slice(0, 3),
        datasets: [
          {
            backgroundColor: utils.rgbColors(),
            borderColor: utils.rgbColors(),
            data: chartData.slice(0, 3),
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }

  /*-----------------------------------------------
  |   Polar Area Chart
  -----------------------------------------------*/
  const chartPolarArea = document.getElementById('chart-polar-area');
  if (chartPolarArea) {
    newChart(chartPolarArea, {
      type: 'polarArea',
      data: {
        labels: labels.slice(0, 3),
        datasets: [
          {
            backgroundColor: utils.rgbaColors(),
            borderColor: utils.rgbaColors(),
            data: chartData.slice(0, 3),
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }

  /* eslint-disable */
  /*-----------------------------------------------
  |   Polar Bubble
  -----------------------------------------------*/
  const colorize = (opaque, context) => {
    const value = context.dataset.data[context.dataIndex];
    const x = value.x / 100;
    const y = value.y / 100;
    const r = x < 0 && y < 0 ? 250 : x < 0 ? 150 : y < 0 ? 50 : 0;
    const g = x < 0 && y < 0 ? 0 : x < 0 ? 50 : y < 0 ? 150 : 250;
    const b = x < 0 && y < 0 ? 0 : x > 0 && y > 0 ? 250 : 150;
    const a = opaque ? 1 : 0.5 * value.v / 1000;

    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  const rand = (min, max) => {
    const seed = this._seed;
    min = min === undefined ? 0 : min;
    max = max === undefined ? 1 : max;
    this._seed = (seed * 9301 + 49297) % 233280;
    return min + (this._seed / 233280) * (max - min);
  };

  const generateData = () => {
    const data = [];
    const DATA_COUNT = 16;
    const MIN_XY = -150;
    const MAX_XY = 100;
    for (let i = 0; i < DATA_COUNT; i += 1) {
      data.push({
        x: rand(MIN_XY, MAX_XY),
        y: rand(MIN_XY, MAX_XY),
        v: rand(0, 1000),
      });
    }
    return data;
  };

  const chartBubble = document.getElementById('chart-bubble');
  if (chartBubble) {
    newChart(chartBubble, {
      type: 'bubble',
      data: {
        datasets: [{ 
          label: ['Deer Population'],
          data: [{
            x: -10,
            y: -20,
            r: 20
          },{
            x: 100,
            y: 0,
            r: 10
          }, {
            x: 60,
            y: 30,
            r: 20
          }, {
            x: 40,
            y: 60,
            r: 25
          }, {
            x: 80,
            y: 80,
            r: 30
          }, {
            x: 20,
            y: 30,
            r: 25
          }, {
            x: 0,
            y: 100,
            r: 5
          }],
          backgroundColor: '#2C7BE5' 
        }],
      },
    });
  }

  /*-----------------------------------------------
  |   Component Line Chart
  -----------------------------------------------*/
  const componentChartLine = document.getElementById('component-chart-line');
  if (componentChartLine) {
    newChart(componentChartLine, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            borderWidth: 2,
            data: chartData.slice(2, 14).map(d => (d * 3.14).toFixed(2)),
            borderColor: utils.rgbaColor(utils.colors.primary, 0.4),
            backgroundColor: utils.rgbaColor(utils.colors.primary)
          },
          {
            borderWidth: 2,
            borderColor: '#fff',
            data: chartData.slice(3, 15).map(d => (d * 3.14).toFixed(2)),
            backgroundColor: utils.rgbaColor(utils.colors.primary)
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        tooltips: {
          mode: 'x-axis',
          xPadding: 20,
          yPadding: 10,
          displayColors: false,
          callbacks: {
            label: tooltipItem => `${labels[tooltipItem.index]} - ${tooltipItem.yLabel} USD`,
            title: () => null,
          },
        },
        hover: {
          mode: 'label',
        },
        scales: {
          xAxes: [{
            scaleLabel: {
              show: true,
              labelString: 'Month',
            },
            ticks: {
              fontColor: utils.rgbaColor('#000', 0.7),
              fontStyle: 600,
            },
            gridLines: {
              // color: utils.rgbaColor('#000', 0.1),
              color: utils.rgbaColor('#000', 0.1),
              zeroLineColor: utils.rgbaColor('#000', 0.1),
              lineWidth: 1,
            },
          }],
          yAxes: [
            { 
              display: false,
            },
          ],
        },
      },
    });
  }


  /*-----------------------------------------------
  |   Real time user
  -----------------------------------------------*/
  /*-----------------------------------------------
  |   Bar Chart
  -----------------------------------------------*/
  const realTimeUser = document.getElementById('real-time-user');
  if (realTimeUser) {
    const realTimeUserChart = newChart(realTimeUser, {
      type: 'bar',
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
        datasets: [
          {
            label: 'Users',
            backgroundColor: utils.rgbaColor('#fff', 0.3),
            data: [183, 163, 176, 172, 166, 161, 164, 159, 172, 173, 184, 163, 99, 173, 183, 167, 160, 183, 163, 176, 172, 166, 173, 188, 175],
          }
        ],
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          yAxes: [{
            display: false,
            stacked: true,
          }],
          xAxes: [{
            stacked: false,
            ticks: {
              display: false
            },
            barPercentage: 0.9,
            categoryPercentage: 1.0,
            gridLines: {
              color: utils.rgbaColor('#fff', 0.1),
              display: false,
            }
          }],
        },
      },
    });
    const userCounterDom = $('.real-time-user'); 
    setInterval(() => {
      const userCounter = Math.floor(Math.random() * (120 - 60) + 60);
      /*-----------------------------------------------
     |   Remove data
     -----------------------------------------------*/
      realTimeUserChart.data.datasets.forEach((dataset) => {
        dataset.data.shift();
      });
      realTimeUserChart.update();
      
      /*-----------------------------------------------
      |   Add data
      -----------------------------------------------*/
      setTimeout(() => {
       realTimeUserChart.data.datasets.forEach((dataset) => {
         dataset.data.push(userCounter);
       });
       realTimeUserChart.update();
       userCounterDom.text(userCounter);
      }, 500);
    }, 2000);
  }
});

