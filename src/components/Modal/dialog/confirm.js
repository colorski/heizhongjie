import React, { Component } from 'react'

class Confirm extends Component {
    render() {
        const { content, onOk, onCancel, okText="确定", cancleText="取消" } = this.props
        return (
            <div className="ski-modal-confirm dialog">
                <h4>{content}</h4>
                <div className="button-wrapper">
                    <button type="button" className="cancle" onClick={() => { onCancel && onCancel() }}>{cancleText}</button>
                    <button type="button" className="ok" onClick={() => { onOk && onOk() }}>{okText}</button>
                </div>
            </div>
        )
    }
}

export default Confirm