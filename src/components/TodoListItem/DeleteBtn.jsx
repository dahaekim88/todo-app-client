import React from "react";
import styled from "styled-components";

const Column = styled.div`
  width: 10%;
`;

const Button = styled.div`
  cursor: pointer;
  width: 16px;
  height: 16px;
  &:before {
    font-family: "Font Awesome 5 Free";
    content: "\f2ed";
    position: absolute;
    right: 3%;
    color: #f5f8fa;
  }
  &:hover {
    &:before {
      color: #48aff0;
    }
  }
`
const DeleteBtn = () => {
  return (
    <Column>
      <Button />
    </Column>
  )
}

export default React.memo(DeleteBtn);
