import React, { useEffect, useContext, useMemo } from "react";
import axios from "axios";
import {
  GlobalStyles,
  Sidebar,
  Main,
  SearchForm,
  FilterBox,
  ExcelBtn,
  AddForm,
  TodoList,
  Pagination,
} from "./components";
import { API_URL } from "../.config";
import { store } from './store';

const App = () => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { pageNum } = state;
  const { count, page, queryString } = state.current;
  const pageCount = useMemo(() => Math.ceil(count / 5), [count]);

  useEffect(() => {
    updateCurrentPage(page);
  }, [pageNum]);

  const fetchTotal = async () => {
    dispatch({ type: "LOADING" });
    try {
      const result = await axios.get(`${API_URL}/tasks/${pageNum}`);
      dispatch({
        type: "UPDATE_ALL",
        current: {
          page: "all",
          count: result.data.count,
        },
        totalCounts: result.data.totalCounts,
        tasks: result.data.tasks,
      });
    } catch (err) {
      dispatch({ type: "ERROR", error: err });
    }
  }

  const fetchCurrent = async (page) => {
    dispatch({ type: "LOADING" });
    try {
      const result = await axios.get(`${API_URL}/tasks/${page}/${queryString}/${pageNum}`);
      const { count, tasks } = result.data;
      dispatch({
        type: "UPDATE_CURRENT",
        pageNum,
        current: {
          page: (page === "search") ? page : (queryString === "all") ? queryString : "filter",
          count,
          queryString,
        },
        tasks,
      });
    } catch (err) {
      dispatch({ type: "ERROR", error: err });
    }
  }

  const updateCurrentPage = async (page) => {
    switch (page) {
      case "search":
        fetchCurrent(page);
        break;
      case "filter":
        fetchCurrent(page);
        break;
      default:
        fetchTotal();
    }
  }

  return (
    <>
      <GlobalStyles />
      <Sidebar>
        <SearchForm
          fetchTotal={fetchTotal}
        />
        <FilterBox />
        <ExcelBtn />
      </Sidebar>
      <Main>
        <AddForm />
        <TodoList />
        <Pagination
          pageCount={pageCount}
        />
      </Main>
    </>
  );
};

export default App;
