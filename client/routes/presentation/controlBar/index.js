import $ from 'jqlite'
import * as pager from '../pager'
import './style.less'

export function init () {
  $('.control-bar .prev').on('click', pager.goToPrevPage)
  $('.control-bar .next').on('click', pager.goToNextPage)
}
