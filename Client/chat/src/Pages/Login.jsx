import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from '../assets/logo.svg'
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { loginRoute } from "../Utils/APIRoutes";

const Login = () => {
 const [text, setText] = useState({
  username: "",
  password: "",
 })
 const Navigate = useNavigate();
 
 useEffect(() => {
  if(localStorage.getItem("chat-app-user")){
    Navigate("/");
  }
 }, [])

 const toastOptions = {
  position: "bottom-right",
  autoClose: 6000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
}

  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(text);
    if(handleValidation()){
      console.log("in validation", loginRoute)
      const {username, password} = text;
      const {data} = await axios.post(loginRoute, {
        username,
        password,
      });
      if(data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if(data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        Navigate("/");
      }
    }
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setText({
      ...text,
      [name]: value
    });
  };

  const handleValidation = () => {
    const {username, password, confirm_password, email} = text;
    if(password === "") {
      toast.error("Email and Password is required.", toastOptions); return false;
    }
    else if (username.length === "") {
      toast.error("Email and Password is required.", toastOptions); return false;
    }
    return true;
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>snappy</h1>
          </div>
          <input
            type="text"
            placeholder="Enter Your UserName"
            name="username"
            onChange={handleChange}
            min = "3"
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            name="password"
            onChange={handleChange}
          />
          <button type="submit" >Log-In</button>
          <span>
            Don't have an account ? <Link to="/signup">SignUp</Link>{" "}
          </span>
        </form>
      </FormContainer>
      <ToastContainer/>
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
export default Login;
