import React, { useContext } from "react";
import styled from "styled-components";
import { store } from "../store";

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
  &:hover {
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
  const { state } = globalState;
  const { totalCounts } = state;

  return (
    <Container>
      <Filter>
        <Label>All</Label>
        <Number>{totalCounts.all}</Number>
      </Filter>
      <Filter>
        <Label>Due Today</Label>
        <Number>{totalCounts.today}</Number>
      </Filter>
      <Filter>
        <Label>Done</Label>
        <Number>{totalCounts.complete}</Number>
      </Filter>
      <Filter>
        <Label>To be done</Label>
        <Number>{totalCounts.incomplete}</Number>
      </Filter>
    </Container>
  )
}

export default React.memo(FilterBox);
