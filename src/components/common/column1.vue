<template>
  <div class="column" :style="{width: getBoxSpan(span)/24*100 + '%'}">
    <div class="column-header">
      <icon v-if="icon" :name="icon" scale="2.5"></icon>
      <span class="blank"></span>
      <span>{{title}}</span>
    </div>
    <div class="column-body">
      <template v-if="!type">
        <div class="column-item" v-for="(item,index) in data" :key="index">
          <div class="text">
            <p class="ellipsis">
              {{item[name[0]]}}
            </p>
            <p class="grey ellipsis" v-if="name[1]">{{item[name[1]]}}</p>
          </div>
          <!-- <component v-if="component" :is="component" :item="item">
          </component> -->
        </div>
      </template>
      <template v-else-if="type === 'control'">
        <div class="column-item action" v-for="(item,index) in data" :key="index">
          <div class="text">
            <p class="ellipsis" @click="control[0](item.id)">
              {{name[0]}}
            </p>
            <p class="ellipsis" @click="control[1](item.id)">{{name[1]}}</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
// const templateOfTwoLine = {
//   props: ['item'],
//   template: `
//     <div class="text">
//       <p class="ellipsis">
//           {{item[name[0]]}}
//        </p>
//       <p class="grey ellipsis" v-if="name[1]">{{item[name[1]]}}</p>
//     </div>
//   `
// }
// const templateOfnormal = {
//   props: ['item'],
//   template: `
//     <div class="text" v-if="item.name.length > 0">
//       <p class="ellipsis" v-for="(ud,index) in item.name">
//           {{ud}}
//        </p>
//     </div>
//   `
// }
// const templateOfTag = {
//   props: ['unitdata'],
//   template: `
//     <div class="text" v-if="unitdata.name.length > 0">
//       <p class="ellipsis" v-for="(ud,index) in unitdata.name">
//           {{ud}}
//        </p>
//     </div>
//   `
// }
export default {
  props: ['span', 'title', 'icon', 'data', 'name', 'type', 'control', 'component'],
  data () {
    return {}
  },

  components: {
    // templateOfTwoLine,
    // templateOfnormal
    // templateOfTag
  },

  computed: {},

  mounted () {

  },

  methods: {
    getBoxSpan: val => {
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
@grey: #9ca8b3;
.column {
  float: left;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  // align-content: center;
  .column-header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #f8f8fc;
    color: #000000;
    position: relative;
    text-align: left;
    padding: 0 10px;
    svg {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    .blank {
      display: inline-block;
      width: 25px;
    }
  }
  .column-body {
    width: 100%;
    .column-item {
      width: 100%;
      padding: 0 10px;
      height: 60px;
      text-align: center;
      position: relative;
      &.action {
        p {
          color: #4365fc;
          cursor: pointer;
        }
      }
      .text {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        line-height: 20px;
        color: #2f2f2f;
        font-size: 12px;
        max-width: 80%;
        text-align: left;
        .grey {
          color: @grey;
        }
      }
    }
  }
}
</style>
