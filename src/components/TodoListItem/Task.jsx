import React, { useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { Message } from "../styled";
import { API_URL } from "../../../.config";
import { store } from "../../store";
import useForm from "../../hooks/useForm";
import Subtask from "./Subtask";

const Column = styled.div`
  width: 50%;
  @media screen and (max-width: 600px) {
    margin-left: 4%;
  }
`;

const Title = styled.input.attrs({
  type: "text",
})`
  text-decoration: ${({ isCompleted }) => isCompleted ? "line-through" : "none"};
  margin-bottom: 2px;
  font-size: 1.2em !important;
  padding: 1%;
  width: 100%;
  &:focus {
    border-bottom: ${props => `1px solid ${props.theme.colors.darkblue}`};
  }
  &.error {
    border-bottom: ${props => `1px solid ${props.theme.colors.error}`};
  }
`;

const Task = ({ id, title, isCompleted, subtask }) => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { pageNum } = state;
  const { page, queryString } = state.current;

  const updateTodo = async () => {
    try {
      const result = await axios.patch(`${API_URL}/tasks`, {
        id,
        title: value,
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

  const { value, error, inputRef, handleChange, handleKeyPress } = useForm(updateTodo);

  return (
    <Column>
      <Title
        ref={inputRef}
        className={error ? "error" : ""}
        name="task"
        defaultValue={title}
        isCompleted={isCompleted}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        autoComplete="off"
      />
      {error && <Message className="font-small">{error}</Message>}
      <Subtask
        id={id}
        subtask={subtask}
      />
    </Column>
  )
}

export default Task;
