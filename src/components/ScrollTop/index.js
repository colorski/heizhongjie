import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Icon from '../Icon'

class ScrollTop extends PureComponent {
  render () {
    const { scrollShow } = this.props;
    return (
      <div className="go_top">
        <Link to="/AddAgency"><p title="添加中介"><Icon type="jiahao" /></p></Link>
        { scrollShow ? <p id="goTop" title="返回顶部" onClick={this.handleScrollTop}><Icon type="pullup" /></p> : null }
      </div>
    )
  }

  handleScrollTop () {
    window.scrollTo(0,0);
  }

  componentDidMount () {
    this.bindEvents();
  }

  bindEvents () {
    //待优化：每次滚动多次触发dispatch
    window.addEventListener('scroll', this.props.changeScrollTopShow)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.props.changeScrollTopShow)
  }

}

const mapStateToProps = (state) => ({
  scrollShow: state.getIn(['global','scrollShow'])
})

const mapDispatchToProps = (dispatch) => ({
  changeScrollTopShow () {
    if(document.documentElement.scrollTop > 300) {
      fnDispatch(dispatch, true)
    }else {
      fnDispatch(dispatch, false)
    }
  }
})

const fnDispatch = (dispatch, flag) => {
  const action = {
    type: 'SCROLL_TOP_SHOW',
    scrollShow: flag
  }
  dispatch(action)
}

export default connect(mapStateToProps, mapDispatchToProps)(ScrollTop);