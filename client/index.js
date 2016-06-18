import page from 'page'
import $ from 'jqlite'
import './index.less'
import toc from './routes/toc/'
import presentation from './routes/presentation/'

$(() => {
  page('/', toc)
  page('/presentation/:id/:page', presentation)
  page({
    hashbang: true
  })
})
