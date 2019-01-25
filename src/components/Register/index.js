import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Icon from '../Icon'
import { regEmail, regPwd } from '../../utils/regExp'

class Register extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      nickName: '',
      email: '',
      password: '',
      password2: '',
      tips: ''
    }

    this.handleCloseBtnClick = this.handleCloseBtnClick.bind(this);
    this.handleBtnToLoginClick = this.handleBtnToLoginClick.bind(this);
    this.handleNickNameChange = this.handleNickNameChange.bind(this);
    this.handleEmailInputChange = this.handleEmailInputChange.bind(this);
    this.handlePwdInputChange = this.handlePwdInputChange.bind(this);
    this.handlePwd2InputChange = this.handlePwd2InputChange.bind(this);
    this.handleRegisterBtnClick = this.handleRegisterBtnClick.bind(this);
  }

  render (){
    const { regShow } = this.props;
    const { tips } = this.state;
    
    return (
      <div className={ regShow ? "cmn_bg" : "cmn_hide"}>
				<div className={ regShow ? "reg_cmn" : ""} onKeyUp={e=> e.keyCode===13 && this.handleRegisterBtnClick()}>
					<h5>加入反黑联盟</h5>
					<p className="sub">揪出黑，还世界以清白</p>
					<p className="tips">{tips&&tips}</p>
					<input type="text" name="nickName" placeholder="昵称" onChange={this.handleNickNameChange} />
					<input type="text" name="account" placeholder="邮箱帐号" onChange={this.handleEmailInputChange} />
					<input type="password" name="password1" placeholder="密码" onChange={this.handlePwdInputChange} />
					<input type="password" name="password2" placeholder="确认密码" onChange={this.handlePwd2InputChange} />
					<input type="button" value="注 册" onClick={this.handleRegisterBtnClick} />
					<p className="reg_bot cf"><span onClick={this.handleBtnToLoginClick}>登录</span></p>
					<Icon type="guanbi" onClick={this.handleCloseBtnClick} />
				</div>
      </div>
    )
  }

  handleNickNameChange (e) {
    this.setState({nickName: e.target.value})
  }
  handleEmailInputChange (e) {
    this.setState({email: e.target.value})
  }
  handlePwdInputChange (e) {
    this.setState({password: e.target.value})
  }
  handlePwd2InputChange (e) {
    this.setState({password2: e.target.value})
  }
  handleRegisterBtnClick () {
    let {nickName, email, password, password2} = this.state;
    const successTips = <span style={{color:'green'}}>注册成功！请登录！</span>

    if(nickName.replace(/^\s+$/g,'')===''){
      this.setState({tips: '请输入昵称！'})
      return false;
    }else if(email.replace(/^\s+$/g,'')===''){
      this.setState({tips: '请输入邮箱！'})
      return false;
    }else if(!email.match(regEmail)){
      this.setState({tips: '邮箱格式不正确！'})
      return false;
    }else if(!password.match(regPwd)){
      this.setState({tips: '请输入6-18位密码！（数字、字母、下划线或其组合）'})
      return false;
    }else if(password2!==password){
      this.setState({tips: '密码输入不一致！'})
      return false;
    }else{
      sessionStorage.setItem('nickName',nickName)
      sessionStorage.setItem('email',email)
      sessionStorage.setItem('password',password.replace(/^\s+$/g,""))
      
      this.setState({tips: successTips})
      setTimeout(()=>{
        this.props.loginPopShow({type:'LOGIN_SHOW', loginShow: true})
      },1500)
    }
    //不存到store中只存到session中
    // const action = {
    //   type: 'LOGIN_DATA',
    //   email: email,
    //   password: password
    // }
    // this.props.loginData(action);
  }

  handleCloseBtnClick () {
    const action = {
      type: 'REG_SHOW',
      regShow: false,
      loginShow: false
    }
    this.props.regBoxShow(action);
  }

  handleBtnToLoginClick () {
    const action = {
      type: 'LOGIN_SHOW',
      loginShow: true,
      regShow: false
    }
    this.props.loginPopShow(action);
  }
}

const mapStateToProps = (state) => ({
    regShow: state.getIn(['user','regShow']),
})

const mapDispatchToProps = (dispatch) => ({
  loginPopShow(action) {
    dispatch(action)
  },
  regBoxShow(action) {
    dispatch(action)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);