import React, { PureComponent } from 'react'
import Icon from '../Icon'
import reportItem from '../../data/report'

class Report extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            chosedId: '',
        }
    }

    render() {
        const { chosedId } = this.state;
        return (
            <div className="report">
                <h4>举报</h4>
                <ul>
                    {
                        reportItem.map((d)=><li key={d.id} className={chosedId===d.id?"chosed":""} onClick={()=>this.handleReportItemClick(d.id)}>{ chosedId===d.id?<Icon type="yuanxingxuanzhong" />:''}{d.text}</li>)
                    }
                </ul>
            </div>
        )
    }

    handleReportItemClick = (id) => {
        this.setState({
            chosedId: id,
        })
        this.props.onGetChosedReportId(id);
    }
}

export default Report;