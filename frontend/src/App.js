import { useEffect, useState } from 'react'
import API from './API';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import AddTask from './components/AddTask';
import Update from './components/Update';
import Display from './components/Display';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

function App() {

  const [APIData, setAPIData] = useState([])


  useEffect(() => {
    refreshData()
  }, [])

  console.log("Api Data -> ", APIData)

  const refreshData = async () => {
    await API.get('/')
      .then((res) => {
        setAPIData(res.data)
      })
      .catch(console.error)
  }




  return (

    <>
      <Router>
        <div className="App">
        <Navbar bg="primary" variant="dark">
          <Container>

            <Nav.Link href="/" style={{color: 'white'}}>To Do List</Nav.Link>
            <Nav.Link href="/addTask" style={{color: 'white'}}>Add New Task</Nav.Link>

          </Container>

        </Navbar>

          <Routes>
            <Route exact path='/addTask' element={< AddTask />}></Route>
            <Route exact path='/' element={< Display />}></Route>
          </Routes>
        </div>
      </Router>

    </>

  );
}

export default App;
