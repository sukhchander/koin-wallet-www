(function() {
  'use strict';

  // Disable warning "Synchronous XMLHttpRequest on the main thread is deprecated.."
  $.ajaxPrefilter(function(options) {
    options.async = true;
  });

  // used for the preloader
  $(function() { document.body.style.opacity = 1; });

})();


(function(global) {
  'use strict';

  global.APP_COLORS = {
    'gray-darker':            '#263238',
    'gray-dark':              '#455A64',
    'gray':                   '#607D8B',
    'gray-light':             '#90A4AE',
    'gray-lighter':           '#ECEFF1',

    'primary':                '#448AFF',
    'success':                '#4CAF50',
    'info':                   '#03A9F4',
    'warning':                '#FFB300',
    'danger':                 '#F44336'
  };

})(window);

(function(global) {
  'use strict';

  global.Colors = new ColorsHandler();

  function ColorsHandler() {
    this.byName = byName;

    ////////////////

    function byName(name) {
      var color = APP_COLORS[name];
      if (!color && (typeof materialColors !== 'undefined')) {
        var c = name.split('-'); // red-500, blue-a100, deepPurple-500, etc
        if (c.length)
          color = (materialColors[c[0]] || {})[c[1]];
      }
      return (color || '#fff');
    }
  }

})(window);

