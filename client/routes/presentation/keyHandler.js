import $ from 'jqlite'
import * as pager from './pager'
import * as zoom from './zoom'

function onKeyDown (e) {
  const HOME = 36
  const END = 35
  const LEFT = 37
  const RIGHT = 39
  if (e.metaKey || e.altKey || e.ctrlKey) {
    return
  }
  if (e.key === 'f') {
    zoom.toggleFullScreen()
  } else if (e.key === 'h') {
    pager.goToToc()
  } else if (e.key === '0') {
    pager.goToFirstPage()
  } else if (e.key === '9') {
    pager.goToLastPage()
  } else if (e.key === '+') {
    zoom.increase()
  } else if (e.key === '-') {
    zoom.decrease()
  } else {
    if (e.keyCode === LEFT) {
      pager.goToPrevPage()
    } else if (e.keyCode === RIGHT) {
      pager.goToNextPage()
    } else if (e.keyCode === HOME) {
      pager.goToFirstPage()
    } else if (e.keyCode === END) {
      pager.goToLastPage()
    }
  }
}

export function init () {
  $(document).on('keydown', onKeyDown)
}

export function destroy () {
  $(document).off('keydown', onKeyDown)
}
