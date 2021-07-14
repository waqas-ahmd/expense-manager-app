const initialState = {
  categories: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case "updateCategoryList":
      return { ...state, categories: [...action.data] };
    default:
      return state;
  }
};
