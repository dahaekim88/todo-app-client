import React from "react";
import styled from "styled-components";

const Column = styled.div`
  width: 30%;
  text-align: right;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const Date = styled.div`
  font-size: 0.8em;

  @media screen and (max-width: 600px) {
    font-size: 0.5em;
  }
`;

const DueDateInput = styled.input.attrs({
  type: "text",
})`
  width: 80px;
  font-size: 0.8em !important;
  color: #808080;
  border-width: 0 0 1px;
  border-color: #808080;
  outline: none;
  display: block;
  padding: 2%;
  &:not(:disabled) {
    cursor: text;
  }
`;

const History = ({ created_date, updated_date, due_date }) => {
  return (
    <Column>
      <Date>작성일:
        <DueDateInput
          defaultValue={created_date}
          disabled
        />
      </Date>
      <Date>수정일:
        <DueDateInput
          defaultValue={updated_date}
          disabled
        />
      </Date>
      <Date>완료일: 
        <DueDateInput
          name="date"
          defaultValue={due_date}
          placeholder="YYYY-MM-DD"
        />
      </Date>
    </Column>
  )
}

export default React.memo(History);
