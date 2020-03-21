import React, { useContext, useState } from "react";
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
  background-color: #293742;
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
  color: #a7b6c2;
`;

const Number = styled.div`
  padding-top: 1%;
  font-weight: 700;
  font-size: 1.5em;
  color: #48aff0;
`;

const FilterBox = () => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { totalCounts } = state;
  const [active, setActive] = useState("");

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
    const filterId = e.currentTarget.id;
    setActive(filterId);
    filterTodos(filterId);
  }

  return (
    <Container>
      <Filter
        id="all"
        className={active === "all" ? "active" : ""}
        onClick={handleClick}
      >
        <Label>All</Label>
        <Number>{totalCounts.all}</Number>
      </Filter>
      <Filter
        id="today"
        className={active === "today" ? "active" : ""}
        onClick={handleClick}
      >
        <Label>Due Today</Label>
        <Number>{totalCounts.today}</Number>
      </Filter>
      <Filter
        id="complete"
        className={active === "complete" ? "active" : ""}
        onClick={handleClick}
      >
        <Label>Done</Label>
        <Number>{totalCounts.complete}</Number>
      </Filter>
      <Filter
        id="incomplete"
        className={active === "incomplete" ? "active" : ""}
        onClick={handleClick}
      >
        <Label>To be done</Label>
        <Number>{totalCounts.incomplete}</Number>
      </Filter>
    </Container>
  )
}

export default React.memo(FilterBox);
