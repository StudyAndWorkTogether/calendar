import React, {useState} from 'react'

const itemList = []

function App() {
  const [time, setTime] = useState('Time')
  const [description, setDescription] = useState('Description')

  const createItem = () => {
    const itemTime = time
    const itemDescription = description
    const formatData = {
      itemTime,
      itemDescription
    }
    itemList.push(formatData)
    localStorage.setItem('itemList', JSON.stringify(itemList))
  }

  const readItem = () => {
    const register = JSON.parse(localStorage.getItem('itemList'))
    console.log(register)
  }

  const updateItem = () => {
    console.log("Update Connected!!")
  }

  const deleteItem = () => {
    console.log("Delete Connected!!")
  }

  return (
    <div>
      <h1>Start Here!</h1>
        <form>
          <input type='text' name='time' id='time' placeholder='Time' onChange={(e) => {setTime(e.target.value)}}/>
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
            <tbody>
            </tbody>
          </table>
        </div>
    </div>
  );
}

export default App;
