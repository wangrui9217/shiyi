<template>
  <div class="upload">
    <!-- <div class="upload-title">{{picTitle}}：</div> -->
    <div  class="upload-box">
    <el-upload
    :class="{disabled:upLoadHide}"
    :action="upLoadPictureUrl" :headers="headers" list-type="picture-card" :on-success="upLOadSuccess" :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    </div>
  </div>
</template>
<script>
import { upLoadPictureUrl } from '@/service/index'
export default {
  name: 'upload',
  data () {
    return {
      upLoadPictureUrl: `${process.env.API_HOST}${upLoadPictureUrl}`,
      headers: {
        Authorization: `Bearer ${this.$cookie.get('token')}`
      },
      picArr: [],
      picArr1: [],
      limit: this.allowNumber,
      Number: this.num
      // picStr: this.pictureStr
      // picTitle: this.title
    }
  },
  props: {
    pictureArr: {},
    allowNumber: {
      type: Number
    },
    num: {}
  },
  // props: ['pictureArr', 'allowNumber', 'title'],
  computed: {
    upLoadHide: function () {
      if (this.picArr1.length === this.limit) {
        // alert(2)
        // alert(this.picArr1.length)
        // console.log('1', this.picArr1)
        return true
      }
      return false
    }
  },
  mounted () {
    this.paramHandle()
  },
  methods: {
    paramHandle () {
      if (!this.picArr) {
        this.picArr = []
      }
      if (this.picArr && typeof this.picArr === 'string') {
        this.picArr = this.picArr.split(',')
      }
      this.picArr1 = this.picArr
    }, // 参数处理
    handleRemove (file, fileList) {
      this.picArr = []
      if (fileList.length > 0) {
        fileList.forEach(element => {
          this.picArr.push(element.response)
        })
      }
      this.picArr1 = this.picArr
      let obj = {
        pictureUrlArr: this.picArr,
        pictureUrlStr: this.picArr.toString(),
        Number: this.Number
      }
      this.$emit('pictureChange', obj)
    },
    upLOadSuccess (response, file, fileList) {
      this.picArr = []
      fileList.forEach(element => {
        this.picArr.push(element.response.message)
      })
      this.picArr1 = this.picArr
      let obj = {
        pictureUrlArr: this.picArr,
        pictureUrlStr: this.picArr.toString(),
        Number: this.Number
      }
      this.$emit('pictureChange', obj)
    } // 上传成功
    // upLoadError (err, file, fileList) {
    //   // console.log('err', err)
    //   // console.log('file', file)
    //   // console.log('fileList', fileList)
    // } // 上传失败
  }
}
</script>

<style lang="less" scoped>
  .upload{
  display: flex;
  margin-bottom: 10px;
    .upload-title{
      width: 110px;
      font-size: 18px;
      color: #909090;
      text-align: left
    }
  }
  /deep/.disabled .el-upload--picture-card{
    display: none;
  }
</style>
