import React, { useContext } from "react";
import styled from "styled-components";
import TodoItem from "./TodoListItem";
import { store } from "../store";

const Message = styled.div`
  text-align: center;
  margin: 10%;
`;

const TodoList = () => {
  const globalState = useContext(store);
  const { state } = globalState;
  const { tasks } = state;

  return (
    <>
      {!!tasks.length
        ?
        tasks.map((task) => {
          return (
            <TodoItem
              key={`todo-${task.id}`}
              task={task}
            />
          )
        })
        :
        <Message>No results...</Message>
      }
    </>
  )
}

export default TodoList;
