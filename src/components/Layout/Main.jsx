import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 70%;
  margin-left: 30%;
  padding: 2% 4%;

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-left: 0;
  }
`;

const Title = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-size: 3em;
  margin: 2% 0;
`;

const Main = ({ children }) => {
  return (
    <Container>
      <Title>todo's</Title>
      {children}
    </Container>
  )
}

export default Main;
