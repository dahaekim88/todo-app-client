import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 30%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.colors.dark};
  overflow-x: hidden;
  padding: 4% 2%;

  @media screen and (max-width: 768px) {
    width: 100%;
    position: inherit;
  }
`;

const Sidebar = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

export default Sidebar;
