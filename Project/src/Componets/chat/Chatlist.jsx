import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Chatlist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faCheck } from '@fortawesome/free-solid-svg-icons';
import instance from '../../axios';
import { useDispatch, useSelector } from 'react-redux';

function Chatlist() {
  const userInfoString = localStorage.getItem('userInfo');
  const { role } = useSelector((state) => state.auth);
  const userinfoo = JSON.parse(userInfoString);
  const userid = userinfoo.userInfo.id;
  const [selectedMember, setSelectedMember] = useState([]);
  const [message, setMessage] = useState('');
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [companyid, setCompanyId] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [socketOpen, setSocketOpen] = useState(false); // State to track WebSocket connection status
  const socketRef = useRef(null);
  const [isSocketOpen, setIsSocketOpen] = useState(false);
  
  // State to track unread messages
  const [unreadMessages, setUnreadMessages] = useState({});
  console.log(unreadMessages)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`chat/chatviewall/${userid}/`);
        setSelectedMember(null);
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

    // Set up the WebSocket connection
   
  }, [userid]);

  const showNotification = (title, body, senderId) => {
    if (Notification.permission === 'granted' && senderId !== userid) {
      new Notification(title, { body });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted' && senderId !== userid) {
          new Notification(title, { body });
        }
      });
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredMembers = members.users
    ? members.users.filter((member) =>
        member.username.toLowerCase().includes(searchValue.toLowerCase())
      )
    : [];

  const toggleMemberBox = async (username, memberImageUrl, companyId) => {
    if (selectedMember && selectedMember.username === username) {
      // Clear the image URL
    } else {
      try {
        const response = await instance.get(`chat/messages/${userid}/${companyId}/`);
        const socket = new WebSocket(`wss://theclimber.shop/ws/chat/${userid}/`);
        setSocket(socket);

        let fetchedMessages = response.data.payload;
        fetchedMessages.reverse();
        setMessages(fetchedMessages);
        socket.onopen = () => {
          console.log('WebSocket connection opened');
          setIsConnected(true);
        };

        socket.onmessage = (event) => {
          const receivedMessage = JSON.parse(event.data);
          const { content, sender, recipient, created_at } = receivedMessage.message;

          setMessages((prevMessages) => [...prevMessages, { content, sender, recipient, created_at }]);

          // Show a notification for new messages
          showNotification('New Message', content, sender);
          
          // Mark the sender's messages as unread
          if (selectedMember && selectedMember.id === sender) {
            setUnreadMessages((prevState) => ({
              ...prevState,
              [sender]: true,
            }));
          }
        };

        socket.onerror = (error) => {
          console.error('WebSocket error:', error.message);
        };
        socketRef.current = socket;

        let foundMember = null;
        for (let i = 0; i < members.users.length; i++) {
          const m = members.users[i];
          if (m.username === username) {
            foundMember = m;
            break;
          }
        }

        if (foundMember) {
          setSelectedMember(foundMember);
          setImageUrl(memberImageUrl);
          setCompanyId(companyId);

          // Mark the sender's messages as read when their box is opened
          setUnreadMessages((prevState) => ({
            ...prevState,
            [foundMember.id]: false,
          }));
        } else {
          console.error(`Member with username ${username} not found.`);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const handleSendClick = () => {
   
    if (socket && socket.readyState === WebSocket.OPEN) {
      if (message.trim() !== "") {
        socketRef.current.send(
          JSON.stringify({
            message: message,
            to: companyid,
            from: userid,
            event: "chat",
          })
        );

        setMessages((prevMessages) => [...prevMessages, { content: message, sender: userid, recipient: companyid }]);
        setMessage('');

        // Show a notification for sent messages
        showNotification('Sent Message', message, userid);
      } else {
        console.log("WebSocket is not connected. Message not sent.");
      }
    }
  };

  const [imageurl, setImageUrl] = useState('https://icon-library.com/images/user-icon-png-transparent/user-icon-png-transparent-10.jpg');

  return (
    <Container fluid className="full-page-container">
      <Row className="full-height-row no-gutters">
        {/* Left Square */}
        <Col md={3} sm={12} className="left-square border border-dark p-0 d-flex flex-column">
          <div className="top-border d-flex align-items-center">
            <div className="profile-pic-container rounded-circle">
              <img
                src="https://cutewallpaper.org/24/friends-icon-png/141308211.jpg"
                alt="Profile Pic"
                className="profile-pic"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
            <span className="ml-2">Chat List</span>
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="search mt-2 p-1 border border-dark rounded text-dark"
            value={searchValue}
            onChange={handleSearchInputChange}
          />

          {/* Rectangular box */}
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className={`rectangular-box bg-white border border-dark mt-2 d-flex align-items-center ml-5 ${selectedMember && selectedMember.id === member.id ? 'active' : ''} ${unreadMessages[member.id] ? 'unread' : ''}`}
              onClick={() => toggleMemberBox(member.username, member.image_url, member.id)}
            >
              <div className="profile-pic-container">
                <img
                  src={member.image_url}
                  alt={member.name}
                  className="circle-image rounded-circle"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                {unreadMessages[member.id] && <div className="unread"></div>} {/* Display the green dot for unread messages */}
              </div>
              {/* Member name */}
              <span className="ml-2">{member.username}</span>
            </div>
          ))}
        </Col>

        {/* Right Square */}
        <Col md={9} sm={12} className="right-square">
          {selectedMember && (
            <div className="chat-container">
              <div className="chat-box">
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
                      <h3 className="username">{selectedMember.username}</h3>
                    </div>
                  </div>
                </div>

                <div className="chat-content">
                  {messages.map((message, index) => (
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
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Chatlist;
