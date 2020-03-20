import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 80%;
  margin: 6% auto;
  border: 1px solid #dadada;
  padding: 4%;
  text-align: center;
`;

const Title = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-size: 2em;
  margin: 2% 0;
`;

const Layout = ({ children }) => {
  return (
    <>
      <Container>
      <Title>todo's</Title>
        {children}
      </Container>
    </>
  )
}

export default Layout;
