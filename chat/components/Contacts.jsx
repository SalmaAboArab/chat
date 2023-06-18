import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../../assets/logo.png";
import Avatar from "../../assets/Avatar.png"


export default function Contacts({contacts,currentName,changeChat}){
    const [currentUserName,setCurrentUserName]=useState(undefined);
    const [currentUserImage,setCurrentUserImage]=useState(undefined);
    const [currentSelected,setCurrentSelected]=useState(undefined);
    useEffect(()=>{
        if(currentName){
            setCurrentUserImage(Avatar);
            setCurrentUserName(currentName)
        }
    },[currentName])
    const changeCurrentChat=(index,contact)=>{
       setCurrentSelected(index);
       changeChat(contact); 
    }
    return (
            <>
              {currentUserImage  && currentUserImage && (
                <Container>
                  <div className="brand">
                    {/* <img src={Logo} alt="logo" /> */}
                    <h3>Contacts</h3>
                  </div>
                  <div className="contacts">
                    {contacts.map((contact, index) => {
                      return (
                        <div
                          key={contact._id}
                          className={`contact ${
                            index === currentSelected ? "selected" : ""
                          }`}
                          onClick={() => changeCurrentChat(index, contact)}
                        >
                          <div className="avatar">
                            <img
                            src={`${contact.image}`}
                              alt="image"
                            />
                          </div>
                          <div className="username">
                            <h6>{contact.role === ('admin') ? "Admin" : contact.name}</h6>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="current-user">
                    <div className="avatar">
                      <img
                        src={`${Avatar}`}
                        alt="avatar"
                      />
                    </div>
                    <div className="username">
                      <h5>{currentUserName}</h5>
                    </div>
                  </div>
                </Container>
              )}
            </>
          );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 4rem;
    }
    h3 {
      color: white;
      // text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.5rem;
      &-thumb {
        // background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    ::-webkit-scrollbar-track {
        background: #212332;
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
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h6 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #89cff0;
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
      h5 {
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
