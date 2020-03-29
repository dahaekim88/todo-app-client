import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { store } from "../store";
import { API_URL } from "../../.config";
import useDebounce from "../hooks/useDebounce";

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledInput = styled.input.attrs({ type: "search" })`
  width: 100%;
  position: relative;
  background-color: rgba(16,22,26,.3) !important;
  border-radius: 6px;
  padding: 2%;
  &:focus {
    box-shadow: 0 0 0 1px #137cbd, 
      0 0 0 1px #137cbd, 
      0 0 0 3px rgba(19,124,189,.3);
  }
`;

const SearchForm = ({ fetchTotal }) => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { searchQuery } = state;
  const { page } = state.current;

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const searchTodo = async (queryString) => {
    try {
      const result = await axios.get(`${API_URL}/tasks/search/${queryString}/1`);
      const { tasks, count } = result.data;
      dispatch({
        type: "UPDATE_CURRENT",
        pageNum: 1,
        current: {
          page: "search",
          count,
          queryString,
        },
        tasks,
      });
    } catch (err) {
      dispatch({ type: "ERROR", error: err });
    }
  }

  const isFirstRun = useRef(true);
  useEffect(
    () => {
      if (isFirstRun.current) {
        isFirstRun.current = false;
      } else {
        if (debouncedSearchQuery) {
          searchTodo(debouncedSearchQuery);
        } else {
          if (page === "search") {
            fetchTotal();
          }
        }
      }
    },
    [debouncedSearchQuery]
  );

  return (
    <StyledForm onSubmit={(e) => e.preventDefault()}>
      <StyledInput
        name="search"
        placeholder="search..."
        value={searchQuery}
        onChange={(e) => {
          dispatch({
            type: "SEARCH",
            searchQuery: e.target.value,
          });
        }}
        autoComplete="off"
      />
    </StyledForm>
  )
}

export default React.memo(SearchForm);
