
export function getBaseFontSize(){
  const docEl = window.document.documentElement
  let width = docEl.getBoundingClientRect().width
  if (width > 640) { width = 640 }
  return width / 30
}

export function refreshRem(){
  const fontSize = getBaseFontSize()
  window.document.documentElement.style.fontSize = fontSize + 'px'
}
