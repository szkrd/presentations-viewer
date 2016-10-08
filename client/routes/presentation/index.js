import $ from 'jqlite'
import page from 'page'
import marked from 'marked'
import emojione from 'emojione'
import template from './template.hbs'
import store from './store'
import * as zoom from './zoom'
import * as pager from './pager'
import * as keyHandler from './keyHandler'
import * as controlBar from './controlBar'
import './style.less'

// setup marked
marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value
  }
})

// setup emojione
emojione.imageType = 'svg'
emojione.sprites = true
emojione.imagePathSVGSprites = '/emojione.sprites.svg'

function fetchAndRender (id) {
  return fetch(`/api/presentation/${id}`)
    .then(resp => resp.json())
    .then((data) => {
      store.maxPage = data.pages.length - 1
      $('body').html(template({
        pages: data.pages.map(chunk => {
          chunk = marked(chunk)
          chunk = emojione.toImage(chunk)
          // this may mess up the src tags inside the code blocks?
          chunk = chunk.replace(/src="([a-z0-9-_]*?)\.(jpe?g|png|gif|svg)"/g, (full, name, ext) =>
            name.startsWith('http') ? full : `src="/api/images/${id}/${name}.${ext}"`
          )
          return chunk
        })
      }))
    })
}

function onDestroy () {
  keyHandler.destroy()
}

// ---

function view (ctx) {
  store.currentId = ctx.params.id
  store.currentPage = parseInt(ctx.params.page, 10) || 0
  const viewIsNotEmpty = $('.view-presentation').length > 0

  // the dom is okay, we have everything we need
  if (viewIsNotEmpty) {
    pager.setActivePage(store.currentPage)
    return
  }

  // view is empty, download pages
  fetchAndRender(store.currentId).then(() => {
    if (store.currentPage > store.maxPage) {
      page(`/presentation/${store.currentId}/${store.maxPage}`)
    }
    pager.setActivePage(store.currentPage)
    zoom.init()
    keyHandler.init()
    controlBar.init()
  })
}

export default Object.assign(view, {
  onDestroy
})
