import _ from 'underscore'

export function lookup(dict, key){
  if(_.isArray(dict) && dict[0] && !_.isUndefined(dict[0].key)){
    const item = dict.find(item => item.key == key)
    return item ? item.text : null
  }else if(_.isObject(dict)){
    return dict[key] || null
  }else{
    return null
  }
}
