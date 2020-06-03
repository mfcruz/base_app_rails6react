import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import rootReducer from "./reducers";

const initialState = { 
  posts: [
    {
      title: "test",
      description: "123"
    }
  ] 
};


function rootReducer(state, action) {
  console.log(action.type);
  switch (action.type) {
    case 'GET_POSTS_SUCCESS':
      return { posts: action.json.posts }
  }
  return state;
}

export default function configureStore() {
  const store = createStore(
    rootReducer, 
    initialState,
    applyMiddleware(thunk)
  );
  return store;
}