import { fromJS } from 'immutable';

const defaultState = fromJS({
  data: {},
  comments: [],
  commentTextArea: '',
  praised: false,
  praiseAccount: 0,
  reportTypeId: '',
  chosedReportId: '',
});

export default (state = defaultState, action) => {
  switch(action.type){
    case 'GET_DETAIL_DATA':
      return state.set('data', fromJS(action.data))
    case 'GET_COMMENTS_DATA':
      return state.set('comments', fromJS(action.comments))
    case 'GET_PRAISE_ACCOUNT':
      return state.set('praiseAccount', fromJS(action.praiseAccount))
    case 'SUBMIT_COMMENT_AREA':
      return state.set('commentTextArea', fromJS(action.commentTextArea))
    case 'CHANGE_PRAISED':
      return state.set('praised', fromJS(action.praised))
    case 'CHANGE_PRAISE_ACCOUNT':
      return state.set('praiseAccount', fromJS(action.praiseAccount))
    case 'report/REPORT_TYPE_ID':
      return state.set('reportTypeId', fromJS(action.reportTypeId))
    case 'report/CHOSED_REPORT_ID':
      return state.set('chosedReportId', fromJS(action.chosedReportId))
      //如果有多个可以这样写：
      // state.merge({
      //   'topicList': fromJS(action.topicList),
      //   'articleList': fromJS(action.articleList)
      // })
    default:
      return state;
  }
}
