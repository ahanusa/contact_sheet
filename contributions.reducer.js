var contributionsReducer = (() => {
  var initialState = [];

  function reduce(state = initialState, action) {
    switch (action.type) {
      case "ADD":
        return [...state, action.contribution];
      case "REMOVE":
        return [...state.filter(c => c.id !== action.id)]
      default:
        return state
    }
  }

  return reduce;
})();