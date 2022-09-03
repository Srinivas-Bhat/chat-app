import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from '../assets/logo.svg'
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { signupRoute } from "../Utils/APIRoutes";

const Signup = () => {
 const [text, setText] = useState({
  username: "",
  email: "",
  password: "",
  confirm_password: ""
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
    console.log(text);
    if(handleValidation()){
      console.log("in validation", signupRoute)
      const {username, password, email} = text;
      const {data} = await axios.post(signupRoute, {
        username,
        email,
        password,
      });
      if(data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if(data.status === true) {
        localStorage.setItem("chat-app user", JSON.stringify(data.user));
        Navigate("/login");
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
    if(password !== confirm_password) {
      toast.error("Password and Confirm Password should be same.", toastOptions); return false;
    }
    else if (username.length < 3) {
      toast.error("UserName should be greater than 3 characters", toastOptions); return false;
    }
    else if (password.length < 6) {
      toast.error("Password should be greater than 6 characters", toastOptions); return false;
    }
    else if (email === "") {
      toast.error("Email is required", toastOptions); return true;
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
          />
          <input
            type="email"
            placeholder="Enter Your Email"
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            name="password"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirm_password"
            onChange={handleChange}
          />
          <button type="submit" >Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login</Link>{" "}
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
export default Signup;
