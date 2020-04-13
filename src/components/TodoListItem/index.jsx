import React from "react";
import styled from "styled-components";
import CustomCheckbox from "./CustomCheckbox";
import Task from "./Task";
import History from "./History";
import DeleteBtn from "./DeleteBtn";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: no-wrap;
  border: none;
  border-radius: 8px;
  background-color: ${props => props.theme.colors.darkest};
  margin: 2% 0;
  padding: 1% 2%;
  position: relative;
  @media screen and (max-width: 600px) {
    padding: 4%;
  }
`;

const TodoItem = ({ task }) => {
  const { id, title, is_completed, due_date, created_date, updated_date, subtask } = task;

  return (
    <Container>
      <CustomCheckbox
        id={id}
        checked={is_completed ? true : false}
        subtask={subtask}
      />
      <Task
        id={id}
        title={title}
        isCompleted={is_completed}
        subtask={subtask}
      />
      <History
        id={id}
        createdDate={created_date}
        updatedDate={updated_date}
        dueDate={due_date}
      />
      <DeleteBtn
        id={id}
      />
    </Container>
  )
}

export default TodoItem;
