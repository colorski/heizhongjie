export function fillReduxForm({field, value}, state){
  let newData = {}
  if(_.isObject(field)){
    newData = field
  }else{
    newData[field] = value
  }
  return _.extend({}, state, newData)
}

/**
 * 校验一个对象中的各字段
 * @param  {Object} data  被校验的数据
 * @param  {Array} rules 规则，其数组可以包含数组，将被展开
 *          规则说明：
 *            field* 对象中的字段
 *            title* 字段名称
 *            canSkip 非必填（仅在有值时校验规则）
 *            emptyMsg 校验为空时的提示信息
 *            msg 错误提示
 *            getMsg(value) 获取错误提示的函数，value: 此规则对应域的值
 *
 *            以下校验方式可以使用任意个，若有多个将按照如下顺序校验，遇到第一个不通过的则终止校验返回false：
 *            regExp 用正则表达式校验
 *            validator 用函数校验，传入的参数为被校验的值
 *            maxLength 字符最长限制
 *            minLength 字符最短限制
 * @return {boolean}       校验成功：true | 校验失败：false
 */
export function validateForm(data, rules){
  rules = _.chain(rules).compact().flatten().value()
  return _.every(rules, rule => validateSingle(data[rule.field], rule))
}

/**
 * 校验一个值
 * @param  {any} value 被校验的值
 * @param  {Object} rule  规则
 * @return {boolean}      校验成功：true | 校验失败：false
 */
export function validateSingle(value, rule){
  if(!rule.canSkip && (isEmpty(value) || (_.isArray(value) && !value.length))){
    XK_MESSAGER.warn(rule.emptyMsg || '请填写' + (rule.title || rule.field))
    return false
  }
  if(
    value &&
    (_.isRegExp(rule.regExp) && !rule.regExp.test(value)) ||
    (rule.validator && !rule.validator(value))
  ){
    const msg = rule.msg ||
      (rule.getMsg && rule.getMsg(value)) ||
      ((rule.title || rule.field) + '不正确')
    XK_MESSAGER.warn(msg)
    return false
  }
  if(value && rule.maxLength && value.length>rule.maxLength){
    const msg = rule.msg || `${rule.title || rule.field}不得超过${rule.maxLength}个字`
    XK_MESSAGER.warn(msg)
    return false
  }
  if(value && rule.minLength && value.length>rule.minLength){
    const msg = rule.msg || `${rule.title || rule.field}不得少于${rule.minLength}个字`
    XK_MESSAGER.warn(msg)
    return false
  }
  return true
}

function isEmpty(value){
  return !value && value !== 0 && value !== false
}
