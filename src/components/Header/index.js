import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Icon from '../Icon'

class Header extends PureComponent {
  constructor (props) {
    super(props)

    this.handleLoginBtnClick = this.handleLoginBtnClick.bind(this);
    this.handleDesclaimerBtnClick = this.handleDesclaimerBtnClick.bind(this);
  }
  
  render (){
    const { logined, nickName } = this.props;
    const sessionNickName = sessionStorage.getItem('nickName');

    return (
      <div className="lt" id="lt">
        <div className="lt_mid">
          {
            logined ? 
            <Link to={'/UserCenter'} className="ubtn">{nickName&&sessionNickName?nickName:sessionStorage.getItem('email').split('@')[0]}</Link> : 
            <a className="ubtn" onClick={this.handleLoginBtnClick}>登录</a>
          }
          <Link to={'/'} className="logo" title="首页"><Icon type="heimingdan" /></Link>
          <h2>反黑联盟</h2>
          <p>1.非官方</p>
          <p>2.吐槽、鉴戒</p>
          <p>3.文明吐槽理性投票</p>
          <p>4.注意保护个人隐私</p>
        </div>
        <div className="lt_bot">
          <p>www.heizhongjie.vip</p>
          <a className="decl" onClick={this.handleDesclaimerBtnClick}>免责声明</a>
        </div>
      </div>
    )
  }

  handleLoginBtnClick () {
    const action = {
      type: 'LOGIN_SHOW',
      loginShow: true,
      regShow: false
    }
    this.props.loginBoxShow(action);
  }

  handleDesclaimerBtnClick () {
    const action={
      type: 'DESCLAIMER_SHOW',
      desclaimerShow: true,
    }
    this.props.desclaimerShow(action);
  }

  componentDidMount () {
    const email = sessionStorage.getItem('email')
    const nickName = sessionStorage.getItem('nickName')
    if(email) this.props.changeLogined({type:'CHANGE_LOGINED', logined: true});
    if(nickName) this.props.changeLogined({type:'REGISTER_NICKNAME', nickName: nickName});

  }

}

const mapStateToProps = (state) => {
  return {
    logined: state.getIn(['user','logined']),
    nickName: state.getIn(['user','nickName'])
    //以上等价于：logined: state.get('user').get('logined')
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginBoxShow(action) {
    dispatch(action)
  },
  changeLogined(action){
    dispatch(action)
  },
  desclaimerShow(action){
    dispatch(action)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header)