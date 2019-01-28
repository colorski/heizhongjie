import { fromJS } from 'immutable'
const defaultState = fromJS({
  votedId: '',
  voted: false
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'vote/VOTED_ID':
      return state.set('votedId', fromJS(action.votedId));
    case 'vote/VOTED_STATUS':
      return state.set('voted', fromJS(action.voted));
      // case 'LOGIN_DATA':
      //   return state.set('email', fromJS(action.email)).set('password', fromJS(action.password));
    default:
      return state;
  }
}