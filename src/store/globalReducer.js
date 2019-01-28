import { fromJS } from 'immutable'
const defaultState = fromJS({
  toastShow: false,
  scrollShow: false,
  desclaimerShow: false,
  agencies: []
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'toast/TOAST_SHOW':
      return state.set('toastShow', fromJS(action.toastShow));
    case 'SCROLL_TOP_SHOW':
      return state.set('scrollShow', fromJS(action.scrollShow));
    case 'DESCLAIMER_SHOW':
      return state.set('desclaimerShow', fromJS(action.desclaimerShow));
    case 'vote/GET_AGENCIES_DATA':
      return state.set('agencies', fromJS(action.agencies));
    default:
      return state;
  }
}