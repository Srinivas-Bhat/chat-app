import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";

const Contact = ({ contacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    // console.log(contacts);
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h3>Snappy</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => (
              <div
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                key={index}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt="avatar"
                  />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

// border: 1px solid orange;

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  // border: 1px solid orange;
  background-color: #080420;
  @media screen and (min-width: 320px) and (max-width: 375px) {
    display: grid;
    width: 70px;
    grid-template-rows: 10% 77% 13%;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center; 
    @media screen and (min-width: 320px) and (max-width: 375px) {
      flex-direction: column;
      align-items: flex-start;
      padding-left: 10px;
      gap: 5px;
    }
    img {
      height: 2rem;
      @media screen and (min-width: 320px) and (max-width: 375px) {
        height: 1.4rem;
      }
    }
    h3 {
      color: white;
      text-transform: uppercase;
      @media screen and (min-width: 320px) and (max-width: 375px) {
        font-size: 12px;
        text-align: left;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      @media screen and (min-width: 320px) and (max-width: 375px) {
        flex-direction: column;
        gap: 0.7rem;
        width: 100%;
        border: 1px solid orange;
      }
      .avatar {
        img {
          height: 3rem;
          @media screen and (min-width: 320px) and (max-width: 375px) {
            height: 2.4rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
      .username {
        h3 {
          color: white;
          @media screen and (min-width: 320px) and (max-width: 375px) {
            font-size: 14px;
          }
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Contact;
