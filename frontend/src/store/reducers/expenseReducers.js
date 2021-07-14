const initialState = {
  expenses: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case "updateExpenseList":
      return { ...state, expenses: [...action.data] };
    default:
      return state;
  }
};
