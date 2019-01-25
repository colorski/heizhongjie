import moment from 'moment'
import config from 'config'
const timeFmt = 'HH:mm'

export function isSysUpdating(){
  let start = moment(config.sysUpdateTimeRange[0], timeFmt)
  let end = moment(config.sysUpdateTimeRange[1], timeFmt)
  if(end < start) end.add(1, 'd')
  const now = moment()
  return now >= start && now <= end
}

export function getSysUpdateTip(){
  return `系统每天${config.sysUpdateTimeRange[0]} - ${config.sysUpdateTimeRange[1]}进行停服务更新，更新期间暂不支持客户保留，更新完毕后可正常保留！`
}
