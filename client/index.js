/*global THEME*/
import page from 'page'
import $ from 'jqlite'
import './index.less'
import toc from './routes/toc/'
import presentation from './routes/presentation/'

const views = {
  toc,
  presentation
}

$(() => {
  // route handling
  page('/', toc)
  page('/presentation/:id/:page', presentation)
  page({
    hashbang: true
  })

  // global theme switcher
  $('body').addClass(`theme-${THEME}`)
  $(document).on('keydown', (e) => {
    const body = $('body')
    const dark = body.hasClass('theme-dark')
    if (e.key === 'i') {
      body
        .removeClass('theme-dark theme-light')
        .addClass(dark ? 'theme-light' : 'theme-dark')
    }
  })

  // teardown handler
  $(document).on('DOMNodeRemoved', function (e) {
    let viewName = ((e.target.className || '').match(/view-[a-z-]*/) || [])[0]
    viewName = (viewName || '').replace(/^view-/, '')
    if (views && views[viewName] && views[viewName].onDestroy) {
      views[viewName].onDestroy()
    }
  })
})
