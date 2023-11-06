import { useEffect, useState } from 'react';
import './App.css';
import socket from './server';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InputField from './components/InputField/InputField';
import MessageContainer from './components/MessageContainer/MessageContainer';
import RoomListPage from './pages/RoomListPage/RoomListPage';
import ChatPage from './pages/Chatpage/Chatpage';

function App() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    askUserName();

    socket.on('message', (message) => {
      setMessageList((prevState) => prevState.concat(message));
    });

    socket.on('rooms', (res) => {
      setRooms(res);
    });
    console.log('rooms');
  }, []);

  const askUserName = () => {
    const userName = prompt('당신의 이름을 입력하세요');
    // console.log('uuu', userName);
    socket.emit('login', userName, (res) => {
      if (res?.ok) {
        setUser(res.data);
      } else {
        alert('이미 존재하는 닉네임입니다.');
        askUserName();
      }
      console.log('Res', res);
    });
  };

  // const sendMessage = (event) => {
  //   event.preventDefault();
  //   socket.emit('sendMessage', message, (res) => {
  //     console.log('sendMessage res', res);
  //   });
  // };

  // return (
  //   <div>
  //     <div className='App'>
  //       <MessageContainer messageList={messageList} user={user} />
  //       <InputField
  //         message={message}
  //         setMessage={setMessage}
  //         sendMessage={sendMessage}
  //       />
  //     </div>
  //   </div>
  // );

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<RoomListPage rooms={rooms} />} />
        <Route exact path='/room/:id' element={<ChatPage user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
