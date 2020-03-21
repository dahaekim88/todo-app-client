import React, { useEffect, useContext } from "react";
import axios from "axios";
import {
  GlobalStyles,
  Sidebar,
  Main,
  SearchForm,
  FilterBox,
  AddForm,
  TodoList,
} from "./components";
import { API_URL } from "../.config";
import { store } from './store';

const App = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  useEffect(() => {
    fetchTotal();
  }, [])

  const fetchTotal = async () => {
    const result = await axios.get(`${API_URL}/tasks`);
    const { tasks, totalCounts } = result.data;
    dispatch({
      type: "UPDATE_TOTAL",
      totalCounts,
      tasks,
    })
  }

  return (
    <>
      <GlobalStyles />
      <Sidebar>
        <SearchForm />
        <FilterBox />
      </Sidebar>
      <Main>
        <AddForm />
        <TodoList />
      </Main>
    </>
  );
};

export default App;
