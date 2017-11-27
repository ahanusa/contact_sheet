let INCREMENT = 'INCREMENT'
let DECREMENT = 'DECREMENT'

function select(contribution) {
  return {
    type: "SELECT",
    id: contribution._id
  }
}

function deselect(contribution) {
  return {
    type: "DESELECT",
    id: contribution._id
  }
}

function add(contribution) {
  return {
    type: "ADD",
    contribution : contribution
  }
}

function remove(id) {
  return {
    type: "REMOVE",
    id: id
  }
}

var contributionActions = {
  add: add,
  deselect: deselect,
  remove: remove,
  select: select
};
