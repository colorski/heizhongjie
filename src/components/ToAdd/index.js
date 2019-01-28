import React, { Component } from 'react'
import { connect } from 'react-redux'
import Icon from '../Icon'
import Toast from '../Toast'
import Modal from '../Modal'

class ToAdd extends Component {
  constructor(props){
    super(props)
    this.state = {
      agencyValue: ''
    }
    this.handleSubmitAgency = this.handleSubmitAgency.bind(this)
  }

  render () {
    return (
      <div className="add-agency">
        <div className="add-agency-title">
          <h2>添加中介</h2>
          <ol className="add-agency-tips">
            <li><Icon type="tishi2" /> 请尽量填写中介机构全称；有别称或简称的以 “别称-主体公司全称” 的形式。如：爱屋吉屋 - 爱吉（北京）房地产经纪有限公司</li>
            <li><Icon type="tishi2" /> 我们会对添加的中介名进行审核，只有审核通过才可以进行投票</li>
          </ol>
        </div>
        <div className="add-agency-input">
          <input type="text" placeholder="中介名全称" onChange={(e)=>this.setState({agencyValue: e.target.value})} />
          <Icon type="jiahao" className="btn-add" onClick={this.handleSubmitAgency} />
        </div>
      </div>
    )
  }

  handleSubmitAgency(){
    const { logined } = this.props;
    const { agencyValue } = this.state;
    const { alert } = Modal;

    const _content = <div>你添加的中介名为：<br /><strong style={{color:'#ce1126'}}>{agencyValue}</strong><br />审核通过后会在投票列表显示！</div>

    if(!logined){
      Toast.warning('请先登录！')
      return
    }
    if(agencyValue.replace(/^\s+$/g, '')===''){
      Toast.warning('中介名不能为空！')
      return
    }

    alert({
      content: _content
    });
  }
}

const mapStateToProps = (state) => {
  return {
    logined: state.getIn(['user', 'logined']),
  }
}

export default connect(mapStateToProps, null)(ToAdd);