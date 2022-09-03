import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { BiPowerOff } from "react-icons/bi";

const Logout = () => {
  const Navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    Navigate("/login");
  };
  return (
    <Button onClick = {handleClick} >
      <BiPowerOff />
    </Button>
  );
};

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #9a86f3; 
    border: none;
    cursor: pointer;
    @media screen and (min-width: 320px) and (max-width: 375px) {
      padding: 0.3rem;
    }
        &:hover {
        background-color: orange;
        transition: 0.4s ease-in-out;
    }
        svg {
            font-size: 1.3rem;
            color: #ebe7ff;
        }
`;

export default Logout;
