import React from 'react'
import styled from "styled-components";
import Robot from "../assets/robot.gif";

const Welcome = ({currentUser}) => {
  return (
    <Container>
        <img src={Robot} alt="Robot" />
        <h1>Welcome, <span>{currentUser.username}</span></h1>
        <h1>Please select a chat to start messaging</h1>
    </Container>
  )
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
color: white;
@media screen and (min-width: 320px) and (max-width: 375px) {
  h1 {
   font-size: 16px;
   text-align: center;
  }
}
    img {
        height: 20rem;
        @media screen and (min-width: 320px) and (max-width: 375px) {
          height: 10rem;
        }
    }
span {
    color: #4e00ff;
}
`;

export default Welcome