import React, { createContext, useReducer } from 'react';

const initialState = {
  pageNum: 1,
  current: {
    page: "",
    queryString: "",
    count: 0,
  },
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
    case "PAGINATION":
      return {
        ...state,
        pageNum: action.pageNum,
      };
    case "UPDATE_ALL": // 렌더링 처음 fetch 할 때
      return {
        ...state,
        current: {
          ...state.current,
          page: action.current.page,
          count: action.current.count,
        },
        totalCounts: action.totalCounts,
        tasks: action.tasks,
      };
    case "UPDATE_CURRENT": // search & filter
      return {
        ...state,
        pageNum: action.pageNum,
        current: {
          ...state.current,
          page: action.current.page,
          queryString: action.current.queryString,
          count: action.current.count,
        },
        tasks: action.tasks,
      };
    case "UPDATE_TOTAL":
      return {
        ...state,
        current: {
          ...state.current,
          count: action.current.count,
        },
        totalCounts: action.totalCounts,
        tasks: action.tasks,
      };
    case "UPDATE_TODO":
      return {
        ...state,
        tasks: action.tasks,
      };
    case "ADD_TODO":
      return {
        ...state,
        current: {
          ...state.current,
          page: "all",
          count: action.totalCounts.all,
        },
        totalCounts: action.totalCounts,
        tasks: action.tasks,
      }
    case "DELETE_TODO":
      return {
        ...state,
        pageNum: action.pageNum,
        current: {
          ...state.current,
          count: action.current.count,
        },
        totalCounts: action.totalCounts,
        tasks: action.tasks,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
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
