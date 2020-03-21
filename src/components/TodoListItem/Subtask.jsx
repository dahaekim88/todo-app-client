import React, { useContext, useState, useEffect, useRef } from "react";
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
  margin-left: 2%;
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
  margin-left: 2%;
  padding: 1% 2% !important;
  width: 100px;
  &::placeholder {
    text-decoration: underline;
  }
`;

const SubtaskBtn = styled.input.attrs({
  type: "button",
})`
  margin-left: 2%;
  color: #c274c2;
  background-color: rgba(16,22,26,.3);
  padding: 1%;
  outline: none;
  border: none;
  border-radius: 6px;
`;

const Subtask = ({ id, subtask }) => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { pageNum } = state;
  const [button, setButton] = useState("참조항목 추가");
  const [isEditing, setEditing] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const toggleEditing = () => {
    setEditing(!isEditing);
    resetError();
    button === "X" ? setButton("참조항목 추가") : setButton("X");
  };

  const addSubtask = async () => {
    try {
      const result = await axios.post(`${API_URL}/tasks/sub`, {
        title: value,
        parent_id: id,
        pageNum,
      });
      const { count, totalCounts, tasks } = result.data;
      dispatch({
        type: "UPDATE_TOTAL",
        current: {
          count,
        },
        totalCounts,
        tasks,
      })
      resetInput();
      toggleEditing();
    } catch (err) {
      console.log(err);
    }
  }

  const { value, error, resetInput, resetError, handleChange, handleKeyUp } = useForm(addSubtask);

  return (
    <Container>
      {subtask && subtask.map((task) => {
        return (
          <SubtaskTitle key={`subtask-${task.title}`}>@{task.title}</SubtaskTitle>
        )
      })}
      {isEditing && <SubtaskInput
        value={value}
        ref={inputRef}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />}
      <SubtaskBtn
        value={button}
        onClick={() => {
          toggleEditing();
        }}
      />
      { !!error ? <Message>{error}</Message> : null }
    </Container>
  )
}

export default React.memo(Subtask);
