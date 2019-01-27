import React, { Component } from 'react'
import Modal from '../Modal'
import Toast from '../Toast'

class Test extends Component {
  render () {
    const { alert, confirm, prompt } = Modal;
    const _alertContent = <div><p>确认提示框！</p><p>确认提示框！</p><p>确认提示框！</p></div>
    return (
      <div style={{padding: '20px'}}>
        <h1>Test for components</h1>
        <hr style={{margin: '20px 0'}} />
        <div>
          <span onClick={()=>alert({ content: _alertContent })}  style={{cursor: 'pointer', marginRight:'20px'}}>alert</span>
          <span onClick={()=>confirm({
                content: '确定要删除吗？',
                onOk() { console.log('文件已删除！') },
                onCancel() { console.log('已取消操作。') },
                //okText: '提交',
                //cancleText: '不提交',
            })} style={{cursor: 'pointer', marginRight:'20px'}}>confirm
          </span>
          <span onClick={()=>prompt({
                content: _alertContent,
                onPromptOk(data) { console.log(`已修改为：${data}`) },
                onCancel() { console.log('已取消操作') }
            })} style={{cursor: 'pointer', marginRight:'20px'}}>prompt</span>
        </div>
        <hr style={{margin: '20px 0'}} />
        <div>
          <span onClick={()=>Toast.info('信息提示！',3000, ()=>Toast.success('成功提示！'))} style={{cursor: 'pointer', marginRight:'20px'}}>info</span>
          <span onClick={()=>Toast.success('成功提示！')} style={{cursor: 'pointer', marginRight:'20px'}}>success</span>
          <span onClick={()=>Toast.warning('警告提示！')} style={{cursor: 'pointer', marginRight:'20px'}}>warning</span>
          <span onClick={()=>Toast.error('错误提示！')} style={{cursor: 'pointer', marginRight:'20px'}}>error</span>
          <span onClick={()=>Toast.loading('加载提示！')} style={{cursor: 'pointer', marginRight:'20px'}}>loading</span>
          <span onClick={() => {
              const hideLoading = Toast.loading('加载中...', 0, () => {
                  Toast.success('加载完成',1500)
              })
              setTimeout(hideLoading, 2000)
            }
          } style={{cursor: 'pointer', marginRight:'20px'}}>loadingCallback</span>
        </div>
      </div>
    )
  }
}

export default Test;