import headOperation from './headOperation' // 头部带操作组件 例：
// left='左侧标题' right=[{label: '报错', func: this.reportErrors, icon: 'write', iconScale: '', className: 'btn'}] slot= left-content right-content
import CommonTitle from './title' // 头部标题 例： title='头部标题'
import boxContainer from './boxContainer' // 内容容器 例：data="[{label: '车架号', value: res, width: 6}, {label: '车架号', value: res}]" isLoading="false"
import myForm from './form' // 模态框组件
import formContainer from './formContainer' // 表单
import MyTable from './MyTable'
import btnGroup from './btnGroup' // 按钮选择区块 例::data="[{value: 0,label:'独立'},{value: 1,label:'组合'}]" :model.sync="temp" temp为双向绑定的值 若为复选传入数组
import tableComponent from '@/components/common/MyTable/MyTable'
const components = [
  headOperation,
  CommonTitle,
  boxContainer,
  myForm,
  formContainer,
  MyTable,
  btnGroup,
  tableComponent
]
const Loading = function (Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component)
  })
}
export default Loading
