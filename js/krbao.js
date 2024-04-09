/**
 * 将rem和px单位数值互换
 * @param {Number} remVal 需要转换的以rem作为单位的值
 * @param {Boolean} toRem  转换方式 false:将rem转换成px true:将px转换成rem
 * @param {Boolean} needUnit 返回值是否需要单位 如果为true 则返回带px单位的字符串
 * @returns
 */
$.unitConvert = (val, toRem, needUnit) => {
  // 获取根元素的字体大小（font-size）
  let rootFontSize = parseFloat(
    window.getComputedStyle(document.documentElement).fontSize
  );
  let returnVal;
  if (isNaN(val)) {
    return val;
  } else {
    returnVal = toRem ? val / rootFontSize : val * rootFontSize;
  }
  return needUnit ? `${returnVal}${toRem ? "rem" : "px"}` : returnVal;
};

// 7日异常信息统计柱状图
(function () {
  let abnormalContainer = document.getElementById("abnormalChart");
  let abnormalChart = echarts.init(abnormalContainer);
  option = {
    // 柱状图图例配置
    legend: {
      icon: "circle", // 图例中图形设为圆形
      itemHeight: 5, // 图例中图形高度
      itemWidth: 5, // 图例中图形宽度
      textStyle: {
        color: "#fff", // 图例文字颜色
        fontSize: 12,
      },
    },
    tooltip: {},
    dataset: {
      source: [
        ["product", "车辆出库", "采集失败", "异常拔出"],
        ["04/04", 43, 25, 33],
        ["04/05", 34, 43, 15],
        ["04/06", 6, 15, 12],
        ["04/07", 15, 37, 3],
        ["04/08", 20, 16, 9],
        ["04/09", 31, 32, 10],
        ["04/10", 12, 13, 9],
      ],
    },
    xAxis: {
      type: "category",
      axisLine: {
        lineStyle: {
          color: "#033C6A",
        },
      },
      splitLine: {
        lineStyle: {
          color: ["#033C6A"],
        },
      },
    },
    yAxis: {
      name: "单位/台", // y轴名称
      nameTextStyle: {
        color: "#fff",
        fontSize: 14,
      },
    },
    textStyle: {
      color: "#fff",
    },
    series: [
      {
        type: "bar",
        showBackground: false,
        itemStyle: {
          color: "#ff9900",
        },
      },
      {
        type: "bar",
        showBackground: false,
        itemStyle: {
          color: "#05f5fe",
        },
      },
      {
        type: "bar",
        showBackground: false,
        itemStyle: {
          color: "#ff3300",
        },
      },
    ],
  };
  abnormalChart.setOption(option);

  window.addEventListener("resize", function () {
    setTimeout(() => {
      abnormalChart.resize();
    }, 100);
  });
})();

// 30日内车辆入库/结清数
(function () {
  let curveContainer = document.getElementById("curveChart");
  let curveChart = echarts.init(curveContainer);
  option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: ["安装数", "离线数"],
      lineStyle: {
        width: 1,
      },
      itemHeight: 5,
      textStyle: {
        color: "#fff", // 图例文字颜色
        fontSize: 12,
      },
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: [
          "03/12",
          "03/13",
          "03/14",
          "03/15",
          "03/16",
          "03/17",
          "03/18",
          "03/19",
          "03/20",
          "03/21",
          "03/22",
          "03/23",
          "03/24",
          "03/25",
          "03/26",
          "03/27",
          "03/28",
          "03/29",
          "03/30",
          "03/31",
          "04/01",
          "04/02",
          "04/03",
          "04/04",
          "04/05",
          "04/06",
          "04/07",
          "04/08",
          "04/09",
          "04/10",
        ],
      },
    ],
    yAxis: {
      name: "单位/台",
    },
    textStyle: {
      color: "#fff",
    },
    series: [
      {
        name: "安装数",
        type: "line",
        areaStyle: {
          color: "#06FAAC",
          opacity: 0.1,
        },
        itemStyle: {
          color: "#66FFFF",
        },
        emphasis: {
          focus: "series",
        },
        smooth: true,
        data: [
          235, 216, 193, 195, 179, 152, 136, 138, 142, 148, 150, 153, 155, 149,
          143, 136, 130, 138, 145, 149, 155, 164, 173, 179, 183, 185, 186, 189,
          202, 223,
        ],
      },
      {
        name: "离线数",
        type: "line",
        areaStyle: {
          color: "#05f5fe",
          opacity: 0.1,
        },
        itemStyle: {
          color: "#04CC80",
        },
        emphasis: {
          focus: "series",
        },
        smooth: true,
        data: [
          151, 160, 172, 183, 192, 202, 213, 224, 234, 238, 236, 231, 224, 216,
          207, 198, 185, 170, 153, 144, 140, 146, 150, 154, 156, 157, 152, 143,
          126, 105,
        ],
      },
    ],
  };
  curveChart.setOption(option);

  window.addEventListener("resize", function () {
    setTimeout(() => {
      curveChart.resize();
    }, 100);
  });
})();

