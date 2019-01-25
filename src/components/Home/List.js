import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class List extends PureComponent {
  render(){
    const { topicList } = this.props;
    console.log(topicList)
    return (
      <div className="rt_listem">
        {
          topicList.map((item) => {
            return (
              <div className="rt_list" key={item.get('id')}>
                <Link to={'/detail/'+ item.get('id') + '/' + item.get('title')}>
                  <h3>{item.get('title')}</h3>
                  <p>{item.get('content')}</p>
                  <div className="bot">
                    <span>{item.get('author')}</span>
                    <time>{item.get('time')}</time>
                  </div>
                </Link>
              </div>
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  topicList: state.getIn(['home', 'topicList'])
  //list: state.get('home').get('topicList')
});

export default connect(mapStateToProps, null)(List);