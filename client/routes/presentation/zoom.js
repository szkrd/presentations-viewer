import $ from 'jqlite'

let currentFontSize = 16
const step = 2
const smallest = 5

const setSize = () => $('.markdown-body').css({fontSize: `${currentFontSize}px`})

export function increase (n) {
  currentFontSize += step
  setSize()
}

export function decrease (n) {
  if (currentFontSize < smallest) {
    return
  }
  currentFontSize -= step
  setSize()
}

// why would the native api work in chrome?
export function toggleFullScreen () {
  const doc = window.document
  const docEl = doc.documentElement
  const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen
  const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen
  if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl)
  } else {
    cancelFullScreen.call(doc)
  }
}

export function init () {
  currentFontSize = 16
}
