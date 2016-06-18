import $ from 'jqlite'
import template from './template.hbs'
import './style.less'

export default () => {
  fetch('/api/meta')
    .then(resp => resp.json())
    .then((data) => {
      $('body').html(template({data}))
    })
}