// 全国车辆分布地图
(function () {
  let mapContainer = document.getElementById("chinaMap");
  let chinaMap = echarts.init(mapContainer);
  const areaColor = {
    type: "linear",
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      {
        offset: 0,
        color: "#60F2F4", // 0% 处的颜色
      },
      {
        offset: 1,
        color: "#0163F4", // 100% 处的颜色
      },
    ],
  };
  chinaMap.setOption({
    geo: {
      // 这个是重点配置区
      map: "china", // 表示中国地图 名称来自china.js中注册的名称 echarts.registerMap("china", {]})
      roam: false, // 是否允许鼠标缩放
      zoom: 1.2, // 地图当前视角缩放比例
      aspectScale: 0.8,
      label: {
        show: false, // 是否显示对应地名
      },
      itemStyle: {
        normal: {
          borderColor: "#5FF0F4", // 区域边框颜色
          borderWidth: "1", // 区域边框粗细
          areaColor: "#0C1931",
          shadowBlur: 10, // 地图发光特效
          shadowColor: "rgba(97, 243, 244, 0.5)",
        },
        emphasis: {
          areaColor,
        },
      },
      select: {
        label: {
          show: false,
        },
        itemStyle: {
          areaColor: "transparent",
        },
      },
    },
    series: [
      {
        name: "地点", // 浮动框的标题
        type: "map",
        geoIndex: 0,
        selectedMode: "single",
        data: [],
      },
      {
        // 在地图上标记地点
        type: "effectScatter",
        coordinateSystem: "geo",
        z: 10,
        data: [
          {
            value: [116.46, 35.5, "normal"],
          },
          {
            value: [105, 34.25, "normal"],
          },
          {
            value: [95.8, 40.5, "normal"],
          },
          {
            value: [104, 28, "normal"],
          },
          {
            value: [101.25, 26.7, "normal"],
          },
          {
            value: [99.6, 25.23, "normal"],
          },
          {
            value: [102.24, 25.23, "normal"],
          },
          {
            value: [103.6, 25.23, "normal"],
          },
          {
            value: [102.88, 23.64, "normal"],
          },
          {
            value: [100.41, 23.72, "normal"],
          },
          {
            value: [100.71, 22.67, "normal"],
          },
          {
            value: [122.91, 52.48, "normal"],
          },
          {
            value: [121.98, 52.9, "normal"],
          },
          {
            value: [123.05, 52.95, "normal"],
          },
          {
            value: [125, 51.77, "normal"],
          },
          {
            value: [125.28, 52.2, "normal"],
          },
          {
            value: [124.23, 52.1, "normal"],
          },
          {
            value: [126.07, 49.18, "normal"],
          },
          {
            value: [126.2, 47.95, "normal"],
          },
          {
            value: [128.04, 48.51, "normal"],
          },
          {
            value: [124.11, 47.27, "normal"],
          },
          {
            value: [127.83, 47.72, "normal"],
          },
          {
            value: [126.18, 46.66, "normal"],
          },
          {
            value: [126.08, 46.56, "normal"],
          },
          {
            value: [128.18, 47.03, "normal"],
          },
          {
            value: [127.74, 46.92, "normal"],
          },
          {
            value: [128.18, 45.84, "normal"],
          },
          {
            value: [129.85, 46.14, "normal"],
          },
          {
            value: [129.83, 46.93, "normal"],
          },
          {
            value: [100.2, 25.92, "abnormal"],
          },
          {
            value: [100.3, 26.8, "abnormal"],
          },
          {
            value: [99.8, 26.8, "abnormal"],
          },
        ],
        // symbol: "image://images/mark_yellow.svg",
        symbol: function(i) {
          return i[2] == "normal" ? "image://images/mark_yellow.svg" : "image://images/mark_red.svg";
        },
        symbolSize: function(i) {
          return i[2] == "normal" ? $.unitConvert(0.75) : $.unitConvert(1);
        }, // 标记点大小
        rippleEffect: {
          number: 2,
          period: 3,
          scale: 3
        },
        itemStyle: {
          shadowBlur: 0,
          opacity: 1,
        },
        label: {
          emphasis: {
            show: false,
          },
        },
        silent: true, // 图形是否不响应和触发鼠标事件 设置为true防止标记覆盖城市导致无法点击城市
      },
    ],
  });
  chinaMap.on("click", function (params) {
    if (params.componentType === "series") {
      if (params.seriesType === "map") {
        var province = params.name;
        // TODO: 根据省份名称加载相应的省份地图数据，并重新设置地图显示区域
        console.log("您点击了" + province);
      }
    }
  });
  chinaMap.resize();
  window.addEventListener("resize", function () {
    this.setTimeout(() => {
      chinaMap.resize();
    }, 100);
  });
})();

