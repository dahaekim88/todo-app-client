import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Message } from "../styled";
import axios from "axios";
import { API_URL } from "../../../.config";
import { store } from "../../store";
import useForm from "../../hooks/useForm";

const Container = styled.div`
  margin-top: 1%;
`;

const SubtaskTitle = styled.span`
  margin-left: 1%;
  font-size: 0.8em;
`;

const SubtaskInput = styled.input.attrs({
  type: "text",
})`
  font-size: 0.8em !important;
  color: #a7b6c2;
  border: none;
  outline: none;
  border-bottom: 1px solid #137cbd !important;
  display: block;
  margin-left: 1%;
  padding: 1%;
  width: 100px;
  &.error {
    border-bottom: 1px solid #f5498b !important;
  }
`;

const SubtaskBtn = styled.input.attrs({
  type: "button",
})`
  margin-left: 1%;
  color: #c274c2;
  background-color: rgba(16,22,26,.3);
  padding: 1%;
  outline: none;
  border: none;
  border-radius: 6px;
  @media screen and (max-width: 600px) {
    padding: 3%;
  }
`;

const Subtask = ({ id, subtask }) => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { pageNum } = state;
  const [button, setButton] = useState("참조항목 추가");
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    resetError();
    button === "X" ? setButton("참조항목 추가") : setButton("X");
  }

  const emptySearchInput = () => {
    dispatch({
      type: "SEARCH",
      searchQuery: "",
    });
  }

  const addSubtask = async () => {
    emptySearchInput();
    try {
      const result = await axios.post(`${API_URL}/tasks/sub`, {
        title: value,
        parent_id: id,
        pageNum,
      });
      const { count, totalCounts, tasks } = result.data;
      dispatch({
        type: "ADD_TODO",
        current: {
          count,
        },
        totalCounts,
        tasks,
      })
      resetInput();
      toggleEditing();
    } catch (err) {
      dispatch({ type: "ERROR", error: err });
    }
  }

  const { value, error, inputRef, resetInput, resetError, handleChange, handleKeyPress } = useForm(addSubtask);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <Container>
      {subtask && subtask.map((task) => {
        return (
          <SubtaskTitle key={`subtask-${task.title}`}>@{task.title}</SubtaskTitle>
        )
      })}
      {isEditing && <SubtaskInput
        ref={inputRef}
        className={error ? "error" : ""}
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        autoComplete="off"
      />}
      <SubtaskBtn
        value={button}
        onClick={toggleEditing}
      />
      { !!error ? <Message className="font-small">{error}</Message> : null }
    </Container>
  )
}

export default React.memo(Subtask);
