import fetch from '../utils/fetch'
const loginRequest = params => fetch('site/login', params, 'post')
const fetchUserInfo = params => fetch('user/detail', params, 'get')
const changeInfo = params => fetch('user/edit', params, 'put')
const changePassword = params => fetch('user/change-password', params, 'put')
const lee = params => fetch('ezreals/test', params, 'post')
const fetchRegion = params => fetch('region', params, 'get')
/* 设备列表相关 */
const fetchDeviceList = params => fetch('driver/list', params, 'get')
const fetchDeviceDetail = (id, params) => fetch(`driver/detail/${id}`, params, 'get') // 设备详细接口
const fetchDeviceParams = params => fetch('devices/setting-params', params, 'get')
const fetchStoreList = params => fetch('store/store-tree', params, 'get')
const purchaseOrderListRequest = params => fetch('', params, '')
const devicetransfer = params => fetch('devices/device-transfer', params, 'post')
/* 登陆账号相关 */
const loginAccountOptionsRequest = params => fetch('customers/create-index', params, 'post') // 登陆账号选项的接口
const loginAccountExport = params => fetch('tests/test', params, 'get')
const addAccountRequest = params => fetch('user/add', params, 'post') // 新增门店用户
const loginAccountListRequest = params => fetch('user/list', params, 'get') // 登陆用户列表接口
const loginAccountDetailRequest = params => fetch('customers/view', params, 'get') // 登陆用户的详情
const updateAccountDetailRequest = params => fetch('user/edit', params, 'put') // 编辑账号信息
const resetPasswordRequest = (id, params) => fetch(`user/reset-pass/${id}`, params, 'put') // 重置密码
const deleteAccountRequest = (id, params) => fetch(`user/delete/${id}`, params, 'delete') // 删除用户
/* 门店相关 */
const getStoreTreeList = params => fetch('store/store-tree', params, 'get') // 获取门店列表信息
const getStoreList = (id, params) => fetch(`store/detail/${id}`, params, 'get') // 根据id查询门店信息详情
const addStoreList = params => fetch('store/add', params, 'post')// 新增门店
const deleteStoreList = (id, params) => fetch(`store/delete/${id}`, params, 'delete') // 门店删除
const updateStoreList = (id, params) => fetch(`store/edit/${id}`, params, 'put')// 编辑门店
const getUserStoreList = (params) => fetch(`store-user/list`, params, 'get')// 获取这个用户所有门店
/* 工单列表相关 */
const addJobOrderList = params => fetch('order-list/add', params, 'post')
const fetchJobOrderList = params => fetch('order/index', params, 'get')
const fetchOrderBaseInfo = (orderId, params) => fetch(`order/detail/${orderId}`, params, 'get')
const addOrderWithBaseInfo = params => fetch('order/add', params, 'post')
const addScheme = params => fetch('car-install/add', params, 'post')
const fetchProductList = params => fetch('product', params, 'get')
const fetchProgressById = params => fetch(`order-progress`, params, 'get')
const fetchCarInstallById = params => fetch(`car-install`, params, 'get')
const fetchDeviceByInstallId = params => fetch('driver-install', params, 'get')
const deleteCarInstall = (id, params) => fetch(`car-install/delete/${id}`, params, 'delete')
const deleteDeviceInstall = (id, params) => fetch(`driver-install/delete/${id}`, params, 'delete')
const editOrderBaseInfo = (id, params) => fetch(`order/edit/${id}`, params, 'put')
const orderAddGoods = params => fetch('driver-install/add', params, 'post')
const confirmOrder = (orderId, params) => fetch(`order/final-check/${orderId}`, params, 'put')
/* 信息模块 */
const informationListRequest = params => fetch('messages/index', params, 'get') // 消息列表接口
const informationDetailRequest = params => fetch('messages/lists', params, 'get') // 消息详情接口
const informationTagRequest = params => fetch('messages/sign', params, 'POST') // 消息标记接口
const informationNoticeRequest = params => fetch('messages/get-notice', params, 'get') // 消息通知接口
const pushMessageRequest = params => fetch('messages/push-message', params, 'POST') // 消息推送
const clearMessageRequest = params => fetch('messages/clear-message', params, 'get') // 消息推送
/* 车辆相关 */
const vehicleListRequest = params => fetch('car/list', params, 'get') // 车辆列表
const getCarInfoRequest = params => fetch('car/car-vin', params, 'get') // 通过车架号获取车辆的信息
const getOwnerInfoRequest = (id, params) => fetch(`car-owner/detail/${id}`, params, 'get') // 车辆的车主信息
const getBusinessInfoRequest = (params) => fetch('car-kind/lists-name', params, 'get') // 车辆的业务信息
const searchCarLists = (id, params) => fetch(`car/detail/${id}`, params, 'get') // 详情车辆信息
const searchCarOwnerLists = (id, params) => fetch(`car-owner/detail/${id}`, params, 'get') // 详情车主信息
const searchCarDeviceLists = params => fetch('car-kind/list', params, 'get') // 业务详情信息
const searchCarInfoLists = (params) => fetch(`driver/driver-car`, params, 'get') // 查询该车辆绑定设备信息
const bindCarDevice = (params) => fetch(`driver/bind-driver`, params, 'get') // 绑定设备
const searchDevicde = (params) => fetch('driver/search', params, 'get') // 查询所有设备信息
const searchCarInstall = (params) => fetch('car-kind/index', params, 'get') // 车辆安装信息查询
const addCarInfoRequest = params => fetch('car/create', params, 'post') // 添加车的信息
const addOwnerInfoRequest = params => fetch('car-owner/create', params, 'post') // 添加车主信息
const addBusiness = params => fetch('car-loan/create', params, 'post') // 新增业务
const deleteBusiness = (id, params) => fetch(`car-loan/delete/${id}`, params, 'delete') // 删除车辆业务
const deleteBusiness2 = (id, params) => fetch(`car-kind/delete/${id}`, params, 'delete') // 删除车辆业务
const upBusiness = (id, params) => fetch(`car-loan/edit/${id}`, params, 'put') // 编辑业务
const upLoadPictureRequest = params => fetch('cars/file-url', params, 'post') // 上传图片到服务器
const searchDeviceRequest = params => fetch('driver/search', params, 'get') // 设备模糊查询
const bindNewInstallRequest = params => fetch('car-install/create-data', params, 'post') // 绑定设备
const cancelBindDevice = (id, type, params) => fetch(`driver/relieve/${id}/${type}`, params, 'get') // 解除设备+设置状态
const carInfoRequest = params => fetch('cars/car-store', params, 'get') // 解除设备
const standardListRequest = params => fetch('car-install/standard-list', params, 'get') // 表单规则获取
const vehicleInstallRecordRequest = params => fetch('car-install/car-install', params, 'get') // 车辆安装信息
const deviceInstallRecordRequest = params => fetch('driver-install/driver-install', params, 'get') // 设备安装信息
const editInstallRecordRequest = params => fetch('car-install/edit-data', params, 'post') // 设备安装信息
const carInstallDetail = (id, params) => fetch(`car-install/detail/${id}`, params, 'get') // 车辆安装信息详情
const driverInstallDetail = (id, params) => fetch(`driver-install/detail/${id}`, params, 'get') // 车辆安装设备详情
const upLoadPictureUrl = 'upload/file-url'
/* 标签相关 */
const addTag = params => fetch('tags/tag-add', params, 'post') // 新增标签
const showTag = params => fetch('tags/show-all', params, 'get') // 标签展示
/* 风控相关 */
const riskStrategy = params => fetch('rule/index', params, 'get') // 风控策略列表
const addRiskRule = params => fetch('rule/add', params, 'post') // 风控策略列表新增
const mapLocation = params => fetch('map-location', params, 'get') // 地图列表
const addMapLocation = params => fetch('map-location/add', params, 'post') // 地图新增
const editMapLocation = (id, params) => fetch(`map-location/edit/${id}`, params, 'put') // 地图修改
const deleteMapLocation = (id, params) => fetch(`map-location/delete/${id}`, params, 'delete') // 地图删除
const editRiskRule = (id, params) => fetch(`rule/edit/${id}`, params, 'put') // 风控策略列表修改
/* 风控报警 */
const getWarnMessage = (params) => fetch(`warning-message/index`, params, 'get') // 风控报警列表
const getMessageDate = (params) => fetch(`warning-message/message-date`, params, 'get') // 风控报警日期列表
/* 数据词典 */
const dataDict = params => fetch('data-dict/group-lists', params, 'get')// 数据词典
export {
  loginRequest,
  lee,
  fetchDeviceList,
  purchaseOrderListRequest,
  loginAccountOptionsRequest,
  loginAccountExport,
  addAccountRequest,
  loginAccountListRequest,
  loginAccountDetailRequest,
  updateAccountDetailRequest,
  resetPasswordRequest,
  fetchDeviceDetail,
  fetchDeviceParams,
  fetchStoreList,
  getStoreTreeList,
  getStoreList,
  updateStoreList,
  deleteStoreList,
  addStoreList,
  deleteAccountRequest,
  addJobOrderList,
  fetchJobOrderList,
  informationListRequest,
  informationDetailRequest,
  informationTagRequest,
  informationNoticeRequest,
  pushMessageRequest,
  clearMessageRequest,
  devicetransfer,
  searchCarLists,
  searchCarOwnerLists,
  searchCarDeviceLists,
  searchCarInfoLists,
  bindCarDevice,
  searchDevicde,
  searchCarInstall,
  vehicleListRequest,
  getCarInfoRequest,
  addCarInfoRequest,
  addBusiness,
  deleteBusiness,
  deleteBusiness2,
  upBusiness,
  addTag,
  showTag,
  upLoadPictureRequest,
  searchDeviceRequest,
  bindNewInstallRequest,
  upLoadPictureUrl,
  cancelBindDevice,
  carInfoRequest,
  fetchOrderBaseInfo,
  addOrderWithBaseInfo,
  addScheme,
  fetchProductList,
  fetchProgressById,
  fetchCarInstallById,
  fetchDeviceByInstallId,
  deleteCarInstall,
  deleteDeviceInstall,
  editOrderBaseInfo,
  orderAddGoods,
  confirmOrder,
  getOwnerInfoRequest,
  addOwnerInfoRequest,
  fetchUserInfo,
  changeInfo,
  changePassword,
  getBusinessInfoRequest,
  standardListRequest,
  fetchRegion,
  dataDict,
  vehicleInstallRecordRequest,
  deviceInstallRecordRequest,
  editInstallRecordRequest,
  carInstallDetail,
  driverInstallDetail,
  riskStrategy,
  addRiskRule,
  editRiskRule,
  getUserStoreList,
  mapLocation,
  addMapLocation,
  deleteMapLocation,
  getWarnMessage,
  getMessageDate,
  editMapLocation
}
