import React, { Component } from 'react'

class Prompt extends Component {
    constructor() {
        super()
        this.handleChange = this.handleChange.bind(this)
        this.state = { enterContent: '' }
    }

    handleChange(event) {
        this.setState({ enterContent: event.target.value })
    }

    render() {
        const { content, onOk, onCancel, okText="确定", cancleText="取消" } = this.props
        const { enterContent } = this.state
        return (
            <div className="ski-modal-prompt dialog">
                <div className="prompt-con">{content}</div>
                <input type="text" value={enterContent} onChange={this.handleChange} />
                <div className="button-wrapper">
                    <button type="button" className="cancle" onClick={() => { onCancel && onCancel() }}>{cancleText}</button>
                    <button type="button" className="ok" onClick={() => { onOk && onOk(enterContent) }}>{okText}</button>
                </div>
            </div>
        )
    }
}

export default Prompt