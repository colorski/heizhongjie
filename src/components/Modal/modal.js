import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import Alert from './dialog/alert'
import Confirm from './dialog/confirm'
import Prompt from './dialog/prompt'

const DialogTypes = {
    ALERT: 'alert',
    CONFIRM: 'confirm',
    PROMPT: 'prompt'
}

class Modal extends Component {
    constructor() {
        super()
        this.onClose = this.onClose.bind(this)
        this.transitionTime = 300
        this.state = { showDialog: false }
    }

    componentDidMount() {
        this.setState({ showDialog: true })
    }

    onClose(confirm, prompt, data) {
        const { onOk, onPromptOk, onCancel, removeDialog } = this.props
        if (confirm && onOk) {
            onOk()
        }else if (prompt && onPromptOk) {
            onPromptOk(data)
        }else if (onCancel) {
            onCancel()
        }
        setTimeout(removeDialog, this.transitionTime)
        this.setState({ showDialog: false })
    }

    renderDialogForType(type, props) {
        switch (type) {
            case DialogTypes.ALERT:
                return <Alert {...props} />
            case DialogTypes.CONFIRM:
                return <Confirm {...props} />
            case DialogTypes.PROMPT:
                return <Prompt {...props} />
            default:
                throw new Error('dialog type error')
        }
    }

    render() {
        const { type, content, okText, cancleText, title } = this.props
        const { onClose } = this
        const { showDialog } = this.state
        return (
            <CSSTransition
                in={showDialog}
                classNames="ski-modal-wrapper"
                timeout={this.transitionTime}
            >
                <div className="ski-modal">
                    <CSSTransition
                        in={showDialog}
                        classNames="dialog-wrapper"
                        timeout={this.transitionTime}
                    >
                        {
                            this.renderDialogForType(type, {
                                content,
                                onOk() { onClose(true,false) },
                                onCancel() { onClose(false, false) },
                                onPromptOk(data) { onClose(false, true, data) },
                                okText,
                                cancleText,
                                title,
                            })
                        }
                    </CSSTransition>
                </div>
            </CSSTransition>
        )
    }
}

function popupDialog(params) {
    const div = document.createElement('div')
    document.body.appendChild(div)
    ReactDOM.render(<Modal
        {...params}
        removeDialog={() => {
            ReactDOM.unmountComponentAtNode(div)
            document.body.removeChild(div)
        }}
    />, div)
}

export default {
    alert(params) {
        popupDialog({ type: DialogTypes.ALERT, ...params })
    },
    confirm(params) {
        popupDialog({ type: DialogTypes.CONFIRM, ...params })
    },
    prompt(params) {
        popupDialog({ type: DialogTypes.PROMPT, ...params })
    }
}