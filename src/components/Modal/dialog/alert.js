import React, { Component } from 'react'

class Alert extends Component {
    render() {
        const { content, onOk, okText='确定' } = this.props
        return (
            <div className="ski-modal-alert dialog">
                <div className="alert-con">{content}</div>
                <button type="button" onClick={() => { onOk && onOk() }}>{okText}</button>
            </div>
        )
    }
}

export default Alert