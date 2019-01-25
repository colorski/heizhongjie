import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Icon from '../Icon'
import { regEmail, regPwd } from '../../utils/regExp'

class Login  extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      tips: ''
    }

    this.handleCloseBtnClick = this.handleCloseBtnClick.bind(this);
    this.handleBtnToRegClick = this.handleBtnToRegClick.bind(this);
    this.handleEmailInputChange = this.handleEmailInputChange.bind(this);
    this.handlePwdInputChange = this.handlePwdInputChange.bind(this);
    this.handleLoginBtnClick = this.handleLoginBtnClick.bind(this);
  }

  render () {
    const { loginShow } = this.props;
    const { tips } = this.state;

    return (
      <div className={ loginShow ? "cmn_bg" : "cmn_hide"}>
        <div className={ loginShow ? "login_cmn" : ""} onKeyUp={e=> e.keyCode===13 && this.handleLoginBtnClick()}>
          <h5>登录反黑联盟</h5>
          <p className="sub">揪出黑，还世界以清白</p>
          <p className="tips">{tips&&tips}</p>
          <input type="text" name="logAccount" placeholder="邮箱帐号" onChange={this.handleEmailInputChange}  />
          <input type="password" name="logPassword" placeholder="密码" autoComplete="false" onChange={this.handlePwdInputChange} />
          <input type="button" value="登 录" onClick={this.handleLoginBtnClick} />
          <p className="login_bot cf">
            <Link to="/getPassWord" onClick={this.handleCloseBtnClick}>忘记密码？</Link>
            <span onClick={this.handleBtnToRegClick}>注册</span>
          </p>
          <Icon type="guanbi" onClick={this.handleCloseBtnClick} />
        </div>
      </div>
    )
  }

  handleEmailInputChange (e) {
    this.setState({email: e.target.value})
  }
  handlePwdInputChange (e) {
    this.setState({password: e.target.value})
  }
  handleLoginBtnClick () {
    let {email, password} = this.state;
    const sessionEmail = sessionStorage.getItem('email');

    if(email.replace(/^\s+$/g,"")===''){
      this.setState({tips: '请输入邮箱！'})
      return false;
    }else if(!email.match(regEmail)){
      this.setState({tips: '邮箱格式不正确！'})
      return false;
    }else if(email.replace(/^\s+$/g,"")!==sessionEmail){
      this.setState({tips: '此邮箱未注册，请先注册！'})
      return false;
    }else if(!password.match(regPwd)){
      this.setState({tips: '请输入6-18位密码！（数字、字母、下划线或其组合）'})
      return false;
    }else{
      this.setState({tips: ''})
      
      this.props.registerNickName({type:'REGISTER_NICKNAME', nickName: sessionStorage.getItem('nickName')})
      this.props.loginPopShow({type:'LOGIN_SHOW', loginShow: false});
      this.props.changeLogined({type:'CHANGE_LOGINED', logined: true});
    }
    //不存到store中，暂时只存到session中
    // const action = {
    //   type: 'LOGIN_DATA',
    //   email: email,
    //   password: password
    // }
    // this.props.loginData(action);
  }

  handleCloseBtnClick () {
    const action = {
      type: 'LOGIN_SHOW',
      loginShow: false,
      regShow: false
    }
    this.props.loginPopShow(action);
    this.setState({tips: ''})
  }

  handleBtnToRegClick () {
    const action = {
      type: 'REG_SHOW',
      loginShow: false,
      regShow: true
    }
    this.props.regPopShow(action);
    this.setState({tips: ''})
  }

}

const mapStateToProps = (state) => {
  return {
    loginShow: state.getIn(['user','loginShow']),
    logined: state.getIn(['user','logined']),
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginPopShow(action) {
    dispatch(action)
  },
  regPopShow(action) {
    dispatch(action)
  },
  changeLogined(action){
    dispatch(action)
  },
  registerNickName(action){
    dispatch(action)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);