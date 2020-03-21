import React, { useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { Message } from "./styled";
import { store } from "../store";
import { API_URL } from "../../.config";
import useForm from "../hooks/useForm";

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const StyledInput = styled.input.attrs({ type: "text" })`
  width: 80%;
  background-color: rgba(16,22,26,.3) !important;
  border-radius: 6px;
  &:focus {
    box-shadow: 0 0 0 1px #137cbd, 
      0 0 0 1px #137cbd, 
      0 0 0 3px rgba(19,124,189,.3);
  }
`;

const StyledSubmit = styled.input.attrs({
  type: "submit",
  value: "Add",
})`
  width: 18%;
  background-color: #394b59;
  background-image: linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0)) !important;
  color: #f5f8fa;
  border: none;
  border-radius: 6px;
  text-transform: uppercase;
  font-size: 1em;
  font-weight: 700;
  letter-spacing: 1px;
  &:hover {
    background-color: #30404d;
    color: #48aff0;
  }
`;

const AddForm = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const addTodo = async () => {
    try {
      const result = await axios.post(`${API_URL}/tasks`, {
        title: value,
      })
      const { tasks, totalCounts } = result.data;
      dispatch({
        type: "ADD_TODO",
        totalCounts,
        tasks,
      });
      resetInput();
    } catch (err) {
      dispatch({ type: "ERROR", error: err });
    }
  }

  const { value, error, resetInput, resetError, handleChange, handleKeyPress, handleSubmit } = useForm(addTodo);

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          name="todo"
          value={value}
          placeholder="todo item..."
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onFocus={resetError}
        />
        <StyledSubmit />
      </StyledForm>
      { !!error ? <Message>{error}</Message> : null }
    </>
  )
}

export default React.memo(AddForm);
