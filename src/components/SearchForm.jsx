import React, { useState } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledInput = styled.input.attrs({ type: "search" })`
  width: 100%;
  position: relative;
  background-color: rgba(16,22,26,.3) !important;
  border-radius: 6px;
  &:focus {
    box-shadow: 0 0 0 1px #137cbd, 
      0 0 0 1px #137cbd, 
      0 0 0 3px rgba(19,124,189,.3);
  }
`;

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <StyledForm onSubmit={(e) => e.preventDefault()}>
      <StyledInput
        name="todo"
        placeholder="search..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </StyledForm>
  )
}

export default React.memo(SearchForm);
