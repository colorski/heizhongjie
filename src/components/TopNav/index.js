import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Icon from '../Icon'
import City from './City'

class TopNav extends PureComponent {
  render (){
    const { currentCityName, minCityShow } = this.props;
    return (
      <div className="rt_top">
        <h1><Link to={'/'}>{`${currentCityName}黑中介举报网`}</Link></h1>
        <p className="city"><em>所在城市：</em>
          <City />
        </p>
        <Icon type="iconlocation48" className="min_city" eeid="TopNav_城市导航图标" onClick={this.handleCityBtnClick.bind(this)} />
        {
          minCityShow ? 
          <div className="min_city_items">
            <City />
          </div> : ''
        }
      </div>
    )
  }

  componentDidMount () {
    axios.get('/api/cities.json').then((res) => {
      const result = res.data.data;
      const action = {
        type: 'GET_CITIES_DATA',
        cities: result
      }
      this.props.getCities(action);
    })
  }

  handleCityBtnClick () {
    const action = {
      type: 'CHANGE_MIN_CITY',
      minCityShow: !this.props.minCityShow
    }
    this.props.changeMinCity(action);
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCities(action) {
    dispatch(action)
  },
  changeMinCity(action) {
    dispatch(action)
  }
});

const mapStateToProps = (state) => ({
  currentCityName: state.getIn(['city', 'currentCityName']),
  minCityShow: state.getIn(['city', 'minCityShow']),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);