'use strict';

import utils from './Utils';

/*-----------------------------------------------
|  Echarts
-----------------------------------------------*/

const getPosition= (pos, params, dom, rect, size) => ({
  top: pos[1] - size.contentSize[1] - 10,
  left: pos[0] - size.contentSize[0]/2
});

utils.$document.ready(() => {

  const Events = { CHANGE: 'change' };
  const Selector = { 
    ECHART_LINE_TOTAL_ORDER: '.echart-line-total-order',
    ECHART_BAR_WEEKLY_SALES: '.echart-bar-weekly-sales',
    ECHART_LINE_TOTAL_SALES: '.echart-line-total-sales',
    SELECT_MONTH: '.select-month',
    ECHART_BAR_TOP_PRODUCTS: '.echart-bar-top-products',
    ECHART_WORLD_MAP: '.echart-world-map',
    ECHART_DOUGHNUT: '.echart-doughnut'
  };

  //
  // ─── TOTAL ORDER CHART ──────────────────────────────────────────────────────────
  //

  const $echartLineTotalOrder = document.querySelector(Selector.ECHART_LINE_TOTAL_ORDER);
  if($echartLineTotalOrder){
    const $this = $($echartLineTotalOrder);

    // Get options from data attribute
    const userOptions = $this.data('options');
    const chart = window.echarts.init($echartLineTotalOrder);


    // Default options
    const defaultOptions = {
      tooltip: {
        triggerOn: 'mousemove',
        trigger: 'axis',
        padding: [7, 10],
        formatter: '{b0}: {c0}',
        backgroundColor: utils.grays.white,
        borderColor: utils.grays['300'],
        borderWidth: 1,
        transitionDuration: 0,
        position(pos, params, dom, rect, size) {
          return getPosition(pos, params, dom, rect, size);
        },
        textStyle: { color: utils.colors.dark }
      },
      xAxis: {
        type: 'category',
        data: ['Week 4', 'Week 5'],
        boundaryGap: false,
        splitLine: { show: false },
        axisLine: { 
          show: false,
          lineStyle: {
            color: utils.grays['300'],
            type: 'dashed'
          }
        },
        axisLabel: { show: false },
        axisTick: { show: false },
        axisPointer: { type: 'none' }
      },
      yAxis: {
        type: 'value',
        splitLine: { show: false },
        axisLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
        axisPointer: { show: false }
      },
      series: [
        {
          type: 'line',
          lineStyle: { 
            color: utils.colors.primary,
            width: 3
          },
          itemStyle: {
            color: utils.grays.white,
            borderColor: utils.colors.primary,
            borderWidth: 2,
          },
          hoverAnimation: true,
          data: [20, 130],
          connectNulls: true,
          smooth: 0.6,
          smoothMonotone: 'x',
          symbol: 'circle',
          symbolSize: 8,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0, 
                  color: utils.rgbaColor(utils.colors.primary, 0.25)
                }, 
                {
                  offset: 1, 
                  color: utils.rgbaColor(utils.colors.primary, 0)
                }
              ]
            }
          },
        },
      ],
      grid: { bottom: '2%', top: '0%', right: '10px', left: '10px' }
    };

    // Merge options using lodash
    const options = window._.merge(defaultOptions, userOptions);
    chart.setOption(options);
  }


  //
  // ─── WEEKLY SALES CHART ─────────────────────────────────────────────────────────
  //
  const $echartBarWeeklySales = document.querySelector(Selector.ECHART_BAR_WEEKLY_SALES);
  if($echartBarWeeklySales){
    const $this = $($echartBarWeeklySales);

    // Get options from data attribute
    const userOptions = $this.data('options');

    const data = [120, 200, 150, 80, 70, 110, 120];

    // Max value of data
    const yMax = Math.max(...data);

    const dataBackground = data.map(() => yMax);
    const chart = window.echarts.init($echartBarWeeklySales);

    // Default options
    const defaultOptions = {
      tooltip: {
        trigger: 'axis',
        padding: [7, 10],
        formatter: '{b1}: {c1}',
        backgroundColor: utils.grays.white,
        borderColor: utils.grays['300'],
        borderWidth: 1,
        textStyle: { color: utils.colors.dark },
        transitionDuration: 0,
        position(pos, params, dom, rect, size){
          return getPosition(pos, params, dom, rect, size);
        }
      },
      xAxis: {
        type: 'category',
        data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        boundaryGap: false,
        axisLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
        axisPointer: { type: 'none' },
      },
      yAxis: {
        type: 'value',
        splitLine: { show: false },
        axisLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
        axisPointer: { type: 'none' }
      },
      series: [
        {
          type: 'bar',
          barWidth: '5px',
          barGap: '-100%',
          itemStyle: {
            color: utils.grays['200'],
            barBorderRadius: 10,
          },
          data: dataBackground,
          animation: false,
          emphasis: { itemStyle: { color: utils.grays['200'] } }
        },
        {
          type: 'bar',
          barWidth: '5px',
          itemStyle: {
            color: utils.colors.primary,
            barBorderRadius: 10,
          },
          data: data,
          emphasis: { itemStyle: { color: utils.colors.primary } },
          z: 10
        },
      ],
      grid: { right: 5, left: 10, top: 0, bottom: 0 }      
    }

    // Merge user options with lodash
    const options = window._.merge(defaultOptions, userOptions);
    chart.setOption(options);
  }


  //
  // ─── EHCART LINE TOTAL SALES ────────────────────────────────────────────────────────────────
  //


  const $echartsLineTotalSales = document.querySelector(Selector.ECHART_LINE_TOTAL_SALES);
  const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function getFormatter(params){
    const { name, value } = params[0];
    var date =  new Date(name);
    return `${months[0]} ${date.getDate()}, ${value}`;
  }
  if($echartsLineTotalSales){
    
    const $this = $($echartsLineTotalSales);

    // Get options from data attribute
    const userOptions = $this.data('options');
    const chart = window.echarts.init($echartsLineTotalSales);
    const monthsnumber = [
      [60, 80, 60, 80, 65, 130, 120, 100, 30, 40, 30, 70],
      [100, 70, 80, 50, 120, 100, 130, 140, 90, 100, 40, 50],
      [80, 50, 60, 40, 60, 120, 100, 130, 60, 80, 50, 60],
      [70, 80, 100, 70, 90, 60, 80, 130, 40, 60, 50, 80],
      [90, 40, 80, 80, 100, 140, 100, 130, 90, 60, 70, 50],
      [80, 60, 80, 60, 40, 100, 120, 100, 30, 40, 30, 70],
      [20, 40, 20, 50, 70, 60, 110, 80, 90, 30, 50, 50],
      [60, 70, 30, 40, 80, 140, 80, 140, 120, 130, 100, 110],
      [90, 90, 40, 60, 40, 110, 90, 110, 60, 80, 60, 70],
      [50, 80, 50, 80, 50, 80, 120, 80, 50, 120, 110, 110],
      [60, 90, 60, 70, 40, 70, 100, 140, 30, 40, 30, 70],
      [20, 40, 20, 50, 30, 80, 120, 100, 30, 40, 30, 70],
    ];
    const defaultOptions = {
      color: utils.grays.white,
      tooltip: {
        trigger: 'axis',
        padding: [7, 10],
        backgroundColor: utils.grays.white,
        borderColor: utils.grays['300'],
        borderWidth: 1,
        textStyle: { color: utils.colors.dark },
        formatter(params){ 
          return getFormatter(params);
        },
        transitionDuration: 0,
        position(pos, params, dom, rect, size) {
          return getPosition(pos, params, dom, rect, size);
        },
      },
      xAxis: {
          type: 'category',
          data: ['2019-01-05', '2019-01-06', '2019-01-07', '2019-01-08','2019-01-09', '2019-01-10', '2019-01-11', '2019-01-12', '2019-01-13', '2019-01-14', '2019-01-15', '2019-01-16'],
          boundaryGap: false,
          axisPointer: { 
            lineStyle: {
              color: utils.grays['300'],
              type: 'dashed'
            }
          },
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              // color: utils.grays['300'],
              color: utils.rgbaColor('#000', 0.01),
              type: 'dashed'
            }
          },
          axisTick: { show: false },
          axisLabel: {
            color: utils.grays['400'],
            formatter: function(value){
              var date =  new Date(value);
              return `${months[date.getMonth()]} ${date.getDate()}`;
            },
            margin: 15
          }
      },
      yAxis: {
        type: 'value',
        axisPointer: { show: false },
        splitLine: {
          lineStyle: {
            color: utils.grays['300'],
            type: 'dashed'
          }
        },
        boundaryGap: false,
        axisLabel: { 
          show: true,
          color: utils.grays['400'],
          margin: 15
        },
        axisTick: { show: false },
        axisLine: { show: false },
      },
      series: [
        {
          type: 'line',
          data: monthsnumber[0],
          lineStyle: { color: utils.colors.primary },
          itemStyle: {
            borderColor: utils.colors.primary,
            borderWidth: 2,
          },
          symbol: 'circle',
          symbolSize: 10,
          smooth: false,
          hoverAnimation: true,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0, 
                  color: utils.rgbaColor(utils.colors.primary, 0.2)
                }, 
                {
                  offset: 1, 
                  color: utils.rgbaColor(utils.colors.primary, 0)
                }
              ]
            }
          },
        },
      ],
      grid: { right: '28px', left: '40px', bottom: '15%', top: '5%' }
    }

    const options = window._.merge(defaultOptions, userOptions);
    chart.setOption(options);

    // Change chart options accordiong to the selected month
    utils.$document.on(Events.CHANGE, Selector.SELECT_MONTH, (e) => {
      const $field = $(e.target);
      const month = $field.val();
      const data = monthsnumber[month];
      
      chart.setOption({
        tooltip: { 
          formatter: function(params){
            const { name, value } = params[0];
            var date =  new Date(name);
            return `${months[month]} ${date.getDate()}, ${value}`;
          }
        },
        xAxis: {
          axisLabel: {
            formatter: function(value){
              var date =  new Date(value);
              return `${months[$field.val()]} ${date.getDate()}`;
            },
            margin: 15
          }
        },  
        series: [{ data: data }]
      });
    });
  }


  //
  // ─── BAR CHART TOP PRODUCTS ──────────────────────────────────────────────────────────────────
  //
  const $echartBarTopProducts = document.querySelector(Selector.ECHART_BAR_TOP_PRODUCTS);

  if($echartBarTopProducts){
    const data =  [
      ['product', '2019', '2018'],
      ['Boots4', 43, 85],
      ['Reign Pro', 83, 73],
      ['Slick', 86, 62],
      ['Falcon', 72, 53],
      ['Sparrow', 80, 50],
      ['Hideway', 50, 70],
      ['Freya', 80, 90],
      // ['Raven Pro', 60, 70],
      // ['Posh', 80, 70],
    ];
    const $this = $($echartBarTopProducts);
    const userOptions = $this.data('options');
    const chart = window.echarts.init($echartBarTopProducts);

    const defaultOptions = {
      color: [ utils.colors.primary, utils.grays['300'] ],
      dataset: { source: data },
      tooltip: {
        trigger: 'item',
        padding: [7, 10],
        backgroundColor: utils.grays.white,
        borderColor: utils.grays['300'],
        borderWidth: 1,
        textStyle: { color: utils.colors.dark },
        transitionDuration: 0,
        position(pos, params, dom, rect, size) {
          return getPosition(pos, params, dom, rect, size);
        },
        formatter: function(params){
          return `<div class="font-weight-semi-bold">${params.seriesName}</div><div class="fs--1 text-600"><strong>${params.name}:</strong> ${params.value[params.componentIndex + 1]}</div>`;
        }
      },
      legend: {
        data: ['2019', '2018'],
        left: 'left',
        itemWidth: 10,
        itemHeight: 10,
        borderRadius: 0,
        icon: 'circle',
        inactiveColor: utils.grays['500'],
        textStyle: { color: utils.grays['700'] }
      },
      xAxis: {
        type: 'category',
        axisLabel: { color: utils.grays['400'] },
        axisLine: { 
          lineStyle: {
            color: utils.grays['300'],
            type: 'dashed'
          }
        },
        axisTick: false,
        boundaryGap: true,
      },
      yAxis: {
        axisPointer: { type: 'none' },
        axisTick: 'none',
        splitLine: {
          lineStyle: {
            color: utils.grays['300'],
            type: 'dashed'
          }
        },
        axisLine: { show: false },
        axisLabel: { color: utils.grays['400'] },
      },
      series: [
        {
          type: 'bar',
          barWidth: '12%',
          barGap: '30%',
          label: { normal: { show: false } },
          z: 10,
          itemStyle: {
            normal: {
              barBorderRadius: [ 10, 10, 0, 0 ],
              color: utils.colors.primary
            },
          }
        },
        {
          type: 'bar',
          barWidth: '12%',
          barGap: '30%',
          label: { normal: { show: false } },
          itemStyle: {
            normal: {
              barBorderRadius: [ 4, 4, 0, 0 ],
              color: utils.grays[300]
            },
          }
        }
      ],
      grid: { right: '0', left: '30px', bottom: '10%', top: '20%' }
    }
    
    const options = window._.merge(defaultOptions, userOptions);
    chart.setOption(options);
  }


  //
  // ─── PIE CHART ──────────────────────────────────────────────────────────────────
  //
  const $pieChartRevenue = document.querySelector(Selector.ECHART_DOUGHNUT);
  if($pieChartRevenue){
    const $this = $($pieChartRevenue);
    const userOptions = $this.data('options');
    const chart = window.echarts.init($pieChartRevenue);

    const defaultOptions = {
      color: [
        utils.colors.primary,
        utils.colors.info,
        utils.grays[300]
      ],
      tooltip: {
        trigger: 'item',
        padding: [7, 10],
        backgroundColor: utils.grays.white,
        textStyle: { color: utils.grays.black },
        transitionDuration: 0,
        borderColor: utils.grays['300'],
        borderWidth: 1,
        formatter: function(params){
          return `<strong>${params.data.name}:</strong> ${params.percent}%`;
        }
      },
      position(pos, params, dom, rect, size) {
        return getPosition(pos, params, dom, rect, size);
      },
      legend: { show: false },
      series: [
        {
          type:'pie',
          radius: ['100%', '87%'],
          avoidLabelOverlap: false,
          hoverAnimation: false,
          itemStyle: {
            borderWidth: 2,
            borderColor: utils.grays.white,
          },
          label: {
            normal: {
              show: false,
              position: 'center',
              textStyle: {
                fontSize: '20',
                fontWeight: '500',
                color: utils.grays['700']
              }
            },
            emphasis: {
              show: false,
            }
          },
          labelLine: { normal: { show: false } },
          data:[
            { value: 5300000, name: 'Samsung' },
            { value: 1900000, name: 'Huawei' },
            { value: 2000000, name: 'Apple' },
          ]
        }
      ]
    };

    const options = window._.merge(defaultOptions, userOptions);
    chart.setOption(options);

  }
  

  //
  // ─── WORLD MAP ──────────────────────────────────────────────────────────────────
  //
  const $echartsWorldMap = document.querySelector(Selector.ECHART_WORLD_MAP);
  if($echartsWorldMap){
    const $this = $($echartsWorldMap);
    const userOptions = $this.data('options');
    const chart = window.echarts.init($echartsWorldMap);
    const activeUserByCountry = [
      { name: 'Afghanistan', value: 28397.812 },
      { name: 'Angola', value: 19549.124 },
      { name: 'Albania', value: 3150.143 },
      { name: 'United Arab Emirates', value: 8441.537 },
      { name: 'Argentina', value: 40374.224 },
      { name: 'Armenia', value: 2963.496 },
      { name: 'French Southern and Antarctic Lands', value: 268.065 },
      { name: 'Australia', value: 22404.488 },
      { name: 'Austria', value: 8401.924 },
      { name: 'Azerbaijan', value: 9094.718 },
      { name: 'Burundi', value: 9232.753 },
      { name: 'Belgium', value: 10941.288 },
      { name: 'Benin', value: 9509.798 },
      { name: 'Burkina Faso', value: 15540.284 },
      { name: 'Bangladesh', value: 151125.475 },
      { name: 'Bulgaria', value: 7389.175 },
      { name: 'The Bahamas', value: 66402.316 },
      { name: 'Bosnia and Herzegovina', value: 3845.929 },
      { name: 'Belarus', value: 9491.07 },
      { name: 'Belize', value: 308.595 },
      { name: 'Bermuda', value: 64.951 },
      { name: 'Bolivia', value: 716.939 },
      { name: 'Brazil', value: 195210.154 },
      { name: 'Brunei', value: 27.223 },
      { name: 'Bhutan', value: 716.939 },
      { name: 'Botswana', value: 1969.341 },
      { name: 'Central African Republic', value: 4349.921 },
      { name: 'Canada', value: 34126.24 },
      { name: 'Switzerland', value: 7830.534 },
      { name: 'Chile', value: 17150.76 },
      { name: 'China', value: 1359821.465 },
      { name: 'Ivory Coast', value: 60508.978 },
      { name: 'Cameroon', value: 20624.343 },
      { name: 'Democratic Republic of the Congo', value: 62191.161 },
      { name: 'Republic of the Congo', value: 3573.024 },
      { name: 'Colombia', value: 46444.798 },
      { name: 'Costa Rica', value: 4669.685 },
      { name: 'Cuba', value: 11281.768 },
      { name: 'Northern Cyprus', value: 1.468 },
      { name: 'Cyprus', value: 1103.685 },
      { name: 'Czech Republic', value: 10553.701 },
      { name: 'Germany', value: 83017.404 },
      { name: 'Djibouti', value: 834.036 },
      { name: 'Denmark', value: 5550.959 },
      { name: 'Dominican Republic', value: 10016.797 },
      { name: 'Algeria', value: 37062.82 },
      { name: 'Ecuador', value: 15001.072 },
      { name: 'Egypt', value: 78075.705 },
      { name: 'Eritrea', value: 5741.159 },
      { name: 'Spain', value: 46182.038 },
      { name: 'Estonia', value: 1298.533 },
      { name: 'Ethiopia', value: 87095.281 },
      { name: 'Finland', value: 5367.693 },
      { name: 'Fiji', value: 860.559 },
      { name: 'Falkland Islands', value: 49.581 },
      { name: 'France', value: 63230.866 },
      { name: 'Gabon', value: 1556.222 },
      { name: 'United Kingdom', value: 62066.35 },
      { name: 'Georgia', value: 4388.674 },
      { name: 'Ghana', value: 24262.901 },
      { name: 'Guinea', value: 10876.033 },
      { name: 'Gambia', value: 1680.64 },
      { name: 'Guinea Bissau', value: 10876.033 },
      { name: 'Equatorial Guinea', value: 696.167 },
      { name: 'Greece', value: 11109.999 },
      { name: 'Greenland', value: 56.546 },
      { name: 'Guatemala', value: 14341.576 },
      { name: 'French Guiana', value: 231.169 },
      { name: 'Guyana', value: 786.126 },
      { name: 'Honduras', value: 7621.204 },
      { name: 'Croatia', value: 4338.027 },
      { name: 'Haiti', value: 9896.4 },
      { name: 'Hungary', value: 10014.633 },
      { name: 'Indonesia', value: 240676.485 },
      { name: 'India', value: 1205624.648 },
      { name: 'Ireland', value: 4467.561 },
      { name: 'Iran', value: 240676.485 },
      { name: 'Iraq', value: 30962.38 },
      { name: 'Iceland', value: 318.042 },
      { name: 'Israel', value: 7420.368 },
      { name: 'Italy', value: 60508.978 },
      { name: 'Jamaica', value: 2741.485 },
      { name: 'Jordan', value: 6454.554 },
      { name: 'Japan', value: 127352.833 },
      { name: 'Kazakhstan', value: 15921.127 },
      { name: 'Kenya', value: 40909.194 },
      { name: 'Kyrgyzstan', value: 5334.223 },
      { name: 'Cambodia', value: 14364.931 },
      { name: 'South Korea', value: 51452.352 },
      { name: 'Kosovo', value: 97.743 },
      { name: 'Kuwait', value: 2991.58 },
      { name: 'Laos', value: 6395.713 },
      { name: 'Lebanon', value: 4341.092 },
      { name: 'Liberia', value: 3957.99 },
      { name: 'Libya', value: 6040.612 },
      { name: 'Sri Lanka', value: 20758.779 },
      { name: 'Lesotho', value: 2008.921 },
      { name: 'Lithuania', value: 3068.457 },
      { name: 'Luxembourg', value: 507.885 },
      { name: 'Latvia', value: 2090.519 },
      { name: 'Morocco', value: 31642.36 },
      { name: 'Moldova', value: 103.619 },
      { name: 'Madagascar', value: 21079.532 },
      { name: 'Mexico', value: 117886.404 },
      { name: 'Macedonia', value: 507.885 },
      { name: 'Mali', value: 13985.961 },
      { name: 'Myanmar', value: 51931.231 },
      { name: 'Montenegro', value: 620.078 },
      { name: 'Mongolia', value: 2712.738 },
      { name: 'Mozambique', value: 23967.265 },
      { name: 'Mauritania', value: 3609.42 },
      { name: 'Malawi', value: 15013.694 },
      { name: 'Malaysia', value: 28275.835 },
      { name: 'Namibia', value: 2178.967 },
      { name: 'New Caledonia', value: 246.379 },
      { name: 'Niger', value: 15893.746 },
      { name: 'Nigeria', value: 159707.78 },
      { name: 'Nicaragua', value: 5822.209 },
      { name: 'Netherlands', value: 16615.243 },
      { name: 'Norway', value: 4891.251 },
      { name: 'Nepal', value: 26846.016 },
      { name: 'New Zealand', value: 4368.136 },
      { name: 'Oman', value: 2802.768 },
      { name: 'Pakistan', value: 173149.306 },
      { name: 'Panama', value: 3678.128 },
      { name: 'Peru', value: 29262.83 },
      { name: 'Philippines', value: 93444.322 },
      { name: 'Papua New Guinea', value: 6858.945 },
      { name: 'Poland', value: 38198.754 },
      { name: 'Puerto Rico', value: 3709.671 },
      { name: 'North Korea', value: 1.468 },
      { name: 'Portugal', value: 10589.792 },
      { name: 'Paraguay', value: 6459.721 },
      { name: 'Qatar', value: 1749.713 },
      { name: 'Romania', value: 21861.476 },
      { name: 'Russia', value: 21861.476 },
      { name: 'Rwanda', value: 10836.732 },
      { name: 'Western Sahara', value: 514.648 },
      { name: 'Saudi Arabia', value: 27258.387 },
      { name: 'Sudan', value: 35652.002 },
      { name: 'South Sudan', value: 9940.929 },
      { name: 'Senegal', value: 12950.564 },
      { name: 'Solomon Islands', value: 526.447 },
      { name: 'Sierra Leone', value: 5751.976 },
      { name: 'El Salvador', value: 6218.195 },
      { name: 'Somaliland', value: 9636.173 },
      { name: 'Somalia', value: 9636.173 },
      { name: 'Republic of Serbia', value: 3573.024 },
      { name: 'Suriname', value: 524.96 },
      { name: 'Slovakia', value: 5433.437 },
      { name: 'Slovenia', value: 2054.232 },
      { name: 'Sweden', value: 9382.297 },
      { name: 'Swaziland', value: 1193.148 },
      { name: 'Syria', value: 7830.534 },
      { name: 'Chad', value: 11720.781 },
      { name: 'Togo', value: 6306.014 },
      { name: 'Thailand', value: 66402.316 },
      { name: 'Tajikistan', value: 7627.326 },
      { name: 'Turkmenistan', value: 5041.995 },
      { name: 'East Timor', value: 10016.797 },
      { name: 'Trinidad and Tobago', value: 1328.095 },
      { name: 'Tunisia', value: 10631.83 },
      { name: 'Turkey', value: 72137.546 },
      { name: 'United Republic of Tanzania', value: 44973.33 },
      { name: 'Uganda', value: 33987.213 },
      { name: 'Ukraine', value: 46050.22 },
      { name: 'Uruguay', value: 3371.982 },
      { name: 'United States of America', value: 312247.116 },
      { name: 'Uzbekistan', value: 27769.27 },
      { name: 'Venezuela', value: 236.299 },
      { name: 'Vietnam', value: 89047.397 },
      { name: 'Vanuatu', value: 236.299 },
      { name: 'West Bank', value: 13.565 },
      { name: 'Yemen', value: 22763.008 },
      { name: 'South Africa', value: 51452.352 },
      { name: 'Zambia', value: 13216.985 },
      { name: 'Zimbabwe', value: 13076.978 }
    ];

    const defaultOptions = {
      tooltip: {
        show: true,
        trigger: 'item',
        backgroundColor: utils.grays['100'],
        textStyle: { color: utils.grays.black },
        transitionDuration: 0,
        formatter: function({ name, value }) {
          return `<strong>${name}</strong><br/>Active user: ${value ? `${Math.round(value / 10000)}` : 0}`;
        }
      },
      visualMap: {
        min: 0,
        max: 100000,
        text: ['High', 'Low'],
        realtime: false,
        calculable: true,
        inRange: { 
          color: [
            utils.rgbaColor(utils.colors.primary, '0.5'),
            utils.colors.primary
          ] 
        },
        textStyle: {
          color: utils.grays[700]
        }
      },
      series: [
        {
          type: 'map',
          mapType: 'world',
          roam: true,
          zoom: 1.25,
          scaleLimit: { min: 0.9, max: 17 },
          itemStyle: {
            normal: {
              borderColor: utils.grays[200],
              borderWidth: 0.5,
              areaStyle: { color: utils.grays['300'] }
            },
            emphasis: {
              areaColor: '#0443a2',
              borderColor: utils.grays['300'],
              label: { show: false }
            }
          },
          data: activeUserByCountry
        }
      ]
    };
    
    const options = window._.merge(defaultOptions, userOptions);
    chart.setOption(options);
  }


  //
  // ─── ECHART FIX ON WINDOW RESIZE ────────────────────────────────────────────────
  //
  const $echarts = document.querySelectorAll("[data-echart-responsive]");
  window.onresize = () => {
    if(!!$echarts.length){
      $.each($echarts, (item, value) => {
        if(!!$(value).data('echart-responsive')) {
          window.echarts.init(value).resize();
        }
      });
    }
  };
});
