<template>
  <div class="column" :class="{center:isCenter}" :style="{width: getBoxSpan(span)/24*100 + '%'}">
    <template v-if="type === 'control' || type === 'control2'">
      <div class="column-header control">
        <icon v-if="icon" :name="icon" scale="2.5"></icon>
        <span v-if="icon" class="blank"></span>
        <span>{{title}}</span>
      </div>
    </template>
    <template v-else>
      <div class="column-header">
        <icon v-if="icon" :name="icon" scale="2.5"></icon>
        <span v-if="icon" class="blank"></span>
        <span>{{title}}</span>
      </div>
    </template>
    <div class="column-body">
      <template v-if="!type">
        <div class="column-item" v-for="(item,index) in data" :key="index">
          <div class="text">
            <p class="ellipsis">
              {{item[name[0]]}}
            </p>
            <p class="grey ellipsis" v-if="name[1]">{{item[name[1]]}}</p>
          </div>
        </div>
      </template>
      <template v-else-if="type === 'control'">
        <div class="column-item action" v-for="(item,index) in data" :key="index">
          <div class="text">
            <p class="ellipsis" @click="control[0](params[0] ? item[params[0]] : item)">
              {{name[0]}}
            </p>
            <p class="ellipsis" @click="control[1](params[1] ? item[params[1]] : item)">{{name[1]}}</p>
          </div>
        </div>
      </template>
      <template v-else-if="type === 'tags'">
        <div class="column-item ellipsis" v-for="(item,index) in data" :key="index">
          <div class="text">
            <el-tag size="mini" style="margin-right: 5px;margin-bottom: 5px;" v-if="index < 2" v-for="(ele,index) in item.business_name" :key="index">{{ele}}</el-tag>
            <el-tag size="mini" v-if="item.business_name.length > 2">...</el-tag>
          </div>
        </div>
      </template>
      <template v-else-if="type === 'control2'">
        <div class="column-item action" v-for="(item,index) in data" :key="index">
          <div class="text">
            <span v-for="(ele,inx) in name" :key="inx" class="action-tip" @click="control[inx](params[inx] ? item[params[inx]] : item)">
              <icon v-if="ele.icon" :name="ele.icon" scale="2"></icon>
              <span v-if="ele.icon" class="blank"></span>
              <span>{{ele.label}}</span>
            </span>
            <!-- <p class="ellipsis" @click="control[0](params[0] ? item[params[0]] : item)">
              {{name[0]}}
            </p>
            <p class="ellipsis" @click="control[1](params[1] ? item[params[1]] : item)">{{name[1]}}</p> -->
          </div>
        </div>
      </template>
      <template v-else-if="type === 'control3'">
        <div class="column-item action" v-for="(item,index) in data" :key="index">
          <div class="text">
            <p class="ellipsis">
              <span @click="control[0](params[0] ? item[params[0]] : item)"><icon :name="name[0].icon"></icon>{{name[0].name}}</span>
              &nbsp;&nbsp;
              <span @click="control[1](params[1] ? item[params[1]] : item)"><icon :name="name[1].icon"></icon>{{name[1].name}}</span>
            </p>
            <p class="ellipsis">
              <span @click="control[2](params[2] ? item[params[2]] : item)"><icon :name="name[2].icon"></icon>{{name[2].name}}</span>
              &nbsp;&nbsp;
              <span @click="control[3](params[3] ? item[params[3]] : item)"><icon :name="name[3].icon"></icon>{{name[3].name}}</span>
            </p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: ['span', 'title', 'icon', 'data', 'name', 'type', 'control', 'isCenter', 'params'],
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  mounted () {},

  methods: {
    getBoxSpan: (val) => {
      if (typeof val === 'number' && val) {
        return val
      } else {
        return 6
      }
    },
    action1 (id) {
      this.$emit('action1', id)
    },
    action2 (id) {
      this.$emit('action2', id)
    }
  }
}

</script>
<style lang='less' scoped>
@grey:#9CA8B3;
.column{
  float: left;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  // align-content: center;
  &.center{
    .column-header{
      text-align: center;
    }
    .column-body{
      .column-item{
        .text{
          left: 50%;
          transform: translate(-50%,-50%);
        }
      }
    }
  }
  .column-header{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #F8F8FC;
    color: #000000;
    position: relative;
    text-align: left;
    // padding: 0 20px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    &.control{
      text-align: right;
    }
    svg{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    .blank{
      display: inline-block;
      width: 25px;
    }
  }
  .column-body{
    width: 100%;
    .column-item{
      width: 100%;
      // padding: 0 20px;
      height: 60px;
      text-align: center;
      position: relative;
      border-bottom: 1px solid #eee;
      &.action{
        .text{
          right: 20px;
        }
        p{
          color: #4365fc;
          cursor: pointer;
        }
        .action-tip{
          color: #4365fc;
          display: inline-block;
          height: 30px;
          line-height: 30px;
          position: relative;
          margin-left: 30px;
          cursor: pointer;
          .blank{
            display: inline-block;
            width: 20px;
          }
          /deep/svg{
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            path{
              fill: #4365fc;
            }
          }
        }
      }
      .text{
        position: absolute;
        top:50%;
        transform: translateY(-50%);
        line-height: 20px;
        color: #2f2f2f;
        font-size: 12px;
        max-width: 80%;
        text-align: left;
        .grey{
          color: @grey;
        }
      }
    }
  }
}
</style>
