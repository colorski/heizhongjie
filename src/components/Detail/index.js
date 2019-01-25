import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import cns from 'classnames'
import _ from 'underscore'
import Icon from '../Icon'
import CommentList from './CommentList'
import topicList from '../../data/homeList'
import detailData from '../../data/detail'

class Detail extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      commentShow: false,
      commentTextArea: '',
    }

    this.handleCommentShowBtnClick = this.handleCommentShowBtnClick.bind(this)
    this.handleCommentShowCancle = this.handleCommentShowCancle.bind(this)
    this.handleCommentAreaChange = this.handleCommentAreaChange.bind(this)
    this.handleSubmitCommentArea = this.handleSubmitCommentArea.bind(this)
    this.handlePraiseClick = this.handlePraiseClick.bind(this)
  }

  render (){
    const { title, content, praiseAccount, author, time, praised } = this.props;
    const { commentShow } = this.state;

    return (
      <div className="detail_wrap">
        <h1>{title}</h1>
        <div className="detail_con">
          <p>{content}</p>
        </div>
        <div className="detail_todo">
          <span className={cns('praise', praised?'active':'')} onClick={this.handlePraiseClick}><Icon type="appreciate_light" />
            {praiseAccount}
            <b className={praised?'transhow':''}>1</b>
          </span>
          <span className={commentShow?'active':''} onClick={commentShow?this.handleCommentShowCancle:this.handleCommentShowBtnClick}><Icon type="comment_light" />评论</span>
          <span><Icon type="share" />分享</span>
          <span><Icon type="notice" />举报</span>

          <span className="author">{author} {time}</span>
        </div>
        <div className={cns('detail_comt_cut', commentShow?'show':'')}>
          <div className='detail_comt'>
            <textarea name="comtCon" placeholder="写下你的评论..." onChange={this.handleCommentAreaChange} ref={el=>this.el=el}></textarea>
            <div className="btns">
              <input type="button" value="提交" className="ipt_comt" onClick={this.handleSubmitCommentArea} />
              <input type="button" value="取消" className="ipt_comt cancle" onClick={this.handleCommentShowCancle} />
            </div>
          </div>
        </div>

        {/* 评论列表 */}
        <CommentList />

      </div>
    )
  }

  //加载数据
  componentDidMount(){
    const articleId = Number(this.props.match.params.id);

    // 这里的currentAticle内容应该是直接从detailData里取,并且comments也是从detailData里取的，实际应该单独异步获取
    const currentArticle = _.compact(_.map(topicList, (d)=>{
      if(d.id===articleId){return d}
    }))[0]
    const _detail = _.omit(_.extend(currentArticle, detailData), 'comments')
    const _comments = _.pick(detailData, 'comments').comments
    const _praiseAccount = currentArticle.praiseAccount

    this.onGetDetailData(_detail)
    this.onGetCommentsData(_comments)
    this.onGetPraiseAccount(_praiseAccount)
  }
  onGetDetailData(d){
    const action = {
      type: 'GET_DETAIL_DATA',
      data: d
    }
    this.props.getDetailData(action);
  }
  onGetCommentsData(d){
    const action = {
      type: 'GET_COMMENTS_DATA',
      comments: d
    }
    this.props.getCommentsData(action);
  }
  onGetPraiseAccount(d){
    const action = {
      type: 'GET_PRAISE_ACCOUNT',
      praiseAccount: d
    }
    this.props.getPraiseAccount(action);
  }

  //点赞相关
  handlePraiseClick(){
    const { praised, praiseAccount } = this.props

    const action = {
      type: 'CHANGE_PRAISED',
      praised: !praised,
    }
    this.props.changePraised(action)

    const actions = {
      type: 'CHANGE_PRAISE_ACCOUNT',
      praiseAccount: praised?praiseAccount-1:praiseAccount+1
    }
    this.props.changePraiseAccount(actions)
  }

  //进行评论相关
  handleCommentShowBtnClick(){
    this.setState({
      commentShow: true
    })
    this.el.focus();
  }
  handleCommentShowCancle(){
    this.setState({
      commentShow: false
    })
  }
  handleCommentAreaChange(e){
    this.setState({
      commentTextArea: e.target.value
    })
  }
  handleSubmitCommentArea(){
    const {commentTextArea} = this.state
    if(commentTextArea.replace(/^\s+$/g,'')===''){
      alert('不能为空！');
      return
    }
    const action = {
      type: 'SUBMIT_COMMENT_AREA',
      commentTextArea: commentTextArea
    }
    this.props.submitCommentTextArea(action)
  }

}

const mapStateToProps = (state) => {
  return {
    title: state.getIn(['detail', 'data', 'title']),
    content: state.getIn(['detail', 'data', 'content']),
    author: state.getIn(['detail', 'data', 'author']),
    time: state.getIn(['detail', 'data', 'time']),

    praised:  state.getIn(['detail', 'praised']),
    praiseAccount: state.getIn(['detail', 'praiseAccount']),
  }
}

const mapDispatchToProps = (dispatch) => ({
  getDetailData(action) { dispatch(action) },
  getCommentsData(action) { dispatch(action) },
  getPraiseAccount(action) { dispatch(action) },
  submitCommentTextArea(action) { dispatch(action) },
  changePraised(action) { dispatch(action) },
  changePraiseAccount(action) { dispatch(action) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Detail);