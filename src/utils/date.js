import moment from 'moment'

export const dateFmt = 'YYYY-MM-DD'

export function getPastTimeRange(flag, withTime){
  if(!flag) return {
    beginTime: null,
    endTime: null,
  }
  const df = dateFmt
  if(flag){
    let start = moment()
    if(flag == 'w'){
      start.day(1)
    }else if(flag == 'm'){
      start.date(1)
    }else if( flag == 'y' ){
      start.dayOfYear(1)
    }else if(flag == 's'){
      start.startOf('quarter')
    }
    return {
      beginTime: start.format(df + (withTime ? ' 00:00:00' : '')),
      endTime: moment().format(df + (withTime ? ' 23:59:59' : ''))
    }
  }
}

export function getFutureTimeRange(flag, withTime){
  if(!flag) return {
    beginTime: null,
    endTime: null,
  }
  const df = withTime ? 'YYYY-MM-DD 00:00:00' : dateFmt
  const num = flag.match(/\d+/) ? +(flag.match(/\d+/)[0]) : 1
  const unit = flag.replace(/\d/g, '')
  return {
    beginTime: moment().format(df),
    endTime: moment().add(unit, num).format(df)
  }
}

export const dateRangeDict1 = [
  {key:"1", text:'今日'},
  {key:"2", text:'上周'},
  {key:"3", text:'本周'},
  {key:"4", text:'上月'},
  {key:"5", text:'本月'},
  {key:"6", text:'本年'},
]

export function parseDateRange1 (value){
  let v= value;
  let dateBegin;
  let dateEnd;

  switch(v){
    case "1"://今日
      dateBegin = moment().format(dateFmt)
      dateEnd = moment().format(dateFmt)
      break;
    case "2"://上周
      dateBegin = moment().subtract(7, 'days').day(1).format(dateFmt)
      dateEnd = moment().subtract(7, 'days').day(7).format(dateFmt)
      break;
    case "3"://本周
      dateBegin = moment().day(1).format(dateFmt)
      dateEnd = moment().day(7).format(dateFmt)
      break;
    case "4"://上月
      dateBegin = moment().subtract(1, 'months').startOf('months').format(dateFmt)
      dateEnd = moment().subtract(1, 'months').endOf('months').format(dateFmt)
      break;
    case "5"://本月
      dateBegin = moment().startOf('months').format(dateFmt)
      dateEnd = moment().endOf('months').format(dateFmt)
      break;
    case "6"://本年
      dateBegin = moment().startOf('years').format(dateFmt)
      dateEnd = moment().endOf('years').format(dateFmt)
      break;
  }

  return [dateBegin, dateEnd]
}
