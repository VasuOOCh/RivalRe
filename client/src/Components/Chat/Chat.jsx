import { useEffect, useRef, useState } from "react";
import "./chat.scss";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import Send from "@mui/icons-material/Send";
// import { useLocation } from "react-router-dom";

function Chat() {
  const [chat, setChat] = useState(true);
  const { currentUser } = useSelector((state) => state.user)
  const [myChatPeople, setMyChatPeople] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  //   const userData = useLocation();
  //   const queryUser = userData.search.split('=')[1] || null
  const chatRef = useRef()

  //   useEffect(() => {
  //     console.log(queryUser);
  //     if(queryUser) {
  //       async function getUser() {
  //         try {
  //          let {data} =  await axios.get('/api/users/' + queryUser)  
  //          setSelectedUser({username : data.username, avatar : data.avatar, userId : data._id})
  //         } catch (error) {
  //          console.log(error.response);
  //         }
  //        } 
  //        getUser()
  //     }

  //   }, [queryUser]);


  function sendMessage() {

    if (message == "") {
      alert('Enter a message')
      return
    }

    ws.send(JSON.stringify({
      sender: currentUser._id,
      reciever: selectedUser._id,
      text: message
    }));

    setMessages((prev) => [...prev, {
      sender: currentUser._id,
      reciever: selectedUser._id,
      text: message
    }]);

    axios.post('/messages/', {
      sender: currentUser._id,
      reciever: selectedUser._id,
      text: message
    })
    setMessage('');
    // console.log("message sent");
  }


  async function fetchMyPeople() {
    try {

      const { data: followingUsers } = await axios.get('/users/following?userId=' + currentUser._id);
      //   console.log(followingUsers);
      const { data: followersUsers } = await axios.get('/users/followers?userId=' + currentUser._id);
      //   console.log(followersUsers);

      const myPeople = [];
      followingUsers.forEach((followingUser) => {
        followersUsers.forEach((followersUser) => {
          if (followersUser._id == followingUser._id) {
            myPeople.push(followersUser)
          }
        })
      })

      setMyChatPeople([...myPeople]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMyPeople()
  }, [])

  useEffect(() => {
    // console.log(selectedUser);
    if (selectedUser) {
      connectWs()
    } else {
      if (ws) {
        ws.close()
      }
    }
    setMessages([])
    // console.log("fetching all messges");
    if (selectedUser) {
      axios.get('/messages/?userId=' + selectedUser._id)
        .then((resp) => {
          //   console.log(resp.data);
          setMessages((prev) => resp.data)
        })
        .catch((err) => {
          console.log(err);
        })
    }

  }, [selectedUser])

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  function connectWs() {
    const ws = new WebSocket('ws://localhost:3000'); // connects to ws
    setWs(ws) //saving ws to use it outside the function

    ws.addEventListener('open', () => {
      console.log("Connection established");
    })

    ws.addEventListener('message', (resp) => {
      // console.log("message recieved !");
      // console.log(JSON.parse(resp.data));
      const newMessage = (JSON.parse(resp.data));
      setMessages((prev) => [...prev, newMessage])
    })

    ws.addEventListener('error', (error) => {
      console.log("Error in websocket connection : ", error);
    })

    ws.addEventListener('close', (event) => {
      console.log('WebSocket connection closed:', event.code, event.reason);
      // console.log('Attempting to reconnect...');
      // setTimeout(connectWs, 3000);  // Try to reconnect after 3 seconds
    });

  }




  return (
    <div className="chat">
      <div className="messages">
        <div className="users">
          {
            myChatPeople.map((people) => (
              <div onClick={() => setSelectedUser(people)} key={people._id} className="user" >
                <img src={people.avatar} />
                {people.username}
              </div>
            ))
          }
        </div>
      </div>
      {selectedUser && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src={selectedUser.avatar}
              />
              {selectedUser.username}
            </div>
            <span className="close" onClick={() => setSelectedUser(null)}>X</span>
          </div>
          <div className="center" ref={chatRef}>
            {messages.map((message) => (
              <div key={message._id} className={message.sender == currentUser._id ? 'sender' : 'reciever'}>

                <div className="text">{message.text}</div>
                {message.createdAt && (
                  <div className="time">
                    <span>{message.createdAt.slice(0, 10)}</span>
                    <span>{message.createdAt.slice(11, 19)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="bottom">
            <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            <button onClick={sendMessage}>
              <Send />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