(function() {
  'use strict';

  $(FlotCharts);

  function FlotCharts() {

    if (!$.fn.plot) return;

    // Dont run if charts page not loaded
    if (!$('#bar-flotchart').length) return;

    // BAR
    // -----------------------------------
    $.get('static/chart/bar.json', function(data) {

      var barData = data;
      var barOptions = {
        series: {
          bars: {
            align: 'center',
            lineWidth: 0,
            show: true,
            barWidth: 0.6,
            fill: true,
            fillColor: { colors: [Colors.byName('blue-500'), Colors.byName('purple-500')] }
          }
        },
        grid: {
          borderColor: 'rgba(162,162,162,.26)',
          borderWidth: 1,
          hoverable: true,
          backgroundColor: 'transparent'
        },
        tooltip: true,
        tooltipOpts: {
          content: function(label, x, y) {
            return x + ' : ' + y;
          }
        },
        xaxis: {
          tickColor: 'rgba(162,162,162,.26)',
          font: {
            color: Colors.byName('blueGrey-200')
          },
          mode: 'categories'
        },
        yaxis: {
          // position: (isRTL ? 'right' : 'left'),
          tickColor: 'rgba(162,162,162,.26)',
          font: {
            color: Colors.byName('blueGrey-200')
          }
        },
        shadowSize: 0
      };

      $('#bar-flotchart').plot(barData, barOptions);
    });


    // SPLINE
    // -----------------------------------
    $.get('static/chart/spline.json', function(data) {

      var splineData = data;
      var splineOptions = {
        series: {
          lines: {
            show: false
          },
          points: {
            show: true,
            radius: 2
          },
          splines: {
            show: true,
            tension: 0.4,
            lineWidth: 1,
            fill: 1
          }
        },
        grid: {
          borderColor: 'rgba(162,162,162,.26)',
          borderWidth: 1,
          hoverable: true,
          backgroundColor: 'transparent'
        },
        tooltip: true,
        tooltipOpts: {
          content: function(label, x, y) {
            return x + ' : ' + y;
          }
        },
        xaxis: {
          tickColor: 'rgba(162,162,162,.26)',
          font: {
            color: Colors.byName('blueGrey-200')
          },
          mode: 'categories'
        },
        yaxis: {
          min: 0,
          max: 150, // optional: use it for a clear represetation
          tickColor: 'rgba(162,162,162,.26)',
          font: {
            color: Colors.byName('blueGrey-200')
          },
          // position: (isRTL ? 'right' : 'left'),
          tickFormatter: function(v) {
            return v /* + ' visitors'*/ ;
          }
        },
        shadowSize: 0
      };

      $('#spline-flotchart').plot(splineData, splineOptions);
    });

    // AREA
    // -----------------------------------
    $.get('static/chart/area.json', function(data) {
      var areaData = data;
      var areaOptions = {
        series: {
          lines: {
            show: true,
            fill: true,
            fillColor: {
              colors: [{
                opacity: 0.5
              }, {
                opacity: 0.9
              }]
            }
          },
          points: {
            show: false
          }
        },
        grid: {
          borderColor: 'rgba(162,162,162,.26)',
          borderWidth: 1,
          hoverable: true,
          backgroundColor: 'transparent'
        },
        tooltip: true,
        tooltipOpts: {
          content: function(label, x, y) {
            return x + ' : ' + y;
          }
        },
        xaxis: {
          tickColor: 'rgba(162,162,162,.26)',
          font: {
            color: Colors.byName('blueGrey-200')
          },
          mode: 'categories'
        },
        yaxis: {
          min: 0,
          max: 150,
          tickColor: 'rgba(162,162,162,.26)',
          font: {
            color: Colors.byName('blueGrey-200')
          },
          // position: (isRTL ? 'right' : 'left')
        },
        shadowSize: 0
      };

      $('#area-flotchart').plot(areaData, areaOptions);

    });

    // LINE
    // -----------------------------------
    $.get('static/chart/line.json', function(data) {

      var lineData = data;
      var lineOptions = {
        series: {
          lines: {
            show: true,
            fill: 0.01
          },
          points: {
            show: true,
            radius: 4
          }
        },
        grid: {
          borderColor: 'rgba(162,162,162,.26)',
          borderWidth: 1,
          hoverable: true,
          backgroundColor: 'transparent'
        },
        tooltip: true,
        tooltipOpts: {
          content: function(label, x, y) {
            return x + ' : ' + y;
          }
        },
        xaxis: {
          tickColor: 'rgba(162,162,162,.26)',
          font: {
            color: Colors.byName('blueGrey-200')
          },
          mode: 'categories'
        },
        yaxis: {
          max: 300,
          // position: (isRTL ? 'right' : 'left'),
          tickColor: 'rgba(162,162,162,.26)',
          font: {
            color: Colors.byName('blueGrey-200')
          }
        },
        shadowSize: 0
      };

      $('#line-flotchart').plot(lineData, lineOptions);
    });

    // PIE
    // -----------------------------------
    var pieData = [{
      'label': 'CSS',
      'color': '#009688',
      'data': 40
    }, {
      'label': 'LESS',
      'color': '#FFC107',
      'data': 90
    }, {
      'label': 'SASS',
      'color': '#FF7043',
      'data': 75
    }];
    var pieOptions = {
      series: {
        pie: {
          show: true,
          innerRadius: 0,
          label: {
            show: true,
            radius: 0.8,
            formatter: function(label, series) {
              return '<div class="flot-pie-label">' +
                //label + ' : ' +
                Math.round(series.percent) +
                '%</div>';
            },
            background: {
              opacity: 0.8,
              color: '#222'
            }
          }
        }
      }
    };

    $('#pie-flotchart').plot(pieData, pieOptions);

    // DONUT
    // -----------------------------------
    var donutData = [{
      'color': '#4CAF50',
      'data': 60,
      'label': 'Coffee'
    }, {
      'color': '#009688',
      'data': 90,
      'label': 'CSS'
    }, {
      'color': '#FFC107',
      'data': 50,
      'label': 'LESS'
    }, {
      'color': '#FF7043',
      'data': 80,
      'label': 'Pug'
    }, {
      'color': '#3949AB',
      'data': 116,
      'label': 'AngularJS'
    }];
    var donutOptions = {
      series: {
        pie: {
          show: true,
          innerRadius: 0.5 // This makes the donut shape
        }
      }
    };

    $('#donut-flotchart').plot(donutData, donutOptions);

    // REALTIME
    // -----------------------------------
    var realTimeOptions = {
      series: {
        lines: {
          show: true,
          fill: true,
          fillColor: {
            colors: [Colors.byName('blue-500'), Colors.byName('blue-500')]
          }
        },
        shadowSize: 0 // Drawing is faster without shadows
      },
      grid: {
        show: false,
        borderWidth: 0,
        minBorderMargin: 20,
        labelMargin: 10
      },
      xaxis: {
        tickFormatter: function() {
          return '';
        }
      },
      yaxis: {
        min: 0,
        max: 110
      },
      legend: {
        show: true
      },
      colors: [Colors.byName('blue-500')]
    };

    // Generate random data for realtime demo
    var data = [],
      totalPoints = 300;

    var realTimeData = getRandomData();
    update();

    function getRandomData() {
      if (data.length > 0)
        data = data.slice(1);
      // Do a random walk
      while (data.length < totalPoints) {
        var prev = data.length > 0 ? data[data.length - 1] : 50,
          y = prev + Math.random() * 10 - 5;
        if (y < 0) {
          y = 0;
        } else if (y > 100) {
          y = 100;
        }
        data.push(y);
      }
      // Zip the generated y values with the x values
      var res = [];
      for (var i = 0; i < data.length; ++i) {
        res.push([i, data[i]]);
      }
      return [res];
    }

    function update() {
      realTimeData = getRandomData();
      $('#realtime-flotchart').plot(realTimeData, realTimeOptions);
      setTimeout(update, 30);
    }
    // end random data generation
  }

})();
(function() {
  'use strict';

  $(initPeity);

  function initPeity() {

    if (!$.fn.peity) return;

    $('.peity-pie').peity('pie', {
      radius: 25,
      fill: [Colors.byName('deepPurple-100'), Colors.byName('deepPurple-400'), Colors.byName('deepPurple-700')]
    });

    $('.peity-donut').peity('donut', {
      radius: 25,
      fill: [Colors.byName('pink-100'), Colors.byName('pink-400'), Colors.byName('pink-700')]
    });

    $('.peity-line').peity('line', {
      height: 40,
      width: 100,
      strokeWidth: 3,
      stroke: Colors.byName('teal-500'),
      fill: Colors.byName('teal-100')
    });

    $('.peity-bar').peity('bar', {
      height: 40,
      width: 100,
      fill: [Colors.byName('cyan-100'), Colors.byName('cyan-400'), Colors.byName('cyan-700')]
    });

    // Real time example

    var aurusd = $('#realtime-aur-usd').peity('line', {
      fill: Colors.byName('green-200'),
      stroke: Colors.byName('green-500'),
      width: '100%',
      height: 90
    });

    var aurcad = $('#realtime-aur-cad').peity('line', {
      fill: Colors.byName('red-200'),
      stroke: Colors.byName('red-500'),
      width: '100%',
      height: 90
    });

    var aureur = $('#realtime-aur-eur').peity('line', {
      fill: Colors.byName('blue-200'),
      stroke: Colors.byName('blue-500'),
      width: '100%',
      height: 90
    });

    setInterval(function() {
      var random = Math.round(Math.random() * 10);
      var values = aurusd.text().split(',');
      values.shift();
      values.push(random);
      aurusd.text(values.join(',')).change();
    }, 999);


    setInterval(function() {
      var random = Math.round(Math.random() * 10);
      var values = aurcad.text().split(',');
      values.shift();
      values.push(random);
      aurcad.text(values.join(',')).change();
    }, 777);

    setInterval(function() {
      var random = Math.round(Math.random() * 10);
      var values = aureur.text().split(',');
      values.shift();
      values.push(random);
      aureur.text(values.join(',')).change();
    }, 555);

  }

})();
(function() {
  'use strict';

  $(RadialCharts);

  function RadialCharts() {

    if (!$.fn.knob || !$.fn.easyPieChart) return;

    // KNOB Charts

    var knobLoaderOptions1 = {
      width: '50%', // responsive
      displayInput: true,
      thickness: 0.1,
      fgColor: Colors.byName('cyan-500'),
      bgColor: 'rgba(162,162,162, .09)'
    };

    var knobLoaderOptions2 = {
      width: '50%', // responsive
      displayInput: true,
      thickness: 1,
      inputColor: '#fff',
      fgColor: Colors.byName('amber-500'),
      bgColor: Colors.byName('yellow-500'),
      readOnly: true
    };

    var knobLoaderOptions3 = {
      width: '50%', // responsive
      displayInput: true,
      fgColor: Colors.byName('red-500'),
      bgColor: 'rgba(162,162,162, .09)',
      displayPrevious: true,
      thickness: 0.1,
      lineCap: 'round'
    };

    var knobLoaderOptions4 = {
      width: '50%', // responsive
      displayInput: true,
      fgColor: Colors.byName('primary'),
      bgColor: 'rgba(162,162,162, .09)',
      angleOffset: -125,
      angleArc: 250
    };

    $('#knob-chart1').knob(knobLoaderOptions1);
    $('#knob-chart2').knob(knobLoaderOptions2);
    $('#knob-chart3').knob(knobLoaderOptions3);
    $('#knob-chart4').knob(knobLoaderOptions4);

    // Easy Pie Charts

    var pieOptions1 = {
      animate: {
        duration: 800,
        enabled: true
      },
      barColor: Colors.byName('info'),
      trackColor: false,
      scaleColor: false,
      lineWidth: 10,
      lineCap: 'circle'
    };

    var pieOptions2 = {
      animate: {
        duration: 800,
        enabled: true
      },
      barColor: Colors.byName('danger'),
      trackColor: false,
      scaleColor: false,
      lineWidth: 4,
      lineCap: 'circle'
    };

    var pieOptions3 = {
      animate: {
        duration: 800,
        enabled: true
      },
      barColor: Colors.byName('deepPurple-500'),
      trackColor: false,
      scaleColor: Colors.byName('gray'),
      lineWidth: 15,
      lineCap: 'circle'
    };

    var pieOptions4 = {
      animate: {
        duration: 800,
        enabled: true
      },
      barColor: Colors.byName('deepPurple-500'),
      trackColor: 'rgba(162,162,162, .09)',
      scaleColor: Colors.byName('gray-dark'),
      lineWidth: 15,
      lineCap: 'circle'
    };

    $('#easypiechart1').easyPieChart(pieOptions1);
    $('#easypiechart2').easyPieChart(pieOptions2);
    $('#easypiechart3').easyPieChart(pieOptions3);
    $('#easypiechart4').easyPieChart(pieOptions4);

  }
})();

