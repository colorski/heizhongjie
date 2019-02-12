import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Toast from '../Toast'
import Modal from '../Modal'
import agencies from '../../data/agencies'
import Icon from '../Icon';

const compareFn = (property) => (a,b)=> b[property]-a[property] //根据属性desc排序的方法
const arr = [...agencies] //深拷贝一份，不改变原数组对象
const _desc_voted_agencies = arr.sort(compareFn('voted'))//得到新排序好的数组对象

const len = _desc_voted_agencies.length

class Vote extends Component {
  render () {
    const { confirm } = Modal;
    return (
      <div className="vote">
        <div className="vote-title" style={{paddingTop:'15px'}}>
          <ol className="vote-tips">
            <li>1.投票数越多说明越“黑”。</li>
            <li>2.一个注册用户一天只能投票一次；为保证数据更接近现实，请理性投票。</li>
            <li>3.该投票是注册用户对此城市下某中介的整体印象，因不同区域不同门店运营情况不同，服务态度也可能不同，请理性看待。</li>
            <li>4.该投票不针对任何某一特定中介机构。</li>
          </ol>
        </div>
        <div className="vote-agency">
          {/* line-height: (x*28-28)/4}px  */}
          <div className="tit" style={{lineHeight: `${(len*28-28)/4}px`}}>越投越黑</div>
          <ol>
            {
              _desc_voted_agencies.map((d)=>
                <li key={d.id+''}>
                  <p style={{background:`rgb(${255-d.voted},${255-d.voted},${255-d.voted})`}} onClick={()=>
                    confirm({
                      content: <div><p>确定要投<b style={{color:"#CE1126"}}>{d.name}</b>？</p><p style={{marginTop:'10px',fontSize:'12px', color:'#999'}}>（同一用户一天只能投票一次！）</p></div>,
                      onOk: ()=>{
                        const { logined, voted } = this.props;

                        if(!logined){
                          Toast.warning('请先登录！')
                          return
                        }

                        if(voted){
                          Toast.warning('你今天已经投过票！')
                          return
                        }

                        const action = {
                          type: 'vote/VOTED_ID',
                          votedId: d.id+'',
                        }
                        this.props.handleVotedId(action)

                        const action1 = {
                          type: 'vote/VOTED_STATUS',
                          voted: true,
                        }
                        this.props.sessionVotedStatus(action1)
                        sessionStorage.setItem('voted', true)

                        Toast.success('投票成功！')
                      }
                    })}
                  >{d.name}</p>
                  <span>（<b>{d.voted}</b>）</span>
                </li>
              )
            }
          </ol>
        </div>
        <div className="vote-to-add">
          没有所投中介？<Link to="/add">添加一个<Icon type="pullright" /></Link>
        </div>
      </div>
    )
  }

  componentDidMount(){
    this.onGetAgenciesData()
    this.handleSessionVotedStatus()
  }
  onGetAgenciesData(){
    const action = {
      type: 'vote/GET_AGENCIES_DATA',
      agencies: _desc_voted_agencies
    }
    this.props.getAgenciesData(action)
  }
  handleSessionVotedStatus(){
    const action = {
      type: 'vote/VOTED_STATUS',
      voted: sessionStorage.getItem('voted')?true:false,
    }
    this.props.sessionVotedStatus(action)
  }

}

const mapStateToProps = (state) => {
  return {
    logined: state.getIn(['user', 'logined']),
    voted: state.getIn(['vote', 'voted']),
  }
}
const mapDispatchToProps = (dispatch) => ({
  getAgenciesData(action) { dispatch(action) },
  handleVotedId(action) { dispatch(action) },
  sessionVotedStatus(action) { dispatch(action) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Vote);