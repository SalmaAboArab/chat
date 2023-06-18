import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, getUser,host } from "../../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";


export default function Chat(){
  const socket=useRef()
  const navigate = useNavigate();
  const [contacts,setContacts]=useState([]);
  const [currentUser,setCurrentUser]=useState(undefined)
  const [currentName,setCurrentName]=useState(undefined)
  const [currentId,setCurrentid]=useState(undefined)
  const [currentUserImage,setCurrentUserImage]=useState(undefined)
  const [currentChat,setCurrentChat] = useState(undefined)

  useEffect(()=>{
    if(localStorage.getItem("token")){
      setCurrentUser(localStorage.getItem("role"))
          setCurrentName(localStorage.getItem("userName"))
          setCurrentid(localStorage.getItem("res.data._id"))
    }
    else{
      navigate("/login");
    }
  },[])
  useEffect(()=>{
    if(localStorage.getItem("role")){
      socket.current=io(host);
      socket.current.emit("add-user",localStorage.getItem("res.data._id"))
    }
  },[localStorage.getItem("role")])
  useEffect(async()=>{
    if(localStorage.getItem("role")){
      console.log(localStorage.getItem("res.data._id"));
      const data = await axios.get(`${allUsersRoute}/${localStorage.getItem("role")}`);
      console.log({data:data.data.allUsers[3]});
      setContacts(data.data.allUsers);
    }
  },[localStorage.getItem("role")])
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }
  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentName={currentName} changeChat={handleChatChange}/>
        {
          currentChat ===undefined?(
            <Welcome currentName={currentName} />
          ):
          (
            <ChatContainer currentChat={currentChat} currentName={currentName} currentId={currentId} socket={socket}/>
          )

        }
      </div>
    </Container>
  )
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    // background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
