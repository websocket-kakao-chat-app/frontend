import React from 'react';
import { Input } from '@mui/base/Input';
import { Button } from '@mui/base/Button';
import './InputField.css';
const InputField = ({ message, setMessage, sendMessage }) => {
  const handleSendMessage = (event) => {
    event.preventDefault();
    // 메시지를 보낸 후 메시지 상태 초기화
    sendMessage(event);
    setMessage(''); // 메시지를 초기화하여 입력창을 비웁니다.
  };

  return (
    <div className='input-area'>
      <div className='plus-button'>+</div>
      <form onSubmit={handleSendMessage} className='input-container'>
        <Input
          placeholder='Type in here…'
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          multiline={false}
          rows={1}
        />

        <Button disabled={message === ''} type='submit' className='send-button'>
          전송
        </Button>
      </form>
    </div>
  );
};

export default InputField;
