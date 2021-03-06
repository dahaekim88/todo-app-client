import React, { useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { API_URL } from "../../../.config";
import { store } from "../../store";

const Column = styled.div`
  width: 5%;
  @media screen and (max-width: 600px) {
    width: 10%;
  }
`;

const Container = styled.div`
  width: 24px;
  height: 24px;
  position: relative;
  border: 3px solid ${props => (props.checked ? props.theme.colors.darkblue : props.theme.colors.light)};
  border-radius: 6px;
  background-color: ${props => (props.checked ? props.theme.colors.darkblue : 'none')};
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  visibility: hidden;
`;

const Icon = styled.svg`
  fill: none;
  stroke: ${props => props.theme.colors.light};
  stroke-width: 3px;
`

const Label = styled.label`
  width: 18px;
  height: 18px;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
`;

const CustomCheckbox = ({ id, checked, subtask }) => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { pageNum } = state;
  const { page, queryString } = state.current;

  const updateComplete = async (id, checked) => {
    try {
      const result = await axios.patch(`${API_URL}/tasks/complete`, {
        id,
        is_completed: checked,
        pageNum,
        page,
        queryString,
      });
      const { tasks, totalCounts, count } = result.data;
      dispatch({
        type: "UPDATE_TODO",
        current: {
          count,
        },
        totalCounts,
        tasks,
      });
    } catch (err) {
      dispatch({ type: "ERROR", error: err });
    }
  }

  const handleChecked = async (e) => {
    const checked = e.target.checked;
    if (subtask.length) {
      const isAllCompleted = subtask.reduce((isCompleted, task) => {
        isCompleted = isCompleted && task.is_completed;
        return isCompleted;
      }, true);
      if (isAllCompleted) {
        updateComplete(id, checked);
      }
    } else {
      updateComplete(id, checked);
    }
  }

  return (
    <Column>
      <Container checked={checked}>
        <Checkbox id={`todo-${id}`} checked={checked} onChange={handleChecked} />
        <Label htmlFor={`todo-${id}`} checked={checked} >
          <Icon viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </Icon>
        </Label>
      </Container>
    </Column>
  )
}

export default CustomCheckbox;
