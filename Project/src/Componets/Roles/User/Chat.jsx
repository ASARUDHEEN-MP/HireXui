import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import instance from '../../../axios';
function Chat() {
  const userInfoString = localStorage.getItem('userInfo');
  const userinfoo = JSON.parse(userInfoString);
  const userid = userinfoo.userInfo.id;
  const location = useLocation();
  const { state } = location;
  const companyid = state ? state.Companyid : null;
  const username = state ? state.username : null;
  const imageurl = state ? state.imageurl : null;
  const [socket ,setSocket] = useState(null)
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [SendMessage, setSendMessage] = useState("");
  const socketRef = useRef(null);
  console.log(messages)
  useEffect(() => {
    // Define the WebSocket URL for your Django Channels consumer
    const socket = new WebSocket(`wss://theclimber.shop/ws/chat/${userid}/`);
    setSocket(socket)
    // WebSocket event listeners
    socket.onopen = () => {
      console.log('WebSocket connection opened');
      // You can add any logic here when the connection is opened
    };
   
    socket.onmessage = (event) => {
      // Handle incoming WebSocket messages here
      const receivedMessage = JSON.parse(event.data);
      // Update your chat UI to display the received message
      setMessages([...messages, receivedMessage]);
    };
  
    socket.onclose = (event) => {
      if (event.wasClean) {
        console.log('WebSocket connection closed cleanly, code=' + event.code + ', reason=' + event.reason);
      } else {
        console.error('WebSocket connection died');
      }
      // You can add any cleanup logic here
    };
  
    socket.onerror = (error) => {
      console.error('WebSocket error:', error.message);
      // Handle WebSocket errors here
    };
  
    // Save the WebSocket instance in the ref
    socketRef.current = socket;
  
    // Cleanup function to close the WebSocket when the component unmounts
    return () => {
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.close();
      }
    };
  }, []);
  useEffect(() => {
    fetchChatMessages();
  }, []);
  const fetchChatMessages = async () => {
 
    try {
      const response = await instance.get(`chat/messages/${userid}/${companyid}/`);
      console.log(response.data)
      console.log("chat message response", response.data.payload);

      setMessages(response.data.payload);
    } catch (error) {
      console.log(error);
    }
  };
  

//   send message

  const handleSendClick = () => {
    if (socket.readyState === WebSocket.OPEN) {
        if (message.trim() !== "") {
            console.log(socket.readyState,'socket state')
            console.log(message)
            socketRef.current.send(
                JSON.stringify({
                  message: message,
                  to: companyid,
                  from: userid,
                  event: "chat",
                })
              );
              
              setMessages((Prevmessages) => [
                ...Prevmessages,
                { content:message, sender:userid, recipient:companyid ,type:'send'},
              ]);
              setMessage('');

        }else {
            console.log("WebSocket is not connected. Message not sent.");
          }
    }
    // Send a message to the WebSocket server
    // socketRef.current.send(JSON.stringify({ message, username, roomName }));
    // setMessage(''); // Clear the input field after sending
  };
  
 
  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="separator"></div>
        <div className="chat-header">
          <div className="profile-container">
            <div className="profile-circle">
              <img
                src={imageurl}
                alt="Profile"
                className="profile-image"
              />
            </div>
            <div className="username-container">
              <h3 className="username">{username}</h3>
            </div>
          </div>
        </div>
        <div className="chat-content">
                {messages.reverse().map((message, index) => (
                    <div
                    key={index}
                    className={`message ${message.sender === userid ? 'send' : 'received'}`}
                    >
                    {message.sender === userid && (
                        <FontAwesomeIcon icon={faCheck} className="checkmark" />
                    )}
                    {message.recipient === companyid && (
                        <>
                        {message.content}
                        <FontAwesomeIcon icon={faCheck} className="checkmark" />
                        </>
                    )}
                    {message.sender !== userid && message.recipient !== companyid && message.content}
                    </div>
                ))}
                </div>

        <div className="chat-input">
          <div className="input-container">
            <input
              type="text"
              placeholder="Type your message..."
              className="message-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ width: '80%' }}
            />
            <button className="send-button" onClick={handleSendClick}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
