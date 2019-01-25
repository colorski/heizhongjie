import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Icon from '../Icon'

class CommentList extends PureComponent {

  render (){
    const {comments} = this.props

    return (
      <div className="comt_listem">
        {
          comments.map((d)=>{
            return (
              <div className="comt_list" key={d.get('id')}>
                <p>{d.get('content')}</p>
                <div className="comt_list_todo">
                  <span className="btn_report"><Icon type="notice" />举报</span>
                  <span>{d.get('author')} {d.get('addTime')}</span>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.getIn(['detail', 'comments'])
  }
}

export default connect(mapStateToProps, null)(CommentList);