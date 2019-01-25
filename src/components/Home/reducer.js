import { fromJS } from 'immutable';

const defaultState = fromJS({
  topicList: [],
  searchKeyWord: ''
});

export default (state = defaultState, action) => {
  switch(action.type){
    case 'GET_HOME_DATA':
      return state.set('topicList', fromJS(action.topicList));
    case 'SEARCH_KEY_WORD':
      return state.set('searchKeyWord', fromJS(action.searchKeyWord));
      //如果有多个可以这样写：
      // state.merge({
      //   'topicList': fromJS(action.topicList),
      //   'articleList': fromJS(action.articleList)
      // })
    default:
      return state;
  }
}
