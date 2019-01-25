import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class City extends PureComponent {

  render(){
    const { cities, currentCity } = this.props;
    return (
      <span>
        {
          cities.map((item) => {
            return (
              <a 
                key={item.get('id')} 
                className={currentCity===item.get('id')?'current':''} 
                onClick={()=>{this.handleClickCity(item.get('id'), item.get('name'))}}
              >
                {item.get('name')}
              </a>
            )
          })
        }
      </span>
    )
  }

  handleClickCity (id,name) {
    const action = {
      type: 'CHANGE_CURRENT_CITY',
      currentCity: id,
      currentCityName: name,
      minCityShow: false
    }
    this.props.handleClickCity(action)
  }
}

const mapStateToProps = (state) => ({
  cities: state.getIn(['city', 'cities']),
  currentCity: state.getIn(['city', 'currentCity']),
  currentCityName: state.getIn(['city', 'currentCityName'])
});


const mapDispatch = (dispatch) => ({
  handleClickCity(action) {
    dispatch(action)
  }
});

export default connect(mapStateToProps, mapDispatch)(City);