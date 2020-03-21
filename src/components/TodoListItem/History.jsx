import React, { useContext } from "react";
import styled from "styled-components";
import { DateInput } from "@blueprintjs/datetime";
import axios from "axios";
import { API_URL } from "../../../.config";
import { store } from "../../store";
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';

const jsDateFormatter = {
  formatDate(date) {
    return date.toLocaleDateString()
      .split('.')
      .filter((el) => el !== '')
      .map((el) => el.trim())
      .map((el) => el.length === 1 ? `0${el}` : el)
      .join('-');
  },
  parseDate: (str) => new Date(str),
  placeholder: 'YYYY-MM-YY',
};

const Column = styled.div`
  width: 30%;
  text-align: right;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const DateContainer = styled.div`
  font-size: 0.8em;
  background-color: #293742;

  @media screen and (max-width: 600px) {
    font-size: 0.5em;
  }

  .bp3-input {
    width: 100px;
    padding-right: 0 !important;
    padding: 5%;
    height: 23px;
    background-color: inherit;
    box-shadow: none;
    &::placeholder {
      color: #808080;
    }
  }
`;

const DueDateInput = styled.input.attrs({
  type: "text",
})`
  width: 100px;
`;

const History = ({ id, created_date, updated_date, due_date }) => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { pageNum } = state;
  const { page, queryString } = state.current;

  const updateDuedate = async(value) => {
    try {
      const result = await axios.patch(`${API_URL}/tasks/duedate`, {
        id,
        due_date: value,
        pageNum,
        page,
        queryString,
      });
      const { tasks, totalCounts, count } = result.data;
      dispatch({
        type: "UPDATE_TOTAL",
        current: {
          count,
        },
        totalCounts,
        tasks,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Column>
      <DateContainer>작성일:
        <DueDateInput
          defaultValue={created_date}
          disabled
        />
      </DateContainer>
      <DateContainer>수정일:
        <DueDateInput
          defaultValue={updated_date}
          disabled
        />
      </DateContainer>
      <DateContainer className="bp3-dark">완료일: 
        {due_date
          ?
          <DateInput 
            {...jsDateFormatter}
            defaultValue={new Date(due_date)}
            onChange={(e) => updateDuedate(jsDateFormatter.formatDate(e))}
          />
          :
          <DateInput 
            {...jsDateFormatter}
            onChange={(e) => updateDuedate(jsDateFormatter.formatDate(e))}
          />
        }
      </DateContainer>
    </Column>
  )
}

export default React.memo(History);
