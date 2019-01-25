import _ from 'underscore'
import fetch from 'utils/fetch'
import qs from 'query-string'

export default function buildEventCollector(){
  document.addEventListener('click', targetClickHandler)
}

function targetClickHandler(e){
  const ee = findEventTarget(e.target)
  ee && sendEvent(ee.eeid, ee.eearg)
}

function findEventTarget(el){
  if(!el) return null
  const eeid = el.getAttribute('eeid')
  const eearg = el.getAttribute('eearg')
  return (eeid && eeid!='null' && eeid!='undefined' && eeid!='false') ?
    {eeid, eearg} :
    findEventTarget(el.parentElement)
}

export function sendEvent(eeid, eearg, url){
  url = url || location.href.replace(/\?.*/, '').replace(/\/\d+(?=\/|$)/g, '/_id_')
  let params = {event: eeid, url}
  if(eearg){
    params.request = genArg(eearg)
  }
  fetch('/api/log/add-event', 'post', params)
}

export function genArg(args){
  if(_.isString(args)) return args
  if(!_.isObject(args)) return ''
  return qs.stringify(_.omit(args, v =>
    _.isNull(v) || _.isUndefined(v) || v==='' || (_.isArray(v) && !v.length)
  ))
}

let currUrl = ''
export function sendRouteEvent(){
  const url = location.href.replace(/\?.*/, '').replace(/\/\d+(?=\/|$)/g, '/_id_')
  if(url == currUrl) return
  sendEvent(url, 'routeChanging', currUrl)
  currUrl = url
}
