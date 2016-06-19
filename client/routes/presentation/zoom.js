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

export function init () {
  currentFontSize = 16
}
