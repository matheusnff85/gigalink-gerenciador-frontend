import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Items() {
  const [items, setItems] = useState([]);

  async function getItems() {
    const apiData = await axios.get('http://localhost:3001/items').then((res) => res.data);
    return setItems(apiData);
  };

  useEffect(() => {
    getItems();
  }, []);
  return(
    <>
      <h1>Gerenciar Items</h1>
    </>
  );
}

export default Items;
