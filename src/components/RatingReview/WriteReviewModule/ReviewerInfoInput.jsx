import React, { useState } from 'react';

const ReviewerInfoInput = () => {
  const [emailMessage, setEmailMessage] = useState(false);
  const [nicknameMessage, setNicknameMessage] = useState(false);

  const onEmailEntry = () => setEmailMessage(true);
  const onNicknameEntry = () => setNicknameMessage(true);

  return (
    <>
    <h4>Nickname</h4>
    <input type='text' placeholder='Example: jackson11!' onChange={onNicknameEntry} required></input>
    {nicknameMessage && <div>For privacy reasons, do not use your full name or email address. </div>}
    <h4>Email</h4>
    <input type='email' placeholder='Example: jackson11@email.com' onChange={onEmailEntry} required></input>
    {emailMessage && <div>For authentication reasons, you will not be emailed. </div>}
    </>
  );
};

export default ReviewerInfoInput;