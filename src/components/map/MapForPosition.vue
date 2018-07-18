<template>
  <!-- <div id="MapArea">xxx</div> -->
  <div id="MapArea">xxx</div>
  <!-- <div id="MapArea" :style="style">xxx</div> -->
</template>

<script>
import BMap from 'BMap'
export default {
  props: ['options'],
  data () {
    return {
      // style: 'width:' + (this.options.width || 500) + 'px; height:' + (this.options.height || 300) + 'px',
      simpleData: {
        width: 900,
        height: 700,
        id: 1,
        centerPoint: {
          longitude: 121.4392742313,
          latitude: 31.3450763623
        },
        arr: [
          {
            longitude: 121.4392,
            latitude: 31.3450
          },
          {
            longitude: 121.4397,
            latitude: 31.3450
          },
          {
            longitude: 121.4397,
            latitude: 31.3455
          },
          {
            longitude: 121.4392,
            latitude: 31.3455
          }
        ],
        strokeColor: '#5DAC81',
        strokeWeight: 2,
        fillColor: '#FB9966',
        fillOpacity: 0.3
      },
      mapObj: null,
      polygonOptions: {
        strokeColor: '#fff',
        strokeWeight: 2,
        fillColor: '#f45a46',
        fillOpacity: '0.2'
      }
    }
  },

  components: {},

  computed: {
    myDrawingManagerObject () {
      const params = {
        isOpen: true, // 是否开启绘制模式
        enableDrawingTool: false, // 是否显示工具栏
        drawingToolOptions: {
          // eslint-disable-next-line
          anchor: BMAP_ANCHOR_TOP_RIGHT, // 位置
          offset: new BMap.Size(20, 10), // 偏离值
          drawingModes: [
            // eslint-disable-next-line
            BMAP_DRAWING_CIRCLE,
            // eslint-disable-next-line
            BMAP_DRAWING_POLYGON
          ]
        },
        circleOptions: this.polygonOptions, // 圆的样式
        polygonOptions: this.polygonOptions // 多边形的样式
      }
      // eslint-disable-next-line
      return new BMapLib.DrawingManager(this.mapObj, params)
    }
  },

  mounted () {
    this.init()
    // console.log(this.style)
  },

  methods: {
    init () {
      var map = new BMap.Map('MapArea', {
        enableMapClick: false
      })// 创建地图实例
      this.mapObj = map
      var point = new BMap.Point(this.options.centerPoint.longitude, this.options.centerPoint.latitude)// 创建点坐标
      map.centerAndZoom(point, 16)
      map.addControl(new BMap.NavigationControl())
      // map.getCopyrightCollection(function (arr) {
      //   console.log(arr)
      // })
      map.enableScrollWheelZoom(true)
      function myFun (result) {
        var cityName = result.name
        map.setCenter(cityName)
      }
      var myCity = new BMap.LocalCity()
      myCity.get(myFun)
      // console.log(map.getCenter())
    },
    addOverlay (item) {
      const arr = item.location
      const str = JSON.stringify(item.location)
      const _this = this
      console.log(str)
      if (str.startsWith('{')) {
        console.log('hhh')
        const point = new BMap.Point(arr.lnglat[0], arr.lnglat[1])
        let circle = new BMap.Circle(point, arr.range, this.polygonOptions)
        let opts = {
          width: 0, // 信息窗口宽度
          height: 0, // 信息窗口高度
          title: '<h4 class="info-window title">位置详情</h4>' // 信息窗口标题
        }
        let infoWindow1 = new BMap.InfoWindow(`<div class="info-window content">
                                                <p><span style="width: 35%;display:inline-block;text-align: right" >名称: </span><span style="width: 65%;display:inline-block;text-align: left;padding-left: 10px" >${item.name}</span></p>
                                                <p><span style="width: 35%;display:inline-block;text-align: right" >类型: </span><span style="width: 65%;display:inline-block;text-align: left;padding-left: 10px" >${item.type_view}</span></p>
                                                <p><span style="width: 35%;display:inline-block;text-align: right" >范围: </span><span style="width: 65%;display:inline-block;text-align: left;padding-left: 10px" >${item.location.range}米半径圆形</span></p>
                                              </div>`, opts) // 创建信息窗口对象
        circle.addEventListener('click', function (event) {
          console.log(event.point)
          _this.$emit('resetFillColor')
          circle.setFillColor('#00ff00')
          _this.mapObj.openInfoWindow(infoWindow1, event.point)
        })
        _this.mapObj.addOverlay(circle)
        _this.mapObj.centerAndZoom(point, 16 - parseInt(arr.range / 1000))
        console.log(this.mapObj.getCenter())
        _this.mapObj.openInfoWindow(infoWindow1, this.mapObj.getCenter())
        return circle
      } else {
        const areaPoints = _this.pointsFormat(arr)
        let polygon = new BMap.Polygon(areaPoints, this.polygonOptions)
        let opts = {
          width: 0, // 信息窗口宽度
          height: 0, // 信息窗口高度
          title: '<h4 class="info-window title">位置详情</h4>' // 信息窗口标题
        }
        let infoWindow = new BMap.InfoWindow(`<div class="info-window content">
                                                <p><span style="width: 35%;display:inline-block;text-align: right" >名称: </span><span style="width: 65%;display:inline-block;text-align: left;padding-left: 10px" >${item.name}</span></p>
                                                <p><span style="width: 35%;display:inline-block;text-align: right" >类型: </span><span style="width: 65%;display:inline-block;text-align: left;padding-left: 10px" >${item.type_view}</span></p>
                                              </div>`, opts) // 创建信息窗口对象
        polygon.addEventListener('click', function (event) {
          console.log(event)
          _this.$emit('resetFillColor')
          polygon.setFillColor('#00ff00')
          _this.mapObj.openInfoWindow(infoWindow, event.point)
        })
        _this.mapObj.addOverlay(polygon)
        _this.mapObj.setViewport(areaPoints)
        setTimeout(function () {
          _this.mapObj.openInfoWindow(infoWindow, _this.mapObj.getCenter())
        }, 300)
        return polygon
      }
    },
    removeOverlay (polygon) {
      this.mapObj.removeOverlay(polygon)
      this.mapObj.closeInfoWindow()
    },
    pointsFormat (arr) {
      let Arr = []
      arr.forEach(el => {
        const point = new BMap.Point(el.lng, el.lat)
        Arr.push(point)
      })
      return Arr
    }
  }
}

</script>
<style lang='less' scoped>
#MapArea{
  width: 100%;
  height: 100%;
  margin: 0 auto;
  // /deep/.BMap_cpyCtrl{
  //   display:none;
  // }
  // /deep/.anchorBL{
  //   display:none;
  // }
  .blue{
    color: blue;
  }
}
</style>
