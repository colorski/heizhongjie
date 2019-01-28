import React, { PureComponent } from 'react'
import ReactQuill from 'react-quill'
import '../../assets/quill.snow.css'
import Toast from '../Toast'

class Roast extends PureComponent {
  constructor(props){
    super(props)

    this.state={
      title: '',
      text: '<p>quill测试文本</p>',
    }
    this.editor=null;
    this.handleSubmitClick = this.handleSubmitClick.bind(this)
  }
  render () {
    return (
      <div className="roast-wrap">
        <div className="roast-title">
          <input type="text" placeholder="标题尽量带所吐槽中介的名称" onChange={(e) => this.setState({ title: e.target.value })} />
        </div>
        <ReactQuill theme="snow"
          value={ this.state.text }
          placeholder='请尽量文明吐槽...'
          onChange={(val)=>{
          this.setState({ text: val })
        }}/>
        <div className="roast-btn" onClick={this.handleSubmitClick}>提 交</div>

        <div className="roast-preview">
          <div className="tit">预览</div>
          <p className="tips">标题：</p>
          <h1>{this.state.title}</h1>
          <p className="tips">内容：</p>
          <div style={{fontFamily:'Helvetica, Arial, sans-serif'}} dangerouslySetInnerHTML={{__html: this.state.text}}></div>
        </div>
      </div>
    )
  }

  handleSubmitClick(){
    Toast.info('感谢参与！')
  }

}

export default Roast;