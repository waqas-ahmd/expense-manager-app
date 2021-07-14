import ReduxThunk from "redux-thunk";
import { applyMiddleware, combineReducers, createStore } from "redux";
import expenseReducers from "./reducers/expenseReducers";
import categoryReducers from "./reducers/categoryReducers";

const rootReducer = combineReducers({
  expenses: expenseReducers,
  categories: categoryReducers,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
