import React, { Component } from 'react'
import Icon from '../Icon'

class Notice extends Component {
    render() {
        const icons = {
            info: 'tishi1',
            success: 'yuanxingxuanzhongfill',
            warning: 'warning',
            error: 'wrong',
            loading: 'loading'
        }
        const { type, content } = this.props
        return (
            <div className={`toast-notice ${type}`}>
                <Icon type={icons[type]} />
                <span>{content}</span>
            </div>
        )
    }
}

export default Notice