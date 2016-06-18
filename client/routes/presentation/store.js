// shared store for presentation view, we don't need a mediator
// or pubsub for such a simple page...
const store = {
  currentId: '',
  currentPage: 0,
  maxPage: 999
}

export default store
