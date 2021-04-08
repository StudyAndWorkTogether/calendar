import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import dayjs from 'dayjs'

function App() {
  const storageList = JSON.parse(localStorage.getItem('itemList'))
  const itemList = useState(!storageList ? [] : storageList)
  const [listLength, setListLength] = useState(itemList.length)
  const [time, setTime] = useState('')
  const [description, setDescription] = useState('')
  console.log('fromApp', itemList)

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
    setListLength(itemList.push(formatData))
    localStorage.setItem('itemList', JSON.stringify(itemList))
    console.log(itemList)
  }

  useEffect(() => {
    console.log('fromUseEffect')
  }, [listLength])

  // const readItem = () => {
  //   itemList.push(JSON.parse(localStorage.getItem('itemList')))
  //   document.getElementById('item-list').innerHTML = register
  //   console.log('From readItem ---', itemList)
  //   setItemList(itemList)
  // }


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
        {/* <button onClick={readItem}>Read Item</button> */}
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
            {itemList.map((item) => 
              <tr key={item.inputID}>
                <td>{item.inputTime}</td>
                <td>{item.inputDescription}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
