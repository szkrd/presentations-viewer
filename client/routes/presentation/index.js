import $ from 'jqlite'
import page from 'page'
import markdown from 'markdown'
import template from './template.hbs'
import './style.less'

let currentId
let currentPage = 0
let maxPage = 999

function setActivePage (n) {
  if (!$(`.page-${n + 1}`).length) {
    maxPage = n
  }
  $('.page').removeClass('active')
  $(`.page-${n}`).addClass('active')
}

function fetchAndRender (id) {
  return fetch(`/api/presentation/${id}`)
    .then(resp => resp.json())
    .then((data) => {
      maxPage = data.pages.length
      $('body').html(template({
        pages: data.pages.map(chunk => markdown.parse(chunk))
      }))
    })
}

function goToPrevPage () {
  let to = !currentPage ? 0 : currentPage - 1
  page(`/presentation/${currentId}/${to}`)
}

function goToNextPage () {
  const to = currentPage < maxPage ? currentPage + 1 : maxPage
  page(`/presentation/${currentId}/${to}`)
}

function initControlBar () {
  $('.control-bar .prev').on('click', goToPrevPage)
  $('.control-bar .next').on('click', goToNextPage)
}

function onKeyDown (e) {
  const LEFT = 37
  const RIGHT = 39
  if (e.metaKey || e.altKey || e.ctrlKey) {
    return
  }
  if (e.keyCode === LEFT) {
    goToPrevPage()
  } else if (e.keyCode === RIGHT) {
    goToNextPage()
  }
}

function initKeyHandler () {
  $(document).on('keydown', onKeyDown)
}

function onDestroy () {
  $(document).off('keydown', onKeyDown)
}

// ---

function view (ctx) {
  currentId = ctx.params.id
  currentPage = parseInt(ctx.params.page, 10) || 0
  const viewIsEmpty = !$('.view-presentation').length

  if (viewIsEmpty) {
    fetchAndRender(currentId).then(() => {
      if (currentPage > maxPage) {
        page(`/presentation/${currentId}/${maxPage - 1}`)
      }
      setActivePage(currentPage)
      initKeyHandler()
      initControlBar()
    })
  } else {
    setActivePage(currentPage)
  }
}

export default Object.assign(view, {
  onDestroy
})
