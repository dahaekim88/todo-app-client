import React, { useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { store } from "../store";
import { API_URL } from "../../.config";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 4%;

  @media screen and (max-width: 470px) and (min-width: 769px)  {
    flex-wrap: no-wrap;
  }
`;

const Filter = styled.div`
  width: 48%;
  margin: 1% 0;
  padding: 4% 0;
  text-align: center;
  cursor: pointer;
  background-color: ${props => props.theme.colors.darkest};
  border-radius: 6px;
  &:hover, &.active {
    transform: scale(1.05);
    transition: transform 250ms ease-in-out;
  }
  @media screen and (max-width: 600px) {
    transform: scale(1);
  }
`;

const Label = styled.div`
  text-transform: uppercase;
  font-size: 0.8em;
  letter-spacing: 1px;
  color: ${props => props.theme.colors.grey};
`;

const Number = styled.div`
  padding-top: 1%;
  font-weight: 700;
  font-size: 1.5em;
  color: ${props => props.theme.colors.blue};
`;

const FilterBox = () => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { totalCounts } = state;
  const { page, queryString } = state.current;

  const filterTodos = async (queryString) => {
    try {
      const result = await axios.get(`${API_URL}/tasks/filter/${queryString}/1`);
      const { tasks, count } = result.data;
      dispatch({
        type: "UPDATE_CURRENT",
        pageNum: 1,
        current: {
          page: (queryString === "all") ? queryString : "filter",
          count,
          queryString,
        },
        tasks,
      });
    } catch (err) {
      dispatch({ type: "ERROR", error: err });
    }
  }

  const handleClick = (e) => {
    dispatch({
      type: "SEARCH",
      searchQuery: "",
    });
    const filterId = e.currentTarget.id;
    filterTodos(filterId);
  }

  return (
    <Container>
      <Filter
        id="all"
        className={page === "filter" && queryString === "all" ? "active" : ""}
        onClick={handleClick}
      >
        <Label>All</Label>
        <Number>{totalCounts.all}</Number>
      </Filter>
      <Filter
        id="today"
        className={page === "filter" && queryString === "today" ? "active" : ""}
        onClick={handleClick}
      >
        <Label>Due Today</Label>
        <Number>{totalCounts.today}</Number>
      </Filter>
      <Filter
        id="complete"
        className={page === "filter" && queryString === "complete" ? "active" : ""}
        onClick={handleClick}
      >
        <Label>Done</Label>
        <Number>{totalCounts.complete}</Number>
      </Filter>
      <Filter
        id="incomplete"
        className={page === "filter" && queryString === "incomplete" ? "active" : ""}
        onClick={handleClick}
      >
        <Label>To be done</Label>
        <Number>{totalCounts.incomplete}</Number>
      </Filter>
    </Container>
  )
}

export default FilterBox;
