import React, { useState } from 'react';

const ReviewerInfoInput = ({ setNickname, setEmail }) => {
  const [emailMessage, setEmailMessage] = useState(false);
  const [nicknameMessage, setNicknameMessage] = useState(false);

  const onEmailEntry = (e) => {
    setEmailMessage(true);
    setEmail(e.target.value);
  };
  const onNicknameEntry = (e) => {
    setNicknameMessage(true);
    setNickname(e.target.value);
  };

  return (
    <>
    <h4>Nickname</h4>
    <input type='text' className='formContent' placeholder='Example: jackson11!' onChange={onNicknameEntry} required></input>
    {nicknameMessage && <div>For privacy reasons, do not use your full name or email address. </div>}
    <h4>Email</h4>
    <input type='email' className='formContent' placeholder='Example: jackson11@email.com' onChange={onEmailEntry} required></input>
    {emailMessage && <div>For authentication reasons, you will not be emailed. </div>}
    </>
  );
};

export default ReviewerInfoInput;