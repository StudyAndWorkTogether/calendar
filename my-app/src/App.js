import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import moment from 'moment'


function App() {
  const localizer = momentLocalizer(moment)
  const [itemList, setItemList] = useState([])
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

  const handleDescription = (e, i) => {
    itemList[i].inputDescription = e.target.value
    setItemList(() => [...itemList])
  }

  const handleTime = (e, i) => {
    itemList[i].inputTime = moment(e.target.value).toISOString()
    setItemList(() => [...itemList])
  }

  const updateItem = (i) => {
    if(itemList[i].inputDescription === '') {
      console.log('Please Enter Your Decription...')
      return
    }
    if (itemList[i].inputTime === '') {
      console.log('Please Choose Your Time...')
      return
    }
    itemList.sort((a, b) => {
      return (a.inputTime < b.inputTime) ? -1 : ((a.inputTime > b.inputTime) ? 1 : 0)
    })
    setItemList(() => [...itemList])
    localStorage.setItem('itemList', JSON.stringify(itemList))
  }

  const deleteItem = (i) => {
    itemList.splice(i, 1)
    setItemList(() => [...itemList])
    localStorage.setItem('itemList', JSON.stringify(itemList))
  }

  const eventsList = itemList.map((item) => {
    return {
      id: item.inputID,
      title: item.inputDescription,
      start: moment(item.inputTime).format(),
      end: moment(item.inputTime).format()
    }
  })

  const MyCalendar = props => (
    <div>
      <Calendar
        localizer={localizer}
        events={eventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  )

  useEffect(() => {
    const storageList = JSON.parse(localStorage.getItem('itemList'))
    if(storageList !== null) {
      setItemList([...storageList])
    }
  },[])

  return (
    <div>
      <h1>Follow Your Plan!!</h1>
      <form>
        <input type="datetime-local" id="time"
        name="time"
        min="1900-01-01T00:00"
        max="2200-12-31T00:00"
        onChange={(e) => setTime(moment(e.target.value).toISOString())}
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
                    value={moment(item.inputTime).format('YYYY-MM-DDTHH:mm:ss')}
                    onChange={(e) => handleTime(e, i)}
                  />
                </td>
                <td>
                  <input type='text'
                    name='itemDescription'
                    value={item.inputDescription}
                    onChange={(e) => handleDescription(e, i)}
                  />
                </td>
                <td><button onClick={() => updateItem(i)}>Update</button></td>
                <td><button onClick={() => deleteItem(i)}>Delete</button></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <MyCalendar/>
    </div>
  );
}

export default App;
