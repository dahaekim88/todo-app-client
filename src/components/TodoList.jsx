import React, { useContext } from "react";
import styled from "styled-components";
import TodoItem from "./TodoListItem";
import { store } from "../store";
import { Loader } from "./styled";

const Message = styled.div`
  text-align: center;
  margin: 10%;
  color: ${props => props.theme.colors.error}
`;

const TodoList = () => {
  const globalState = useContext(store);
  const { state } = globalState;
  const { tasks, loading, error } = state;

  return (
    <>
      {loading
        ?
        <Loader><div></div></Loader>
        :
        error 
          ?
          <Message>에러가 발생하였습니다.</Message>
          :
          !!tasks.length
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
