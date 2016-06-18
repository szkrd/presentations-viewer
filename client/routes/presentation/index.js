import $ from 'jqlite'
import page from 'page'
import marked from 'marked'
import template from './template.hbs'
import store from './store'
import * as pager from './pager'
import * as keyHandler from './keyHandler'
import * as controlBar from './controlBar'
import './style.less'

function fetchAndRender (id) {
  return fetch(`/api/presentation/${id}`)
    .then(resp => resp.json())
    .then((data) => {
      store.maxPage = data.pages.length - 1
      $('body').html(template({
        pages: data.pages.map(chunk => marked(chunk))
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
    keyHandler.init()
    controlBar.init()
  })
}

export default Object.assign(view, {
  onDestroy
})
