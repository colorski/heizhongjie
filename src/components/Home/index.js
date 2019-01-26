import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
//import axios from 'axios'
import topicList from '../../data/homeList'
import Icon from '../Icon'
import List from './List'

class Home extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      searchVal: ''
    }

    this.searchIptHandleChange = this.searchIptHandleChange.bind(this);
    this.searchBtnHandleClick = this.searchBtnHandleClick.bind(this);
  }

  render (){
    return (
      <React.Fragment>
        <div className="rt_entrance cf">
          <div className="search fl cf">
            <input type="text" className="ipt_search" placeholder="中介名关键字" value={this.state.searchVal} onChange={this.searchIptHandleChange} />
            <Icon type="search" className="btn_search" onClick={this.searchBtnHandleClick} />
          </div>
          <div className="rt_entr">
            <Link to="/roast">吐槽</Link>
            <Link to="/vote">投票</Link>
          </div>
        </div>

        <List />
        
      </React.Fragment>
    )
  }

  componentDidMount () {
    const action = {
      type: 'GET_HOME_DATA',
      topicList: topicList
    }
    this.props.getHomeData(action);
    // axios.get('/api/home-list.json').then((res) => {
    //   const result = res.data.data;
    //   const action = {
    //     type: 'GET_HOME_DATA',
    //     topicList: result.topicList
    //   }
    //   this.props.getHomeData(action);
    // })
  }

  searchIptHandleChange (e) {
    const _v = e.target.value;
    this.setState(()=>({searchVal: _v}));
  }

  searchBtnHandleClick () {
    const action = {
      type: 'SEARCH_KEY_WORD',
      searchKeyWord: this.state.searchVal
    }
    this.props.handleSearchKeyWord(action);
  }

}

// const mapStateToProps = (state) => {
//   return {
//     topicList: state.home.get('topicList')
//   }
// }

const mapDispatchToProps = (dispatch) => ({
  getHomeData(action) {
    dispatch(action)
  },
  handleSearchKeyWord(action) {
    dispatch(action)
  },
})

export default connect(null, mapDispatchToProps)(Home)