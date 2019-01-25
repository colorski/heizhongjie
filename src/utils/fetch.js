import _ from 'underscore'
import fetch from 'isomorphic-fetch'

export default function(url, ...args){
  let opts = {}, cb = function(){}, body = null, method='GET',
      contentType='application/x-www-form-urlencoded'
  args.forEach((arg)=>{
    if(typeof arg == 'function'){
      cb = arg
    }else if(typeof arg == 'object'){
      body = _.clone(arg)
    }else if(_.isString(arg) && /^(get|post|put|delete)$/i.test(arg)){
      method = arg.toUpperCase()
    }else if(_.isString(arg) && /^json$/i.test(arg)){
      contentType='application/json'
    }
  })
  opts.method = method
  opts.headers = {
    'App-Platform': 'mobile'
  }
  body = body || {}
  if(body)
  if(contentType == 'application/json'){
      opts.body = JSON.stringify(body)
    }else{
      body._t = +new Date()
      body = _.omit(body, v => _.isUndefined(v) || _.isNull(v) || v==='' || (_.isArray(v) && !v.length))
      opts.body = _.map(body, (val, key) =>
        _.isArray(val) ?
          val.map(item => `${key}=${encodeURIComponent(item)}`).join('&') :
          `${key}=${encodeURIComponent(val)}`
      ).join('&')
    }

    // Object.keys(body).map((key)=>`${key}=${body[key]}`).join('&')
  if(opts.method == 'POST'){
    opts.headers['Content-Type'] = contentType
  }else if(opts.body){
    url += (/\?/.test(url) ? '&' : '?') + opts.body
    delete opts.body
  }
  opts.credentials = 'include'
  return fetch(url, opts).then((res)=>{
    if(res.ok){
      res.json().then(function(data) {
        cb(null, data)
      })
    }else{
      cb(res)
    }
  }, (err)=>{
    cb({message: '网络发生错误，请检查您的网络环境'}, err)
  })
}
