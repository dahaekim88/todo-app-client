import React, { useEffect, useContext } from "react";
import axios from "axios";
import { ThemeProvider } from "styled-components";
import {
  theme,
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
  const { page, queryString } = state.current;

  useEffect(() => {
    updateCurrentPage(page, pageNum);
  }, [pageNum]);

  const fetchTotal = async (pageNum) => {
    dispatch({ type: "LOADING" });
    try {
      const result = await axios.get(`${API_URL}/tasks/${pageNum}`);
      const { count, totalCounts, tasks } = result.data;
      dispatch({
        type: "UPDATE_ALL",
        pageNum,
        current: {
          page: "all",
          count,
        },
        totalCounts,
        tasks,
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

  const updateCurrentPage = async (page, pageNum) => {
    switch (page) {
      case "search":
        fetchCurrent(page);
        break;
      case "filter":
        fetchCurrent(page);
        break;
      default:
        fetchTotal(pageNum);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Sidebar>
        <SearchForm
          fetchTotal={fetchTotal}
        />
        <FilterBox />
        <ExcelBtn
          fetchTotal={fetchTotal}
        />
      </Sidebar>
      <Main>
        <AddForm />
        <TodoList />
        <Pagination />
      </Main>
    </ThemeProvider>
  );
};

export default App;