(function() {
  'use strict';

  if( !document.querySelector('#rickshaw-chart1') ||
    !document.querySelector('#rickshaw-chart2') ||
    !document.querySelector('#rickshaw-chart3') )
    return;

  $(RickshawCharts);

  function RickshawCharts() {
    var seriesData = [
      [],
      [],
      []
    ];
    var random = new Rickshaw.Fixtures.RandomData(150);

    for (var i = 0; i < 150; i++) {
      random.addData(seriesData);
    }
    // Big area chart
    var graph1 = new Rickshaw.Graph({
      element: document.querySelector('#rickshaw-chart1'),
      renderer: 'area',
      series: [{
        color: Colors.byName('green-700'),
        data: seriesData[0],
        name: 'New York'
      }, {
        color: Colors.byName('success'),
        data: seriesData[1],
        name: 'London'
      }, {
        color: Colors.byName('lime-500'),
        data: seriesData[2],
        name: 'Tokyo'
      }]
    });
    graph1.render();

    // Bar chart
    var graph2 = new Rickshaw.Graph({
      element: document.querySelector('#rickshaw-chart2'),
      renderer: 'bar',
      series: [{
        color: Colors.byName('blue-700'),
        data: seriesData[0],
        name: 'New York'
      }, {
        color: Colors.byName('blue-500'),
        data: seriesData[1],
        name: 'London'
      }, {
        color: Colors.byName('blue-200'),
        data: seriesData[2],
        name: 'Tokyo'
      }]
    });
    graph2.render();

    // Scatterplot

    var seriesData2 = [
      [],
      [],
      []
    ];
    var random2 = new Rickshaw.Fixtures.RandomData(150);

    for (var j = 0; j < 200; j++) {
      random2.addData(seriesData2);
    }
    var graph3 = new Rickshaw.Graph({
      element: document.querySelector('#rickshaw-chart3'),
      width: '100%',
      renderer: 'scatterplot',
      legend: {
        toggle: true,
        highlight: true
      },
      series: [{
        color: Colors.byName('pink-700'),
        data: seriesData2[0],
        name: 'New York'
      }, {
        color: Colors.byName('pink-500'),
        data: seriesData2[1],
        name: 'London'
      }, {
        color: Colors.byName('pink-200'),
        data: seriesData2[2],
        name: 'Tokyo'
      }]
    });
    new Rickshaw.Graph.HoverDetail({
      graph: graph3,
      xFormatter: function(x) {
        return 't=' + x;
      },
      yFormatter: function(y) {
        return '$' + y;
      }
    });
    graph3.render();

    // Fluid charts
    // ---------------

    window.addEventListener('resize', function(){
      //- 1
      graph1.configure({
        width: $('#rickshaw-chart1').width(),
        height: $('#rickshaw-chart1').height()
      });
      graph1.render();
      //- 2
      graph2.configure({
        width: $('#rickshaw-chart2').width(),
        height: $('#rickshaw-chart2').height()
      });
      graph2.render();
      //- 3
      graph3.configure({
        width: $('#rickshaw-chart3').width(),
        height: $('#rickshaw-chart3').height()
      });
      graph3.render();

    });

  }

})();
(function() {
  'use strict';

  $(initDashboard);

  function initDashboard() {

    if (!$.fn.plot || !$.fn.knob) return;

    var knobLoaderOptions1 = {
      width: '80%', // responsive
      displayInput: true,
      fgColor: Colors.byName('primary'),
      bgColor: 'rgba(162,162,162, .09)',
      angleOffset: -125,
      angleArc: 250,
      readOnly: true
    };

    $('#dash-chart1').knob(knobLoaderOptions1);

    // Simulate real time knob chart
    setInterval(function() {
      var endValue = Math.floor(Math.random() * 20) + 20;
      var dial = $('#dash-chart1');
      dial.animate({ value: endValue }, {
        duration: 1000,
        easing: 'swing',
        step: function(now, fx) {
          fx.now = parseInt(now);
          dial.val(Math.floor(this.value)).trigger('change');
        }
      });
    }, 2000);

    // Animate progress bars in real time
    var ram = $('#ram'),
      ramvalue = $('#ram-value'),
      io = $('#io'),
      iovalue = $('#io-value');
    setInterval(function() {
      var r = (Math.floor(Math.random() * 20) + 40) + '%';
      var i = (Math.floor(Math.random() * 10) + 20) + '%';
      ramvalue.text(r);
      iovalue.text(i);
      ram.css({ width: r });
      io.css({ width: i });
    }, 9000);

    // Animate counting of numbers
    $('[data-counter]').each(function() {
      var $this = $(this);
      $this.prop('counter', 0).animate({
        counter: $this.data('counter')
      }, {
        duration: 3000,
        easing: 'swing',
        step: function(val) {
          $this.text(numberWithCommas(Math.ceil(val)));
        }
      });
    });

    // Animate counting of numbers
    $('[data-counter-decimal]').each(function() {
      var $this = $(this);
      $this.prop('counter', 0).animate({
        counter: $this.data('counter-decimal')
      }, {
        duration: 3000,
        easing: 'swing',
        step: function(val) {
          $this.text(numberWithDecimals(val));
        }
      });
    });

    function numberWithCommas(x) { // https://stackoverflow.com/a/2901298
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function numberWithDecimals(x) { // https://stackoverflow.com/a/2901298
      return x.toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    }

    // Main Flot chart
    var splineData = [{
      'label': 'Unique',
      'color': Colors.byName('blue-400'),
      data: [
        ['5', 50],
        ['6', 70],

        ['7', 60],
        ['8', 120],
        ['9', 80],

        ['10', 150],
        ['11', 80],
        ['12', 90]
      ]
    }];
    var splineOptions = {
      series: {
        lines: {
          show: true,
          fill: true,
          fillColor: { colors: [{ opacity: 0 }, { opacity: 1 }] }
        },
        points: {
          show: true,
          radius: 3
        }
      },
      grid: {
        borderColor: '#eee',
        borderWidth: 0,
        hoverable: true,
        backgroundColor: 'transparent'
      },
      tooltip: true,
      tooltipOpts: {
        content: function(label, x, y) {
          return x + ' : ' + y;
        }
      },
      xaxis: {
        show: false,
        tickColor: 'transparent',
        mode: 'categories',
        font: {
          color: Colors.byName('blueGrey-200')
        }
      },
      yaxis: {
        show: false,
        min: 0,
        max: 180, // optional: use it for a clear representation
        tickColor: 'transparent',
        font: {
          color: Colors.byName('blueGrey-200')
        },
        //position: 'right' or 'left',
        tickFormatter: function(v) {
          return v /* + ' visitors'*/ ;
        }
      },
      legend: false,
      shadowSize: 0
    };

    $('#flot-main-spline').each(function() {
      var $el = $(this);
      if ($el.data('height')) $el.height($el.data('height'));
      $el.plot(splineData, splineOptions);
    });


    // Bar chart stacked
    // ------------------------
    var stackedChartData = [{
      data: [
        ['1.2', 45],
        ['2.5', 47],
        ['3.0', 45],
        ['4.2', 42],
        ['4.5', 45],
        ['4.7', 42],
        ['5.0', 45]
      ]
    }, {
      data: [
        ['1.2', 30],
        ['2.5', 27],
        ['3.0', 35],
        ['4.2', 25],
        ['4.5', 35],
        ['4.7', 35],
        ['5.0', 17]
      ]
    }];

    var stackedChartOptions = {
      bars: {
        show: true,
        fill: true,
        barWidth: 0.3,
        lineWidth: 1,
        align: 'center',
        // order : 1,
        fillColor: {
          colors: [{
            opacity: 1
          }, {
            opacity: 1
          }]
        }
      },
      colors: [Colors.byName('deepPurple-100'), Colors.byName('deepPurple-300')],
      series: {
        shadowSize: 3
      },
      xaxis: {
        show: true,
        position: 'bottom',
        mode: 'categories'
      },
      yaxis: {
        show: false,
        min: 0,
        max: 60
      },
      grid: {
        hoverable: true,
        clickable: true,
        borderWidth: 0,
        color: 'rgba(120,120,120,0.5)'
      },
      tooltip: true,
      tooltipOpts: {
        content: 'Value %x.0 is %y.0',
        defaultTheme: false,
        shifts: {
          x: 0,
          y: -20
        }
      }
    };

    $('#flot-stacked-chart').each(function() {
      var $el = $(this);
      if ($el.data('height')) $el.height($el.data('height'));
      $el.plot(stackedChartData, stackedChartOptions);
    });


    // Flot bar chart
    // ------------------
    var barChartOptions = {
      series: {
        bars: {
          show: true,
          fill: 1,
          barWidth: 0.2,
          lineWidth: 0,
          align: 'center'
        },
        highlightColor: 'rgba(255,255,255,0.2)'
      },
      grid: {
        hoverable: true,
        clickable: true,
        borderWidth: 0,
        color: '#8394a9'
      },
      tooltip: true,
      tooltipOpts: {
        content: function getTooltip(label, x, y) {
          return 'Activity for ' + x + ': ' + (y * 1000);
        }
      },
      xaxis: {
        tickColor: 'transparent',
        mode: 'categories',
        font: {
          color: Colors.byName('blueGrey-200')
        }
      },
      yaxis: {
        show: false,
        tickColor: 'transparent',
        font: {
          color: Colors.byName('blueGrey-200')
        }
      },
      legend: {
        show: false
      },
      shadowSize: 0
    };

    var barChartData = [{
      'label': '2017',
      bars: {
        order: 0,
        fillColor: { colors: [Colors.byName('blue-100'), Colors.byName('purple-100')] }
      },
      data: [
        ['Jan', 30],
        ['Feb', 25],
        ['Mar', 30],
        ['Apr', 35],
        ['May', 5]
      ]
    }, {
      'label': '2016',
      bars: {
        order: 1,
        fillColor: { colors: [Colors.byName('blue-500'), Colors.byName('purple-400')] }
      },
      data: [
        ['Jan', 45],
        ['Feb', 35],
        ['Mar', 25],
        ['Apr', 50],
        ['May', 20]
      ]
    }];

    $('#flot-bar-chart').each(function() {
      var $el = $(this);
      if ($el.data('height')) $el.height($el.data('height'));
      $el.plot(barChartData, barChartOptions);
    });

    // Small flot chart
    // ---------------------
    var chartTaskData = [{
      'label': 'Total',
      color: Colors.byName('primary'),
      data: [
        ['Jan', 14],
        ['Feb', 14],
        ['Mar', 12],
        ['Apr', 16],
        ['May', 13],
        ['Jun', 14],
        ['Jul', 19]
        //4, 4, 3, 5, 3, 4, 6
      ]
    }];
    var chartTaskOptions = {
      series: {
        lines: {
          show: false
        },
        points: {
          show: false
        },
        splines: {
          show: true,
          tension: 0.4,
          lineWidth: 3,
          fill: 1
        },
      },
      legend: {
        show: false
      },
      grid: {
        show: false,
      },
      tooltip: true,
      tooltipOpts: {
        content: function(label, x, y) {
          return x + ' : ' + y;
        }
      },
      xaxis: {
        tickColor: '#fcfcfc',
        mode: 'categories'
      },
      yaxis: {
        min: 0,
        max: 30, // optional: use it for a clear representation
        tickColor: '#eee',
        //position: 'right' or 'left',
        tickFormatter: function(v) {
          return v /* + ' visitors'*/ ;
        }
      },
      shadowSize: 0
    };

    $('#flot-task-chart').each(function() {
      var $el = $(this);
      if ($el.data('height')) $el.height($el.data('height'));
      $el.plot(chartTaskData, chartTaskOptions);
    });

    // Donut chart
    // -----------------
    var donutData = [{
      'color': Colors.byName('blue-200'),
      'data': 60,
      'label': 'Users'
    }, {
      'color': Colors.byName('blue-300'),
      'data': 90,
      'label': 'System'
    }, {
      'color': Colors.byName('blue-400'),
      'data': 50,
      'label': 'Memory'
    }, {
      'color': Colors.byName('blue-500'),
      'data': 80,
      'label': 'Server'
    }, {
      'color': Colors.byName('blue-600'),
      'data': 116,
      'label': 'Database'
    }];
    var donutOptions = {
      series: {
        pie: {
          stroke: {
            width: 0,
            color: '#a1a1a1'
          },
          show: true,
          innerRadius: 0.5 // This makes the donut shape
        }
      },
      legend: {
        show: false
      }
    };

    $('#donut-dashboard').plot(donutData, donutOptions);


    // Sparklines
    // -----------------

    var sparkValue1 = [4, 2, 3, 5, 3, 2, 3, 4, 6];
    var sparkValue2 = [5, 3, 4, 6, 5, 3, 4, 3, 4];
    var sparkValue3 = [4, 3, 4, 5, 3, 2, 3, 4, 6];
    var sparkOpts = {
      chartRangeMin: 0,
      type: 'bar',
      height: 50,
      width: '90',
      lineWidth: 4,
      barSpacing: 8,
      valueSpots: {
        '0:': Colors.byName('blue-700'),
      },
      lineColor: Colors.byName('blue-700'),
      spotColor: Colors.byName('blue-700'),
      fillColor: 'transparent',
      highlightLineColor: Colors.byName('blue-700'),
      spotRadius: 0
    };

    initSparkline($('#sparkline1'), sparkValue1, sparkOpts);
    initSparkline($('#sparkline2'), sparkValue2, sparkOpts);
    initSparkline($('#sparkline3'), sparkValue3, sparkOpts);
    // call sparkline and mix options with data attributes
    function initSparkline(el, values, opts) {
      el.sparkline(values, $.extend(opts, el.data()));
    }
  }
})();


(function() {
  'use strict';

  $(initHeader);

  function initHeader() {

    // Search modal
    var modalSearch = $('.modal-search');
    $('#header-search, .open-header-search').on('click', function(e) {
      e.preventDefault();
      modalSearch
        .on('show.bs.modal', function() {
          // Add class for white backdrop
          $('body').addClass('modal-backdrop-soft');
        })
        .on('hidden.bs.modal', function() {
          // Remove class for white backdrop (if not will affect future modals)
          $('body').removeClass('modal-backdrop-soft');
        })
        .on('shown.bs.modal', function() {
          // Auto focus the search input
          $('.header-input-search').focus();
        })
        .modal()
        ;
    });

    // Settings modal
    var modalSettings = $('.modal-settings');
    $('#header-settings').on('click', function(){
      modalSettings
        .on('show.bs.modal', function() {
          // Add class for soft backdrop
          $('body').addClass('modal-backdrop-soft');
        })
        .on('hidden.bs.modal', function() {
          // Remove class for soft backdrop (if not will affect future modals)
          $('body').removeClass('modal-backdrop-soft');
        })
        .modal()
        ;
    });

  }

})();

(function() {
  'use strict';

  $(initSettings);

  function initSettings() {

    var body = $('body');
    // var sidebar = $('.layout-container > aside');
    // var header = $('.layout-container > header');
    // var brand = sidebar.find('.brand-header');
    // var content = $('.layout-container > main');

    // Handler for themes preview
    $('input[name="setting-theme"]:radio').change(function() {
      body.removeClass(themeClassname);
      body.addClass(this.value);
    });
      // Regular expression for the pattern bg-* to find the background class
      function themeClassname(index, css) {
        var cmatch = css.match(/(^|\s)theme-\S+/g);
        return (cmatch || []).join(' ');
      }

    $('#sidebar-cover').change(function() {
      body[this.checked ? 'addClass' : 'removeClass']('sidebar-cover');
    });

    $('#fixed-footer').change(function() {
      body[this.checked ? 'addClass' : 'removeClass']('footer-fixed');
    });

    var sidebarToolbar = $('.sidebar-toolbar');
    $('#sidebar-showtoolbar').change(function() {
      sidebarToolbar[this.checked ? 'show' : 'hide']();
    });

  }

})();


(function() {
  'use strict';

  $(initTimeline);

  function initTimeline() {
    if (document.getElementById('map-tm')) {
      new GMaps({
        div: '#map-tm',
        lat: -12.043333,
        lng: -77.028333
      });
    }
  }

})();

(function() {
  'use strict';

  $(sidebarNav);

  function sidebarNav() {

    var $sidebarNav = $('.sidebar-nav');
    var $sidebarContent = $('.sidebar-content');

    activate($sidebarNav);

    $sidebarNav.on('click', function(event) {
      var item = getItemElement(event);
      // check click is on a tag
      if (!item) return;

      var ele = $(item),
        liparent = ele.parent()[0];

      var lis = ele.parent().parent().children(); // markup: ul > li > a
      // remove .active from childs
      lis.find('li').removeClass('active');
      // remove .active from siblings ()
      $.each(lis, function(idx, li) {
        if (li !== liparent)
          $(li).removeClass('active');
      });

      var next = ele.next();
      if (next.length && next[0].tagName === 'UL') {
        ele.parent().toggleClass('active');
        event.preventDefault();
      }
    });

    // find the a element in click context
    // doesn't check deeply, asumens two levels only
    function getItemElement(event) {
      var element = event.target,
        parent = element.parentNode;
      if (element.tagName.toLowerCase() === 'a') return element;
      if (parent.tagName.toLowerCase() === 'a') return parent;
      if (parent.parentNode.tagName.toLowerCase() === 'a') return parent.parentNode;
    }

    function activate(sidebar) {
      sidebar.find('a').each(function() {
        var $this = $(this),
          href = $this.attr('href').replace('#', '');
        if (href !== '' && window.location.href.indexOf('/' + href) >= 0) {
          var item = $this.parents('li').addClass('active');
          // Animate scrolling to focus active item
          $sidebarContent.animate({
            scrollTop: $sidebarContent.scrollTop() + item.position().top - (window.innerHeight / 2)
          }, 100);
          return false; // exit foreach
        }
      });
    }

    var layoutContainer = $('.layout-container');
    var $body = $('body');
    // Handler to toggle sidebar visibility on mobile
    $('.sidebar-toggler').click(function(e) {
      e.preventDefault();
      layoutContainer.toggleClass('sidebar-visible');
      // toggle icon state
      $(this).parent().toggleClass('active');
    });
    // Close sidebar when click on backdrop
    $('.sidebar-layout-obfuscator').click(function(e) {
      e.preventDefault();
      $body.removeClass('sidebar-cover-visible'); // for use with cover mode
      layoutContainer.removeClass('sidebar-visible'); // for use on mobiles
      // restore icon
      $('.sidebar-toggler').parent().removeClass('active');
    });

    // escape key closes sidebar on desktops
    $(document).keyup(function(e) {
      if (e.keyCode === 27) {
        $body.removeClass('sidebar-cover-visible');
      }
    });

    // Handler to toggle sidebar visibility on desktop
    $('.covermode-toggler').click(function(e) {
      e.preventDefault();
      $body.addClass('sidebar-cover-visible');
    });

    $('.sidebar-close').click(function(e) {
      e.preventDefault();
      $body.removeClass('sidebar-cover-visible');
    });

    // remove desktop offcanvas when app changes to mobile
    // so when it returns, the sidebar is shown again
    window.addEventListener('resize', function() {
      if (window.innerWidth < 768) {
        $body.removeClass('sidebar-cover-visible');
      }
    });

  }

})();
(function() {
  'use strict';

  $(tableBootgrid);

  function tableBootgrid() {

    if (!$.fn.bootgrid) return;

    var ioniconCss = {
      icon: 'icon',
      iconColumns: 'ion-ios-list-outline',
      iconDown: 'ion-chevron-down',
      iconRefresh: 'ion-refresh',
      iconSearch: 'ion-search',
      iconUp: 'ion-chevron-up',
      dropDownMenuItems: 'dropdown-menu dropdown-menu-right'
    };

    $('#bootgrid-basic').bootgrid({
      css: ioniconCss,
      templates: {
        // templates for BS4
        actionButton: '<button class="btn btn-secondary" type="button" title="{{ctx.text}}">{{ctx.content}}</button>',
        actionDropDown: '<div class="{{css.dropDownMenu}}"><button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown"><span class="{{css.dropDownMenuText}}">{{ctx.content}}</span> <span class="caret"></span></button><ul class="{{css.dropDownMenuItems}}" role="menu"></ul></div>',
        actionDropDownItem: '<li class="dropdown-item"><a href="" data-action="{{ctx.action}}" class="{{css.dropDownItem}} {{css.dropDownItemButton}}">{{ctx.text}}</a></li>',
        actionDropDownCheckboxItem: '<li class="dropdown-item"><label class="{{css.dropDownItem}}"><input name="{{ctx.name}}" type="checkbox" value="1" class="{{css.dropDownItemCheckbox}}" {{ctx.checked}} /> {{ctx.label}}</label></li>',
        paginationItem: '<li class="page-item {{ctx.css}}"><a href="" data-page="{{ctx.page}}" class="page-link {{css.paginationButton}}">{{ctx.text}}</a></li>',
        search: "<div class=\"{{css.search}}\"><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text bg-transparent b0\"><em class=\"{{css.icon}} {{css.iconSearch}}\"></span></em></div> <input type=\"text\" class=\"{{css.searchField}}\" placeholder=\"{{lbl.search}}\" /></div></div>"
      }
    });

    $('#bootgrid-selection').bootgrid({
      css: ioniconCss,
      selection: true,
      multiSelect: true,
      rowSelect: true,
      keepSelection: true,
      templates: {
        select: '<label class="mda-checkbox">' +
          '<input name="select" type="{{ctx.type}}" class="{{css.selectBox}}" value="{{ctx.value}}" {{ctx.checked}} />' +
          '<em class="bg-warning"></em>' +
          '</label>',
        // templates for BS4
        actionButton: '<button class="btn btn-secondary" type="button" title="{{ctx.text}}">{{ctx.content}}</button>',
        actionDropDown: '<div class="{{css.dropDownMenu}}"><button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown"><span class="{{css.dropDownMenuText}}">{{ctx.content}}</span> <span class="caret"></span></button><ul class="{{css.dropDownMenuItems}}" role="menu"></ul></div>',
        actionDropDownItem: '<li class="dropdown-item"><a href="" data-action="{{ctx.action}}" class="{{css.dropDownItem}} {{css.dropDownItemButton}}">{{ctx.text}}</a></li>',
        actionDropDownCheckboxItem: '<li class="dropdown-item"><label class="{{css.dropDownItem}}"><input name="{{ctx.name}}" type="checkbox" value="1" class="{{css.dropDownItemCheckbox}}" {{ctx.checked}} /> {{ctx.label}}</label></li>',
        paginationItem: '<li class="page-item {{ctx.css}}"><a href="" data-page="{{ctx.page}}" class="page-link {{css.paginationButton}}">{{ctx.text}}</a></li>',
        search: "<div class=\"{{css.search}}\"><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text bg-transparent b0\"><em class=\"{{css.icon}} {{css.iconSearch}}\"></span></em></div> <input type=\"text\" class=\"{{css.searchField}}\" placeholder=\"{{lbl.search}}\" /></div></div>"
      }
    });

    var grid = $('#bootgrid-command').bootgrid({
      css: ioniconCss,
      formatters: {
        commands: function(column, row) {
          return '<button type="button" class="btn btn-sm btn-info mr-2 command-edit" data-row-id="' + row.id + '"><em class="ion-edit"></em></button>' +
            '<button type="button" class="btn btn-sm btn-danger command-delete" data-row-id="' + row.id + '"><em class="ion-trash-a"></em></button>';
        }
      },
      templates: {
        // templates for BS4
        actionButton: '<button class="btn btn-secondary" type="button" title="{{ctx.text}}">{{ctx.content}}</button>',
        actionDropDown: '<div class="{{css.dropDownMenu}}"><button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown"><span class="{{css.dropDownMenuText}}">{{ctx.content}}</span> <span class="caret"></span></button><ul class="{{css.dropDownMenuItems}}" role="menu"></ul></div>',
        actionDropDownItem: '<li class="dropdown-item"><a href="" data-action="{{ctx.action}}" class="{{css.dropDownItem}} {{css.dropDownItemButton}}">{{ctx.text}}</a></li>',
        actionDropDownCheckboxItem: '<li class="dropdown-item"><label class="{{css.dropDownItem}}"><input name="{{ctx.name}}" type="checkbox" value="1" class="{{css.dropDownItemCheckbox}}" {{ctx.checked}} /> {{ctx.label}}</label></li>',
        paginationItem: '<li class="page-item {{ctx.css}}"><a href="" data-page="{{ctx.page}}" class="page-link {{css.paginationButton}}">{{ctx.text}}</a></li>',
        search: "<div class=\"{{css.search}}\"><div class=\"input-group\"><div class=\"input-group-prepend\"><span class=\"input-group-text bg-transparent b0\"><em class=\"{{css.icon}} {{css.iconSearch}}\"></span></em></div> <input type=\"text\" class=\"{{css.searchField}}\" placeholder=\"{{lbl.search}}\" /></div></div>"
      }
    }).on('loaded.rs.jquery.bootgrid', function() {
      /* Executes after data is loaded and rendered */
      grid.find('.command-edit').on('click', function() {
        console.log('You pressed edit on row: ' + $(this).data('row-id'));
      }).end().find('.command-delete').on('click', function() {
        console.log('You pressed delete on row: ' + $(this).data('row-id'));
      });
    });

  }

})();
(function() {
  'use strict';

  $(tableDatatables);

  function tableDatatables() {

    if (!$.fn.dataTable) return;

    // Filter

    $('#datatable2').DataTable({
      'paging': true, // Table pagination
      'ordering': true, // Column ordering
      'info': true, // Bottom left status text
      // Text translation options
      // Note the required keywords between underscores (e.g _MENU_)
      oLanguage: {
        sSearch: 'Search all columns:',
        sLengthMenu: '_MENU_ records per page',
        info: 'Showing page _PAGE_ of _PAGES_',
        zeroRecords: 'Nothing found - sorry',
        infoEmpty: 'No records available',
        infoFiltered: '(filtered from _MAX_ total records)',
        oPaginate: {
          sNext: '<em class="ion-ios-arrow-right"></em>',
          sPrevious: '<em class="ion-ios-arrow-left"></em>'
        }
      },
      // Datatable Buttons setup
      dom: 'Bfrtip',
      buttons: [
        { extend: 'copy', className: 'btn-info' },
        { extend: 'csv', className: 'btn-info' },
        { extend: 'excel', className: 'btn-info', title: 'XLS-File' },
        { extend: 'pdf', className: 'btn-info', title: $('title').text() },
        { extend: 'print', className: 'btn-info' }
      ]
    });

    $('#datatable3').DataTable({
      'paging': true, // Table pagination
      'ordering': true, // Column ordering
      'info': true, // Bottom left status text
      // Text translation options
      // Note the required keywords between underscores (e.g _MENU_)
      oLanguage: {
        sSearch: 'Search all columns:',
        sLengthMenu: '_MENU_ records per page',
        info: 'Showing page _PAGE_ of _PAGES_',
        zeroRecords: 'Nothing found - sorry',
        infoEmpty: 'No records available',
        infoFiltered: '(filtered from _MAX_ total records)',
        oPaginate: {
          sNext: '<em class="ion-ios-arrow-right"></em>',
          sPrevious: '<em class="ion-ios-arrow-left"></em>'
        }
      },
      // Datatable key setup
      keys: true
    });



  }

})();
(function() {
  'use strict';

  $(initFooTable);

  function initFooTable() {

    if (!$.fn.footable) return;

    $('.footable').footable();
    $('.footable-sort').footable();

    $('.sort-column').click(function(e) {
      e.preventDefault();
      //get the footable sort object
      var footableSort = $('.footable-sort').data('footable-sort');
      //get the index we are wanting to sort by
      var index = $(this).data('index');
      footableSort.doSort(index, 'toggle');
    });

  }

})();
(function() {
  'use strict';

  $(initTranslation);

  // Global configuration
  var preferredLang = 'en';
  var pathPrefix    = 'static/i18n'; // folder of json files
  var packName      = 'site';

  function initTranslation() {

    if (!$.fn.localize) return;

    // set initial options
    var opts = {
      language: preferredLang,
      pathPrefix: pathPrefix,
      callback: function(data, defaultCallback) {
        defaultCallback(data);
      }
    };

    // Set initial language
    setLanguage(opts);

    // Listen for changes
    $('.language-select').on('change', function() {

      var selectedLang = this.value;

      if (selectedLang && opts.language !== selectedLang) {

        opts.language = selectedLang;

        setLanguage(opts);

        activateDropdown($(this));
      }

    });
  }

  // Update translated text
  function setLanguage(options) {
    $('[data-localize]').localize(packName, options);
  }

  // Set the current clicked text as the active dropdown text
  function activateDropdown(elem) {
    var menu = elem.parents('.dropdown-menu');
    if (menu.length) {
      var toggle = menu.prev('button, a');
      toggle.text(elem.text());
    }
  }

})();


(function() {
  'use strict';

  $(userLock);

  function userLock() {

    if (!$.fn.validate) return;

    var $form = $('#user-lock');
    $form.validate({
      errorPlacement: errorPlacementInput,
      // Form rules
      rules: {
        accountName: {
          required: true,
          email: true
        }
      },
      submitHandler: function(/*form*/) {
        // form.submit();
        console.log('Form submitted!');
        // move to dashboard
        window.location.href = 'dashboard.html';
      }
    });
  }


  // Necessary to place dyncamic error messages
  // without breaking the expected markup for custom input
  function errorPlacementInput(error, element) {
    if ( element.is(':radio') || element.is(':checkbox')) {
      error.insertBefore(element.parent());
    }
    else if ( element.parent().is('.input-group') ) {
      error.insertBefore(element.parent());
    }
    else {
      error.insertBefore(element);
    }
  }

})();

(function() {
  'use strict';

  $(userRecover);

  function userRecover() {

    if (!$.fn.validate) return;

    var $form = $('#user-recover');
    $form.validate({
      errorPlacement: errorPlacementInput,
      // Form rules
      rules: {
        accountName: {
          required: true,
          email: true
        }
      },
      submitHandler: function(/*form*/) {
        console.log('Form submitted!');
      }
    });
  }

  // Necessary to place dyncamic error messages
  // without breaking the expected markup for custom input
  function errorPlacementInput(error, element) {
    if ( element.is(':radio') || element.is(':checkbox')) {
      error.insertAfter(element.parent());
    }
    else if ( element.parent().is('.input-group') ) {
      error.insertAfter(element.parent());
    }
    else {
      error.insertAfter(element);
    }
  }

})();

(function() {
  'use strict';

  $(userSignin);

  function userSignin() {

    if (!$.fn.validate) return;

    var $form = $('#user-login');
    $form.validate({
      errorPlacement: errorPlacementInput,
      // Form rules
      rules: {
        accountName: {
          required: true,
          email: true
        },
        accountPassword: {
          required: true
        }
      },
      submitHandler: function(/*form*/) {
        // form.submit();
        console.log('Form submitted!');
      }
    });
  }

  // Necessary to place dyncamic error messages
  // without breaking the expected markup for custom input
  function errorPlacementInput(error, element) {
    if ( element.is(':radio') || element.is(':checkbox')) {
      error.insertAfter(element.parent());
    }
    else {
      error.insertAfter(element);
    }
  }

})();

(function() {
  'use strict';

  $(userSignup);

  function userSignup() {

    if (!$.fn.validate) return;

    var $form = $('#user-signup');
    $form.validate({
      errorPlacement: errorPlacementInput,
      // Form rules
      rules: {
        accountName: {
          required: true,
          email: true
        },
        accountPassword: {
          required: true
        },
        accountPasswordCheck: {
          required: true,
          equalTo: '#account-password'
        }
      },
      submitHandler: function( /*form*/ ) {
        // form.submit();
        console.log('Form submitted!');
        $('#form-ok').hide().removeClass('invisible').show(500);
      }
    });
  }


  // Necessary to place dyncamic error messages
  // without breaking the expected markup for custom input
  function errorPlacementInput(error, element) {
    if (element.is(':radio') || element.is(':checkbox')) {
      error.insertAfter(element.parent());
    } else {
      error.insertAfter(element);
    }
  }

})();
(function() {
  'use strict';

  $(initScreenfull);

  function initScreenfull() {
    var element = $('[data-toggle-fullscreen]');
    // Not supported under IE
    if (msie()) {
      element.hide();
    } else {
      element.on('click', function(e) {
        e.preventDefault();

        if (screenfull.enabled) {

          screenfull.toggle();

        } else {
          // Fullscreen not enabled
        }

      });
    }
  }

  function msie() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    return (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./));
  }

})();

(function() {

  'use strict';

  $(initWidgets);

  function initWidgets() {

    if(!$.fn.peity) return;

    $('.line1').peity('line', {
      fill: [Colors.byName('blue-200')],
      stroke: Colors.byName('blue-500'),
      strokeWidth: 2,
      height: 20,
      width: 60
    });

    $('.line2').peity('line', {
      fill: [Colors.byName('green-200')],
      stroke: Colors.byName('green-500'),
      strokeWidth: 2,
      height: 20,
      width: 60
    });

    $('.line3').peity('line', {
      fill: 'rgba(255,255,255,0.5)',
      stroke: '#fff',
      strokeWidth: 2,
      height: 20,
      width: 60
    });

    $('.bar1').peity('bar', {
      fill: [Colors.byName('deepPurple-500')],
      height: 30,
      width: 60
    });

    $('.bar2').peity('bar', {
      fill: [Colors.byName('pink-500')],
      height: 30,
      width: 60
    });

  }

})();

(function() {

  'use strict';

  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  $(document).ready(function() {
    $('#wallet-id').text(guid());
  });

})();
