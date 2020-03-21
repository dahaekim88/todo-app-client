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
  border: 3px solid ${props => (props.checked ? '#137cbd' : '#f5f8fa')};
  border-radius: 6px;
  background-color: ${props => (props.checked ? '#137cbd' : 'none')};
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  visibility: hidden;
`;

const Icon = styled.svg`
  fill: none;
  stroke: #f5f8fa;
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

const CustomCheckbox = ({ id, checked, subtask, parent_id }) => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const updateComplete = async (id, checked) => {
    try {
      const result = await axios.patch(`${API_URL}/tasks/complete`, {
        id,
        is_completed: checked,
      });
      const { tasks, totalCounts } = result.data;
      dispatch({
        type: "UPDATE_TOTAL",
        totalCounts,
        tasks,
      });
    } catch (err) {
      console.log(err);
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
      if (parent_id !== null && !checked) {
        updateComplete(parent_id, checked);
        updateComplete(id, checked);
      } else {
        updateComplete(id, checked);
      }
    }
  }

  return (
    <Column>
      <Container checked={checked}>
        <Checkbox id={`todo-${id}`} defaultChecked={checked} onChange={handleChecked} />
        <Label htmlFor={`todo-${id}`} checked={checked} >
          <Icon viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </Icon>
        </Label>
      </Container>
    </Column>
  )
}

export default React.memo(CustomCheckbox);
