import { useEffect, useState, button } from 'react'
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import API from './API';

function App() {

  const [APIData, setAPIData] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    refreshData()
  }, [])

  console.log("Api Data -> ", APIData)

  const refreshData = () => {
    API.get('/')
      .then((res) => {
        setAPIData(res.data)
      })
      .catch(console.error)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    addToDo(title, description, status)
  }


  const addToDo = (title, description, status) => {
    let item = { title, description, status }
    API.post('/', item)
      .then(() => {
        setTitle('')
        setDescription('')
        setStatus('')
        refreshData()
        alert("Data Pushed Successfully")
      })
  }


  return (

    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ color: '#7550C7' }}>To Do List</h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <form onSubmit={onSubmit}>
          <label>Task Title: </label>
          <input
            type='text'
            required
            placeholder='Title of Your Task'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          >
          </input>

          <label>Description of the Task : </label>
          <input
            type='text'
            required
            placeholder='Describe your Task'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          >
          </input>

          <label>Status: </label>
          <select required onChange={(e) => setStatus(e.target.value)} value={status}>
            <option defaultValue={true}>Select one from the List</option>
            <option value={"Completed"}>Completed</option>
            <option value={"Not Completed"}>Not Completed</option>
            <option value={"In Progress"}>In Progress</option>
          </select>

          <input type='submit' />
        </form>
        {message ? <p>{message}</p> : null}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: '#7550C7' }}>Data From API</h2>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {APIData.length != 0 ?
          <table style={{ width: '70%', border: '1px', borderColor: 'black', borderStyle: 'double'}}>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
          {APIData.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.title}</td>
              <td>{data.description}</td>
              <td>{data.status}</td>
            </tr>
          ))}
        </table> :
          <p>No Data To Display</p>
        }
      </div>

    </>

  );
}

export default App;
