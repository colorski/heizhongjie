/**
 * 字体图标组件
 * 字体来源于http://iconfont.cn/
 * 所有字体可在iconfont.cn自己定制，下载字体包后，把iconfont.js文件拷贝到该目录，覆盖原来的文件
 * 此示例图标来自自己的github帐号登录 - 我发起的项目 - 反黑联盟
 */

import React from 'react'
import './index.css'
import './iconfont.js'

export default function({ type, className='', style={} , onClick, title, eeid=""}) {
  let props = {
    className: `${className} iconfont icon-${type} ${onClick?'clickalbe':''}`.trim(),
    style,
    title,
    eeid
  }
  if(onClick) props.onClick = onClick
  return <i {...props}>
    <svg className="icon" aria-hidden="true">
      <use href={"#icon-"+type}></use>
    </svg>
  </i>
}


//原始
//iconfont.js有个==改为了===
//className: `${className} iconfont icon-${type} ${onClick && 'clickalbe'}`.trim(),
//<use xlink:href={"#icon-"+type}></use>