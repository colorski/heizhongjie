//现在只是模拟的数据 - 实际需要登录后接口传入数据
import { fromJS } from 'immutable'
const defaultState = fromJS({
  nickName: '',
  logined: false,
  loginShow: false,
  regShow: false,
  // email:'',
  // password: ''
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN_SHOW':
      return state.set('loginShow', fromJS(action.loginShow)).set('regShow', fromJS(action.regShow));
    case 'REG_SHOW':
      return state.set('regShow', fromJS(action.regShow)).set('loginShow', fromJS(action.loginShow));
    case 'CHANGE_LOGINED':
      return state.set('logined', fromJS(action.logined));
    case 'REGISTER_NICKNAME':
      return state.set('nickName', fromJS(action.nickName));
    // case 'LOGIN_DATA':
    //   return state.set('email', fromJS(action.email)).set('password', fromJS(action.password));
    default:
      return state;
  }
}