import React, {useState, useEffect} from 'react'

let itemID = 0
let itemList = []
let timeIsValid = false

function App() {
  const [time, setTime] = useState('')
  const [description, setDescription] = useState('')

  const createItem = () => {
    if (!timeIsValid) {
      console.log('Please enter a valid time!')
      return
    }
    if (description === '') {
      console.log('Please enter your decription...')
      return
    }
    const itemTime = time
    const itemDescription = description
    const formatData = {
        itemID,
        itemTime,
        itemDescription
    };
    itemID++
    itemList.push(formatData)
    localStorage.setItem('itemList', JSON.stringify(itemList))
  }

  const readItem = () => {
    itemList.push(JSON.parse(localStorage.getItem('itemList')))
    // document.getElementById('item-list').innerHTML = register
    console.log(itemList)
  }

  const updateItem = () => {
    console.log("Update Connected!!")
  }

  const deleteItem = () => {
    console.log("Delete Connected!!")
  }

  const timeValidation = (inputTime) => {
    const timeRegex = /^\d{2}\/\d{2}\/\d{4}$/ ;
    return timeRegex.test(inputTime)
  }

  useEffect(() => {
    if (time === '') {
      return
    }
    timeIsValid = timeValidation(time)
    console.log(timeIsValid)
  }, [time])

  return (
    <div>
      <h1>Start Here!</h1>
        <form>
          <input type='text' name='time' id='time' placeholder='MM/DD/YYYY' onChange={(e) => {setTime(e.target.value)}}/>
          <input type='text' name='description' id='description' placeholder='Description' onChange={(e) => {setDescription(e.target.value)}}/>
        </form>
        <div className='button'>
          <button onClick={createItem}>Create Item</button>
          <button onClick={readItem}>Read Item</button>
          <button onClick={updateItem}>Update Item</button>
          <button onClick={deleteItem}>Delete Item</button>
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
              <tr>
                 <td></td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  );
}

export default App;
