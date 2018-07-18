<template>
  <div class="index">
    <side-bar :menudata="sidemenu"></side-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import SideBar from '../../components/common/SideBar'
export default {
  components: {
    SideBar
  },
  data () {
    return {
      sidemenu: [
        // {
        //   menuname: '产品总览',
        //   type: 'menu-item',
        //   index: '/productcenter/products',
        //   children: []
        // },
        {
          menuname: '设备管理',
          type: 'menu-item',
          index: '/productcenter/equipment',
          children: [
            // {
            //   menuname: '设备列表',
            //   type: 'menu-item',
            //   route: '/productcenter/equipment'
            // },
            // {
            //   menuname: '年期卡列表',
            //   type: 'menu-item',
            //   route: '/productcenter/periodcard'
            // },
            // {
            //   menuname: '服务卡列表',
            //   type: 'menu-item',
            //   route: '/productcenter/servercard'
            // },
            // {
            //   menuname: '工单状态总览',
            //   type: 'menu-item',
            //   route: '/productcenter/jobstatus'
            // },
            // {
            //   menuname: '分析图表',
            //   type: 'menu-item',
            //   route: '/productcenter/analysis'
            // }
          ]
        },
        // {
        //   menuname: '年期卡管理',
        //   type: 'submenu',
        //   index: 'PeriodCard',
        //   children: [
        //     {
        //       menuname: '年期卡管理',
        //       type: 'menu-item',
        //       route: '/productcenter/periodcardmanagement'
        //     },
        //     {
        //       menuname: '年期卡续费',
        //       type: 'menu-item',
        //       route: '/productcenter/periodcardrenew'
        //     }
        //   ]
        // },
        // {
        //   menuname: '我要采购',
        //   type: 'submenu',
        //   index: 'Purchase',
        //   children: [
        //     {
        //       menuname: '产品采购',
        //       type: 'menu-item',
        //       route: '/productcenter/productpurchase'
        //     },
        //     {
        //       menuname: '采购订单',
        //       type: 'menu-item',
        //       route: '/productcenter/purchaseorder'
        //     },
        //     {
        //       menuname: '采购明细',
        //       type: 'menu-item',
        //       route: '/productcenter/purchasedetail'
        //     }
        //   ]
        // },
        {
          menuname: '工单管理',
          type: 'submenu',
          index: 'Jobs',
          children: [
            {
              menuname: '新增工单',
              type: 'menu-item',
              route: '/productcenter/addnewjob'
            },
            {
              menuname: '工单列表',
              type: 'menu-item',
              route: '/productcenter/joblist'
            }
            // {
            //   menuname: '安装明细',
            //   type: 'menu-item',
            //   route: '/productcenter/installdetail'
            // }
          ]
        }
        // {
        //   menuname: '产品操作日志',
        //   type: 'menu-item',
        //   index: '/productcenter/operationlog',
        //   children: []
        // }
      ]
    }
  },
  mounted () {
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.index{
  height: 100%;
  display: flex;
}
</style>
