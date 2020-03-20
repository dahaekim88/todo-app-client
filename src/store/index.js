import React, { createContext, useReducer } from 'react';

const initialState = {
  totalCounts: {
    all: 0,
    today: 0,
    complete: 0,
    incomplete: 0,
  },
  tasks: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TODO":
      return {
        ...state,
        tasks: action.tasks,
      };
    default:
      return state;
  }
}

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export {
  store,
  StateProvider,
}
