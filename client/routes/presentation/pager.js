import $ from 'jqlite'
import page from 'page'
import store from './store'

export function setActivePage (n) {
  $('.page').removeClass('active')
  $(`.page-${n}`).addClass('active')
}

export function goToPrevPage () {
  let to = !store.currentPage ? 0 : store.currentPage - 1
  page(`/presentation/${store.currentId}/${to}`)
}

export function goToNextPage () {
  const to = store.currentPage < store.maxPage ? store.currentPage + 1 : store.maxPage
  page(`/presentation/${store.currentId}/${to}`)
}

export function goToFirstPage () {
  page(`/presentation/${store.currentId}/0`)
}

export function goToLastPage () {
  page(`/presentation/${store.currentId}/${store.maxPage}`)
}

export function goToToc () {
  page('/')
}
