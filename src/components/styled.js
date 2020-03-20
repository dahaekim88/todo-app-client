import { createGlobalStyle } from "styled-components";

const dark = "#30404d";
const light = "#f5f8fa";

export const GlobalStyles = createGlobalStyle`
  * { 
    box-sizing: border-box;
    margin:0;
    padding: 0; 
  }

  body {
    background-color: ${dark};
    color: ${light};
  }

  div#root {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content;
  }
`;