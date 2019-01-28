import { combineReducers } from 'redux-immutable' //注意：这里用的是redux-immutable，目的是统一数据格式都为immutable对象

import global from './globalReducer'
import user from '../components/User/reducer'
import home from '../components/Home/reducer'
import city from '../components/TopNav/reducer'
import detail from '../components/Detail/reducer'
import vote from '../components/Vote/reducer'

export default combineReducers({
  global,
  user,
  home,
  city,
  detail,
  vote
});


