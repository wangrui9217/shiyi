import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Login from '@/pages/login'
/* 车辆中心 */
import VehicleCenterIndex from '@/pages/VehicleCenter/index'
import VehicleManagement from '@/pages/VehicleCenter/VehicleManagement'
import detail from '@/pages/VehicleCenter/detail'
import AddVehicle from '@/pages/VehicleCenter/AddVehicle'
import BindEquipment from '@/pages/VehicleCenter/bindEquipment2'
import CarInstallDetail from '@/pages/VehicleCenter/installDetail'
/* 风控中心 */
import RiskManamentCenterIndex from '@/pages/RiskManamentCenter/index'
import RiskManagementOverview from '@/pages/RiskManamentCenter/RiskManagementOverview'
import AlarmList from '@/pages/RiskManamentCenter/AlarmList'
import StrategyManagement from '@/pages/RiskManamentCenter/StrategyManagement'
import StrategyBindPosition from '@/pages/RiskManamentCenter/StrategyBindPosition'
import PositionManagement from '@/pages/RiskManamentCenter/PositionManagement'
/* 产品中心 */

/* 工单管理 */
import AddNewJob from '@/pages/ProductCenter/JobManagement/AddNewJob2'
import InstallDetail from '@/pages/ProductCenter/JobManagement/InstallDetail'
import JobList from '@/pages/ProductCenter/JobManagement/JobList'
import JobOrderDetail from '@/pages/ProductCenter/JobOrderDetail'
import test from '@/pages/ProductCenter/JobManagement/test'
/* 采购 */
import ProductPurchase from '@/pages/ProductCenter/ProductPurchase/ProductPurchase'
import PurchaseDetail from '@/pages/ProductCenter/ProductPurchase/PurchaseDetail'
import PurchaseOrder from '@/pages/ProductCenter/ProductPurchase/PurchaseOrder'
/* 年期卡管理 */
import PeriodCardManagement from '@/pages/ProductCenter/PeriodCardManagement/PeriodCardManagement'
import PeriodCardRenew from '@/pages/ProductCenter/PeriodCardManagement/PeriodCardRenew'
import ProductCenterIndex from '@/pages/ProductCenter/index'

import EquipmentManagement from '@/pages/ProductCenter/EquipmentManagement'
import Products from '@/pages/ProductCenter/Products'
import ProductOperationLog from '@/pages/ProductCenter/ProductOperationLog'

/* 配置中心 */
import ConfigCenterIndex from '@/pages/ConfigCenter/index'
import LoginAccount from '@/pages/ConfigCenter/LoginAccountManagement'
import TrailerAccount from '@/pages/ConfigCenter/TrailerAccountManagement'
import storeAccount from '@/pages/ConfigCenter/StoreAccountManagement'
import newstore from '@/pages/ConfigCenter/new'
/* 信息管理 */
import informationList from '@/pages/ConfigCenter/informationList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/vehiclecenter/vehiclemanagement',
      name: 'Index',
      component: Index,
      children: [
        {
          path: 'vehiclecenter',
          redirect: '/vehiclecenter/vehiclemanagement',
          component: VehicleCenterIndex,
          children: [
            { path: 'vehiclemanagement', component: VehicleManagement }
          ]
        },
        {
          path: 'riskmanagementcenter',
          component: RiskManamentCenterIndex,
          children: [
            { path: 'riskmanagementoverview', component: RiskManagementOverview },
            { path: 'alarmlist', component: AlarmList },
            { path: 'strategymanagement', component: StrategyManagement },
            { path: 'positionmanagement', component: PositionManagement }
          ]
        },
        {
          path: 'riskmanagementcenter/strategybindposition',
          name: 'StrategyBindPosition',
          component: StrategyBindPosition
        },
        {
          path: 'vehiclecenter/detail',
          name: 'vehicleDetail',
          component: detail
        },
        { path: 'vehiclecenter/addvehicle', component: AddVehicle },
        { path: 'vehiclecenter/bindequipment', name: 'bindquipment', component: BindEquipment },
        { path: 'vehiclecenter/installdetail/:tableId', name: 'installdetail', component: CarInstallDetail },
        {
          path: 'productcenter',
          redirect: '/productcenter/equipment',
          component: ProductCenterIndex,
          children: [
            { path: 'equipment', component: EquipmentManagement },
            { path: 'products', component: Products },
            { path: 'operationlog', component: ProductOperationLog },
            // 工单管理
            { path: 'addnewjob', component: AddNewJob },
            { path: 'installdetail', component: InstallDetail },
            { path: 'joblist', component: JobList },
            { path: 'test', component: test },
            // 采购
            { path: 'productpurchase', component: ProductPurchase },
            { path: 'purchasedetail', component: PurchaseDetail },
            { path: 'purchaseorder', component: PurchaseOrder },
            // 年期卡管理
            { path: 'periodcardmanagement', component: PeriodCardManagement },
            { path: 'periodcardrenew', component: PeriodCardRenew }
          ]
        },
        {
          path: 'productcenter/orderdetail/:orderid',
          component: JobOrderDetail
        },
        {
          path: 'configcenter',
          redirect: '/configcenter/newstore',
          component: ConfigCenterIndex,
          children: [
            { path: 'loginaccount', component: LoginAccount },
            { path: 'traileraccount', component: TrailerAccount },
            { path: 'storeAccount', component: storeAccount },
            { path: 'newstore', component: newstore },
            { path: 'informationList', component: informationList }
          ]
        }
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
