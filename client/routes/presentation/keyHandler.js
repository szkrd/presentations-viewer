import $ from 'jqlite'
import * as pager from './pager'

function onKeyDown (e) {
  const HOME = 36
  const END = 35
  const LEFT = 37
  const RIGHT = 39
  if (e.metaKey || e.altKey || e.ctrlKey) {
    return
  }
  if (e.key === 'h') {
    pager.goToToc()
    return
  }
  if (e.key === '0') {
    pager.goToFirstPage()
    return
  }
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

export function init () {
  $(document).on('keydown', onKeyDown)
}

export function destroy () {
  $(document).off('keydown', onKeyDown)
}
