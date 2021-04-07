import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import dayjs from 'dayjs'

function App() {
  const [itemList, setItemList] = useState(JSON.parse(localStorage.getItem('itemList')))
  const [time, setTime] = useState('')
  const [description, setDescription] = useState('')
  
  // to avoid error to push data to itemList if it's null when no any data in localStorage
  if(itemList === null) {
    setItemList([])
  }

  const createItem = () => {
    if (description === '') {
      console.log('Please Enter Your Decription...')
      return
    }
    const inputID = nanoid(11)
    const inputTime = time
    const inputDescription = description
    const formatData = {
      inputID,
      inputTime,
      inputDescription
    };
    itemList.push(formatData)
    localStorage.setItem('itemList', JSON.stringify(itemList))
    // setItemList(itemList)
  }

  const readItem = () => {
    // itemList.push(JSON.parse(localStorage.getItem('itemList')))
    // document.getElementById('item-list').innerHTML = register

    console.log(itemList)
  }

  return (
    <div>
      <h1>Follow Your Plan!!</h1>
      <form>
        <input type="datetime-local" id="time"
        name="time"
        min="1900-01-01T00:00"
        max="2200-12-31T00:00"
        onChange={(e) => setTime(dayjs(e.target.value).toISOString())}
        />
        <input type='text' id='description'
        name='description'
        placeholder='Description'
        onChange={(e) => setDescription(e.target.value)}
        />
      </form>
      <div className='button'>
        <button onClick={createItem}>Create Item</button>
        <button onClick={readItem}>Read Item</button>
      </div>
      <div className='table-wrapper'>
        <table className='table'>
          <thead>
            <tr>
              <th>Time</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody id='item-list'>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
