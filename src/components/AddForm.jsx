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
  padding: 2%;
  &:focus {
    box-shadow: ${props => props.theme.colors.shadowBlue};
  }
  &.error {
    box-shadow: ${props => props.theme.colors.shadowError};
  }
`;

const StyledSubmit = styled.input.attrs({
  type: "submit",
  value: "Add",
})`
  width: 18%;
  background-color: ${props => props.theme.colors.dark};
  background-image: linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0)) !important;
  color: ${props => props.theme.colors.light};
  border: none;
  border-radius: 6px;
  text-transform: uppercase;
  font-size: 1em;
  font-weight: 700;
  letter-spacing: 1px;
  &:hover {
    background-color: ${props => props.theme.colors.darker};
    color: ${props => props.theme.colors.blue};
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
      inputRef.current.focus();
    } catch (err) {
      dispatch({ type: "ERROR", error: err });
    }
  }

  const emptySearchInput = () => {
    dispatch({
      type: "SEARCH",
      searchQuery: "",
    });
  }

  const { value, error, inputRef, resetInput, handleChange, handleKeyPress, handleSubmit } = useForm(addTodo, emptySearchInput);

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          ref={inputRef}
          className={error ? "error" : ""}
          name="todo"
          value={value}
          placeholder="todo item..."
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          autoComplete="off"
        />
        <StyledSubmit />
      </StyledForm>
      {error && <Message>{error}</Message>}
    </>
  )
}

export default AddForm;
