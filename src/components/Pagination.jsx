import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import { store } from "../store";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.colors.light};
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
      color: ${props => props.theme.colors.blue};
    }
  }
`;

const AngleDoubleLeft = styled.div`
  cursor: pointer;
  &:before {
    font-family: "Font Awesome 5 Free";
    content: "\f359";
    color: ${props => props.theme.colors.light};
  }
  &:hover {
    &:before {
      color: ${props => props.theme.colors.blue};
    }
  }
`;

const AngleDoubleRight = styled.div`
  cursor: pointer;
  &:before {
    font-family: "Font Awesome 5 Free";
    content: "\f35a";
    color: ${props => props.theme.colors.light};
  }
  &:hover {
    &:before {
      color: ${props => props.theme.colors.blue};
    }
  }
`;

const Pagination = () => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { pageNum } = state;
  const { count } = state.current;
  const pageCount = useMemo(() => Math.ceil(count / 5), [count]);

  return (
    <Container>
      {!!count
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
                  className={pageNum === i + 1 ? "active" : ""}
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
