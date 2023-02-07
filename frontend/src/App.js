import { useEffect, useState } from 'react'
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

function App() {

  const [APIData, setAPIData] = useState([])

  useEffect(() => {
    let ignore = false
    const fetchData = async () => {
      try {
        if (!ignore) {
          const response = await fetch('http://127.0.0.1:8000/ToDo/')
          console.log("Response Code from the API: ", response.status)

          if (!response.ok) {
            throw new Error("Error Status ", response.status)
          }

          const result = await response.json()
          setAPIData(result)
          console.log("Data Fetched Successfully")
        }
      }
      catch (err) {
        console.log(err)
      }
    }

    fetchData()

    return () => { ignore = true }

  }, [])

  console.log(APIData)

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ color: '#7550C7' }}>
          To Do List <Badge bg="primary">V 1.1</Badge>
        </h1>
      </div>

      <div style={{display:'flex', margin:60, marginLeft: 70}}>
        <Button style={{backgroundColor: '#2C39AB', color: 'white', fontWeight: 'bold'}} variant="primary">Add Task</Button>
      </div>

    </>
  );
}

export default App;
