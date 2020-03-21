import React, { useContext } from "react";
import styled from "styled-components";
import { store } from "../store";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #f5f8fa;
  font-size: 20px;
  padding: 4px 0;
`;

const PageNum = styled.div`
  padding: 0 16px;
  cursor: pointer;
  &.active {
    text-decoration: underline;
  }
  &:not(.active) {
    &:hover {
      color: #48aff0;
    }
  }
`;

const AngleDoubleLeft = styled.div`
  cursor: pointer;
  &:before {
    font-family: "Font Awesome 5 Free";
    content: "\f359";
    color: #f5f8fa;
  }
  &:hover {
    &:before {
      color: #48aff0;
    }
  }
`;

const AngleDoubleRight = styled.div`
  cursor: pointer;
  &:before {
    font-family: "Font Awesome 5 Free";
    content: "\f35a";
    color: #f5f8fa;
  }
  &:hover {
    &:before {
      color: #48aff0;
    }
  }
`;

const Pagination = ({ pageCount }) => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { current } = state;

  return (
    <Container>
      {!!current.count
        ?
        <>
          <AngleDoubleLeft
            onClick={() => dispatch({
              type: "PAGINATION",
              pageNum: 1,
            })}
          />
          <Container>
            {Array(pageCount)
              .fill(1)
              .map((v, i) => (
                <PageNum
                  key={i}
                  className={state.pageNum === i + 1 ? "active" : ""}
                  onClick={() => dispatch({
                    type: "PAGINATION",
                    pageNum: i + 1,
                  })}
                >
                  {i + 1}
                </PageNum>
              ))}
          </Container>
          <AngleDoubleRight
            onClick={() => dispatch({
              type: "PAGINATION",
              pageNum: pageCount,
            })}
          />
        </>
        :
        null
      }
    </Container>
  );
};

export default Pagination;
