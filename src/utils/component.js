export const genClassName = function(...args){
  return args.filter(a => !!a).join(' ')
}

export const getTopZIndex = function(){
  const lastTop = window.XK_TOP_Z_INDEX || 999
  const currTop = lastTop + 1
  window.XK_TOP_Z_INDEX = currTop
  return currTop
}
