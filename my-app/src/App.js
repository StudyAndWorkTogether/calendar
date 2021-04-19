import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import dayjs from 'dayjs'

function App() {
  const storageList = JSON.parse(localStorage.getItem('itemList'))
  const [itemList, setItemList] = useState(!storageList ? [] : storageList)
  const [time, setTime] = useState('')
  const [description, setDescription] = useState('')


  const createItem = () => {
    if (description === '') {
      console.log('Please Enter Your Decription...')
      return
    }
    if (time === '') {
      console.log('Please Choose Your Time...')
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
    itemList.sort((a, b) => {
      return (a.inputTime < b.inputTime) ? -1 : ((a.inputTime > b.inputTime) ? 1 : 0)
    })
    setItemList(() => [...itemList])
    localStorage.setItem('itemList', JSON.stringify(itemList))
  }

  const updateItem = (e, i) => {
    console.log(e.target.value, i)
  }

  const deleteItem = (i) => {
    itemList.splice(i, 1)
    setItemList(() => [...itemList])
    localStorage.setItem('itemList', JSON.stringify(itemList))
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
            {itemList.map((item, i) =>
              <tr key={item.inputID}>
                <td>
                  <input type="datetime-local"
                    name="time"
                    min="1900-01-01T00:00"
                    max="2200-12-31T00:00"
                    value={dayjs(item.inputTime).format('YYYY-MM-DDTHH:mm:ss')}
                    onChange={e => setTime(dayjs(e.target.value).toISOString())}
                  />
                </td>
                <td>
                  <input type='text'
                    name='itemDescription'
                    value={item.inputDescription}
                    onChange={(e) => updateItem(e, i)}
                  />
                </td>
                <td><button onClick={createItem}>Update</button></td>
                <td><button onClick={() => deleteItem(i)}>Delete</button></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
