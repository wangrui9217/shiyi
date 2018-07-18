<template>
  <div>
    <my-form ref="childMethod" title="报警日历" @modalConfirm="modalConfirm" :width="811" buttonText="保存">
      <div slot="content">
        <div class="calendar">
          <div class="month">
            <ul>
              <li><span class="choose-month">{{ currentMonth }}</span>月</li>
              <li class="arrow" @click="pickPreMonth(currentYear,currentMonth)">
                <i class="el-icon-caret-left"></i>
              </li>
              <li class="arrow" @click="pickNextMonth(currentYear,currentMonth)">
                <i class="el-icon-caret-right"></i>
              </li>
                <span class="choose-year">{{ currentYear }}年</span>
              <li>
                <i class="el-icon-caret-top" @click="pickPreYear(currentYear,currentMonth)"></i>
                <i class="el-icon-caret-bottom" @click="pickNextYear(currentYear,currentMonth)"></i>
              </li>
            </ul>
          </div>
          <ul class="weekdays">
            <li>Monday</li>
            <li>Tuesday</li>
            <li>Wednesday</li>
            <li>Thursday</li>
            <li>Friday</li>
            <li>Saturday</li>
            <li>Sunday</li>
          </ul>
          <ul class="days">
            <li  v-for="(dayobject, index) in days" :key="index" class="dayItem" :class="{'top-right':(index+1)%7 !== 0,'top':(index+1)%7 === 0,
            'active':dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() &&
            dayobject.day.getDate() == new Date().getDate(), 'other-month':dayobject.day.getMonth()+1 != currentMonth}">
                <span>{{ dayobject.day.getDate() }}</span>
              <template v-if="dayobject.day.getMonth()+1 == currentMonth">
                <div class="yellow right-1" v-if="isThisDay(dayobject.day)"></div>
                <div class="red right-2" v-if="isThisDay(dayobject.day)"></div>
              </template>
            </li>
          </ul>
          <div class="desc">
            说明：
            <span class="yellow"></span>代表未上班
            <span class="red"></span>代表未回家
          </div>
        </div>
      </div>
    </my-form>
  </div>
</template>

<script>
import dateFormat from 'dateformat'
import {
  getMessageDate
} from '../../service/index'
export default {
  data () {
    return {
      pageSize: 40,
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      days: [],
      messageDateInfo: []
    }
  },
  methods: {
    isThisDay (date) {
      let flag = false
      this.messageDateInfo.map(value => {
        if (value.alarm_time.indexOf(dateFormat(date, 'yyyy-mm-dd')) !== -1) {
          flag = true
        }
      })
      return flag
    },
    getMessageDateInfo (id, date) {
      let params = {
        'per-page': this.pageSize,
        'search[car_id]': id,
        'search[date]': date
      }
      getMessageDate(params).then(res => {
        this.messageDateInfo = res.items
        console.log(res, 1111)
      })
    },
    initData: function (cur) {
      var date
      if (cur) {
        date = new Date(cur)
      } else {
        var now = new Date()
        var d = new Date(this.formatDate(now.getFullYear(), now.getMonth(), 1))
        d.setDate(35)
        date = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
      }
      this.currentDay = date.getDate()
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1
      this.currentWeek = date.getDay() // 1...6,0
      if (this.currentWeek === 0) {
        this.currentWeek = 7
      }
      var str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay)
      this.days.length = 0
      for (let i = this.currentWeek - 1; i >= 0; i--) {
        let d = new Date(str)
        d.setDate(d.getDate() - i)
        let dayobject = {}
        dayobject.day = d
        this.days.push(dayobject)
      }
      for (var i = 1; i <= 42 - this.currentWeek; i++) {
        let d = new Date(str)
        d.setDate(d.getDate() + i)
        let dayobject = {}
        dayobject.day = d
        this.days.push(dayobject)
      }
    },
    pickPreMonth: function (year, month) {
      var d = new Date(this.formatDate(year, month, 1))
      d.setDate(0)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    pickNextMonth: function (year, month) {
      var d = new Date(this.formatDate(year, month, 1))
      d.setDate(32)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    pickPreYear: function (year, month) {
      var d = new Date(this.formatDate(year, month, 1))
      d = this.preYear(d)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    pickNextYear: function (year, month) {
      var d = new Date(this.formatDate(year, month, 1))
      d = this.nextYear(d)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    preYear: function (date) {
      for (let i = 0; i < 12; i++) {
        date.setDate(0)
      }
      return date
    },
    nextYear: function (date) {
      for (let i = 0; i < 12; i++) {
        date.setDate(32)
      }
      return date
    },

    formatDate: function (year, month, day) {
      var y = year
      var m = month
      if (m < 10) m = '0' + m
      var d = day
      if (d < 10) d = '0' + d
      return y + '-' + m + '-' + d
    },
    modalOpen () {
      this.$refs.childMethod.modalOpen()
    },
    modalConfirm () {
      this.$refs.childMethod.modalClose()
    },
    formatMonth (mon) {
      if (mon < 10) {
        return '0' + mon
      } else {
        return mon
      }
    }
  },
  mounted () {
    this.initData(null)
  },
  components: {},
  filters: {},
  computed: {
    dateInfo: function () {
      return this.currentYear.toString() + this.formatMonth(this.currentMonth).toString()
    }
  },
  watch: {
    dateInfo (newValue, oldValue) {
      this.getMessageDateInfo('1', newValue)
    }
  }
}
</script>

<style scoped lang="less">
  @style-color: #4F6FFF;
  .calendar{
    padding: 0 25px;
    border: 1px solid #eeeeee;
    .month{
      user-select: none;
      &>ul{
        display: flex;
        justify-content: flex-end;
        height: 50px;
        align-items: center;
        font-size: 16px;
        color: @style-color;
        .choose-month{
          font-size: 28px;
        }
      }
      i{
        font-size: 18px;
        color: #CCCCCC;
        cursor: pointer;
      }
    }
    .weekdays{
      color: #AAAAAA;
      font-size: 12px;
      display: flex;
      &>li{
        align-items: center;
        display: flex;
        justify-content: center;
        height: 30px;
        width: 14.28%;
        border-right: 1px solid #EEEEEE;
      }
      &>li:nth-last-child(1){
        border-right: none;
      }
    }
    .days{
      display: flex;
      flex-wrap: wrap;
      .dayItem{
        text-align: left;
        width: 14.28%;
        height: 60px;
        position: relative;
        padding: 11px;
        font-size: 16px;
        color: #333;
      }
      .top-right{
        border-top: 1px solid #eee;
        border-right: 1px solid #eee;
      }
      .top{
        border-top: 1px solid #eee;
      }
      .other-month{
        color: #ccc;
        .yellow ,.red{
         opacity: 0.2;
        }
      }
      .active{
        color: #fff;
        background: linear-gradient(to bottom right, #66adfe , #5a78f9);
      }
      .right-1{
        position: absolute;
        right: 10px;
        top: 25px;
      }
      .right-2{
        position: absolute;
        right: 10px;
        top: 45px;
      }
    }
    .desc{
      margin-top: 20px;
      display: flex;
      align-items: center;
      height: 50px;
      font-size: 12px;
      color: #333;
      &>span{
        margin: 0 8px 0 20px;
      }
    }
    .yellow{
      width: 11px;
      height: 11px;
      background-color: #FFD803;
    }
    .red{
      width: 11px;
      height: 11px;
      background-color: #FF6E03;
    }
  }

</style>
