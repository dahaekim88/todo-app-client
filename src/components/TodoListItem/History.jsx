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
  background-color: ${props => props.theme.colors.darkest};

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

const Input = styled.input.attrs({
  type: "text",
})`
  width: 100px;
  padding: 1% 2%;
`;

const History = ({ id, createdDate, updatedDate, dueDate }) => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { pageNum } = state;
  const { page, queryString } = state.current;

  const updateDuedate = async (value) => {
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

  return (
    <Column>
      <DateContainer>작성일:
        <Input
          value={createdDate}
          disabled
        />
      </DateContainer>
      <DateContainer>수정일:
        <Input
          value={updatedDate}
          disabled
        />
      </DateContainer>
      <DateContainer className="bp3-dark">완료일: 
        {dueDate
          ?
          <DateInput 
            {...jsDateFormatter}
            value={new Date(dueDate)}
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

export default History;
