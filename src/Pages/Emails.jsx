import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Emails() {
  const [emails, setEmails] = useState([]);

  async function getEmails() {
    const apiData = await axios.get('http://localhost:3001/emails').then((res) => res.data);
    return setEmails(apiData);
  };

  useEffect(() => {
    getEmails();
  }, []);

  return(
    <>
      <h1>Gerenciar Emails</h1>
    </>
  );
}

export default Emails;
