export const validatePhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error('电话号码不能为空'))
  } else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
    callback(new Error('请输入正确的电话号码'))
  } else {
    callback()
  }
}

export default {
  validatePhone
}
