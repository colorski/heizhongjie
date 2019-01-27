import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Icon from '../Icon'
import Modal from '../Modal'
import Toast from '../Toast'
import Report from '../Report'

class CommentList extends PureComponent {
  constructor(props){
    super(props)

    this.handleReportId = this.handleReportId.bind(this)
    this.handleReportTypeId = this.handleReportTypeId.bind(this)
  }

  render (){
    const {comments} = this.props
    const { confirm } = Modal;

    return (
      <div className="comt_listem">
        {
          comments.map((d)=>{
            return (
              <div className="comt_list" key={d.get('id')}>
                <p>{d.get('content')}</p>
                <div className="comt_list_todo">
                  <span className="btn_report" onClick={()=>(
                    //this.handleReportTypeId(d.get('id')),
                    confirm({
                      content: <Report onGetChosedReportId={(id)=>this.handleReportId(id)} />,
                      title: true,
                      onOk: ()=>{
                        const { logined, chosedReportId } = this.props;

                        if(!logined){
                          Toast.warning('请先登录！')
                          return
                        }
                        Toast.info('举报 type: comment, id：'+chosedReportId, 3000)
                      }
                    })
                  )}
                  ><Icon type="notice" />举报</span>
                  <span>{d.get('author')} {d.get('addTime')}</span>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }

  //举报相关
  handleReportTypeId(id){
    const action = {
      type: 'report/REPORT_TYPE_ID',
      reportTypeId: id
    }
    this.props.handleReportTypeIdToStore(action)
  }
  handleReportId(id){
    const action = {
      type: 'report/CHOSED_REPORT_ID',
      chosedReportId: id
    }
    this.props.handleReportIdToStore(action)
  }

}

const mapStateToProps = (state) => {
  return {
    logined: state.getIn(['user', 'logined']),
    comments: state.getIn(['detail', 'comments']),
    chosedReportId: state.getIn(['detail', 'chosedReportId']),
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleReportIdToStore(action) { dispatch(action) },
  handleReportTypeIdToStore(action) { dispatch(action) }
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);