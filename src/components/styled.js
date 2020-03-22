import styled, { createGlobalStyle } from "styled-components";

const dark = "#30404d";
const darker = "#293742";
const light = "#f5f8fa";
const error = "#f5498b";

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
    width: 100%;
    min-height: 100%;
  }

  input[type=text], input[type=search] {
    display: inline-block;
    background: ${darker};
    color: ${light};
    font-size: 1em;
    outline: none;
    border: none;
    @media screen and (max-width: 600px) {
      padding: 4%;
    }
    &:focus {
      &::placeholder {
        color: transparent;
      }
    }
  }

  input[type=submit], input[type=checkbox], input[type=button] {
    cursor: pointer;
    -webkit-appearnce: none;
  }

  input[type=file] {
    display: none;
  }

  .bp3-dark {
    background-color: ${darker};
  }

  .excel-btn {
    width: 48%;
    margin: 1% 0;
    padding: 4% 0;
    text-align: center;
    cursor: pointer;
    background-color: #293742;
    border-radius: 6px;
    color: #a7b6c2;
    &:hover {
      transform: scale(1.05);
      transition: transform 250ms ease-in-out;
    }
    &:before {
      font-family: "Font Awesome 5 Free";
      content: "\f1c3";
      font-size: 1em;
      margin-right: 4%;
      color: #3dcc91;
    }
    @media screen and (max-width: 600px) {
      transform: scale(1);
    }
  }

  .text-right {
    text-align: right;
  }

  .font-small {
    font-size: 0.8em;
  }
`;

export const Message = styled.div`
  width: 100%;
  margin: 1% 0 0 2%;
  color: ${error};
  font-size: 1em;
  @media screen and (max-width: 600px) {
    font-size: 0.8em;
  }
`;

export const Loader = styled.div`
  display: flex;
  justify-content: center;
  margin: 20%;
  div {
    display: inline-block;
    width: 80px;
    height: 80px;
    &:after {
      content: "";
      display: block;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      border: 6px solid #fff;
      border-color: #fff transparent #fff transparent;
      animation: lds-dual-ring 1.2s linear infinite;
    }
    @keyframes lds-dual-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;