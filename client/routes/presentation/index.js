import $ from 'jqlite'
import markdown from 'markdown'
import template from './template.hbs'

export default (ctx) => {
  const id = ctx.params.id
  const page = ctx.params.page
  fetch(`/api/presentation/${id}`)
    .then(resp => resp.json())
    .then((data) => {
      const html = markdown.parse(data.pages[page])
      $('body').html(template({html}))
    })
}
