import React from "react";
import styled from "styled-components";

const Column = styled.div`
  width: 5%;
  @media screen and (max-width: 600px) {
    width: 10%;
  }
`;

const Container = styled.div`
  width: 24px;
  height: 24px;
  position: relative;
  border: 3px solid ${props => (props.checked ? '#137cbd' : '#f5f8fa')};
  border-radius: 6px;
  background-color: ${props => (props.checked ? '#137cbd' : 'none')};
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  visibility: hidden;
`;

const Icon = styled.svg`
  fill: none;
  stroke: #f5f8fa;
  stroke-width: 3px;
`

const Label = styled.label`
  width: 18px;
  height: 18px;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
`;

const CustomCheckbox = ({ id, checked }) => {
  return (
    <Column>
      <Container checked={checked}>
        <Checkbox id={`todo-${id}`} defaultChecked={checked} />
        <Label htmlFor={`todo-${id}`} checked={checked} >
          <Icon viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </Icon>
        </Label>
      </Container>
    </Column>
  )
}

export default React.memo(CustomCheckbox);
