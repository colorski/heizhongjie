import { fromJS } from 'immutable'
const defaultState = fromJS({
  cities: [],
  currentCity: 1,
  currentCityName: '北京',
  minCityShow: false
});

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'GET_CITIES_DATA':
      return state.set('cities', fromJS(action.cities));
    case 'CHANGE_CURRENT_CITY':
      return state.merge({
        'currentCity': fromJS(action.currentCity),
        'currentCityName': fromJS(action.currentCityName),
        'minCityShow': fromJS(action.minCityShow)
      })
    case 'CHANGE_MIN_CITY':
      return state.set('minCityShow', fromJS(action.minCityShow));
    default:
      return state;
  }
}