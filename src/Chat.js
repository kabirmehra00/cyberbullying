
import { TextField } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import UploadAndDisplayImage from "./ImageUploader";

const ChatPage = (props) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [fetching, setFetching] = useState(false);
    const [updatefetching, setUpdateFetching] = useState(false);
    const [delFetching, setDelFetching] = useState(false);
    const [lastFetchTime, setLastFetchTime] = useState(-1);
    const [imageData,  setImageData] = useState({Image: ""});


    const  TIMER_MS = 500;

    useEffect(() => {
        const interval = setInterval(() => {
            if(updatefetching === false){
                updateMessages();
            }
        }, TIMER_MS);
    
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [updatefetching, messages, lastFetchTime])

    async function updateMessages(){
        setUpdateFetching(true);
        try{
          const response = await fetch("http://127.0.0.1:5050/getUpdates", {
            mode : 'cors',
            'method' : 'POST',
            headers : {
              'Content-Type':'application/json',
              'Accept':'application/json'
            },
            body:JSON.stringify({lastFetch: lastFetchTime})
          })
          const jsonData = await response.json();
          setLastFetchTime(() => jsonData['UpdateTime']);
          setMessages((messages) => jsonData['Updates']);
          console.log(jsonData['Updates']);
          //console.log([...messages, ...jsonData['Updates']]);
        }catch(e){
          alert("Couldnt Update Function");
          console.log(e);
        }
        setUpdateFetching(false);
    }

    async function SendMessageFetch(){
        console.log(imageData['Image']);
        setFetching(true);
        try{
          const response = await fetch("http://127.0.0.1:5050/sendMessage", {
            mode : 'cors',
            'method' : 'POST',
            headers : {
              'Content-Type':'application/json',
              'Accept':'application/json'
            },
            body:JSON.stringify({UserName: props.userName, message : message, Image: imageData['Image']})
          })
          const jsonData = await response.json();
          const negativity = jsonData['Toxics'][2]['score']
          if(negativity > 0.6){
            alert("Be Nice :)");
          }
          console.log(jsonData);
        }catch(e){
            alert("Couldn't send Message");
          console.log(e);
        }
        setFetching(false);
      }

      async function deleteChatFetch(){
        setDelFetching(true);
        try{
          const response = await fetch("http://127.0.0.1:5050/deleteChat", {
            mode : 'cors',
            'method' : 'POST',
            headers : {
              'Content-Type':'application/json',
              'Accept':'application/json'
            },
            body:JSON.stringify({Title: "deletePlease"})
          })
          const jsonData = await response.json();
          console.log(jsonData);
        }catch(e){
            alert("Couldn't send Message");
          console.log(e);
        }
        setDelFetching(false);
      }

    const sendMessage = () => {
        if(fetching === false){
            SendMessageFetch();
        }
    };

    const deleteChat = () => {
        if(delFetching === false){
            deleteChatFetch();
            setMessages([]);
        }
    };

    return(
        <div className="ChatPage">
            <p>UserName: {props.userName}</p>
            <div className = "ChatPage-Messages">
                {messages.map((mess, index) => 
                    <div className = {index}>
                        {mess['Neg'] > 0.5 && <p>{mess['UserName']}: {mess['Better']} -- Changed</p> }
                        
                        {mess['Neg'] <= 0.5 && <p>{mess['UserName']}: {mess['message']}</p> }
                    </div>
                )}
            </div>
            <div className = "ChatPage-EnterMessage">
                <TextField value = {message} label = "Enter Message" onChange={(e) => {
                    setMessage(e.target.value);
                }}/>
                <button onClick={() => sendMessage()}>Send</button>
                <button onClick={() => deleteChat()}>Delete</button>
            </div>
            <UploadAndDisplayImage setImageData = {setImageData}/>
        </div>
    )
}

export default ChatPage;