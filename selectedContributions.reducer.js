var selectedContributionsReducer = (() => {
  var initialState = {};

  function reduce(state = initialState, action) {
    switch (action.type) {
      case "SELECT":
        return Object.assign({}, state, { [action.id]: true });
      case "DESELECT":
        var newState = Object.assign({}, state);
        delete newState[action.id];
        return newState;
      default:
        return state
    }
  }

  return reduce;
})();