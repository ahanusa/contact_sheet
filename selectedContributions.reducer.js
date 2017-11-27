var selectedContributionsReducer = (() => {
  var initialState = {};

  function deleteId(id, state) {
    var newState = Object.assign({}, state);
    delete newState[id];
    return newState;
  }

  function reduce(state = initialState, action) {
    switch (action.type) {
      case "REMOVE":
        return deleteId(action.id, state);
      case "SELECT":
        return Object.assign({}, state, { [action.id]: true });
      case "DESELECT":
        return deleteId(action.id, state);
      default:
        return state
    }
  }

  return reduce;
})();