// 监管时长概况图表构造函数
function regChart(el, options) {
  this.el = $(el);
  this.options = options;
  // 渲染图表方法
  this.init = () => {
    const count = this.options.count || 0;
    const totalCount = this.options.totalCount || 0; // 总数
    const ocupancy = this.options.ocupancy || 0; // 占用数
    let _ratio = ocupancy / totalCount;
    const proportion = (_ratio * 100).toFixed(2) + "%"; //占比
    const isRight = this.options.isRight || false; // 左侧的图表进度条与右侧颜色区分 默认为左侧
    const normalColor = "#033550";
    const displayProgress = (_ratio * 75).toFixed(2) + "%"; // 实际展现出来的进度条长度比例 因为圆环实际长度只有75%

    // 图表结构字符串
    const chartDOM = `
      <div class="details-graph${isRight ? " right" : ""}" >
        <div class="empty-bar" style="background: conic-gradient(transparent 0%, transparent ${displayProgress}, ${normalColor} ${displayProgress}, ${normalColor} 75%, #06273D 75%, #06273D 100%);"></div>
        <div class="graph-mask">
          ${proportion}
          <b class="count">${count}</b>
        </div>
      </div>
      <div class="details-info">
        <p>
          <span class="label">总数:</span>
          <span class="value">${totalCount}</span>
        </p>
        <p>
          <span class="label">占用数:</span>
          <span class="value">${ocupancy}</span>
        </p>
      </div>
    `;
    this.el.html(chartDOM);
  };
}

$(function () {
  const baseFontSize = 16;
  const designWidth = 1920;
  const windowWidth = $(window).width();

  function remResize() {
    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth; // 获取当前窗口的宽度
    const fontSize = (windowWidth / designWidth) * baseFontSize; // 根根据当前窗口宽度计算根元素字体大小
    document.documentElement.style.fontSize = `${fontSize}px`; // 设置根元素字体大小
  }

  remResize();
  // 监听窗口大小变化 重设根元素字体大小
  $(window).on("resize", function () {
    remResize();
  });

  $("#abnormalChart>div, #chinaMap>div, #curveChart>div").css(
    "zoom",
    windowWidth / designWidth
  );
  $(window).one("resize", function () {
    $("#abnormalChart>div, #chinaMap>div, #curveChart>div").css(
      "zoom",
      "unset"
    );
  });

  // 设备总数/车辆总数数量变化
  let devicesCount = 1000; // 初始化设备总数
  let vehiclesCount = 1000; // 初始化车辆总数
  setInterval(() => {
    devicesCount++;
    vehiclesCount++;
    $("#devicesCount").text(devicesCount);
    $("#vehiclesCount").text(vehiclesCount);
  }, 1000);

  let databitRows = $(".databit-list").children("li").clone();
  $(".databit-list").append(databitRows);

  // 监管0~30天图表
  const regChart1 = new regChart("#regChart1", {
    count: 128,
    totalCount: 951,
    ocupancy: 475,
  });
  regChart1.init();

  // 监管1~3个月图表
  const regChart2 = new regChart("#regChart2", {
    count: 128,
    totalCount: 951,
    ocupancy: 634,
    isRight: true,
  });
  regChart2.init();

  // 监管3~6个月图表
  const regChart3 = new regChart("#regChart3", {
    count: 128,
    totalCount: 951,
    ocupancy: 300,
  });
  regChart3.init();

  // 监管半年以上图表
  const regChart4 = new regChart("#regChart4", {
    count: 128,
    totalCount: 951,
    ocupancy: 900,
    isRight: true,
  });
  regChart4.init();

  $("header").on("click", "#toggleBoard", function () {
    var frame = $("html")[0];
    if (frame.requestFullscreen) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        $(this).text("进入全屏> >");
      } else {
        frame.requestFullscreen();
        $(this).text("收起看板> >");
      }
    } else if (frame.mozRequestFullScreen) {
      /* Firefox */
      if (document.mozFullScreenElement) {
        document.mozCancelFullScreen();
        $(this).text("进入全屏> >");
      } else {
        frame.mozRequestFullScreen();
        $(this).text("收起看板> >");
      }
    } else if (frame.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      if (document.webkitFullscreenElement) {
        document.webkitExitFullscreen();
        $(this).text("进入全屏> >");
      } else {
        frame.webkitRequestFullscreen();
        $(this).text("收起看板> >");
      }
    } else if (frame.msRequestFullscreen) {
      /* IE/Edge */
      if (document.msFullscreenElement) {
        document.msExitFullscreen();
        $(this).text("进入全屏> >");
      } else {
        frame.msRequestFullscreen();
        $(this).text("收起看板> >");
      }
    }
  });
});
