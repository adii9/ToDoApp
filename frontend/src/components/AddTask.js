import { useEffect, useState } from 'react'
import React from 'react';
import API from '../API';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';


function About() {
    const [APIData, setAPIData] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState()
    const dropDownItems = ['In Progress', 'Not Completed', 'Completed', 'Not Started']
    const navigate = useNavigate()

    useEffect(() => {
        refreshData()
    }, [])

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
        console.log("Data to be saved -> ", title, description, status)
        let item = { title, description, status }
        API.post('/', item)
            .then(() => {
                setTitle('')
                setDescription('')
                setStatus('')
                refreshData()
                alert("Data Pushed Successfully")
                navigate('/', { replace: true });
            })
    }



    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h1 style={{ color: '#3D75E3' }}>To Do List</h1>
            </div>

            <Form style={{ margin: 20 }} onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Task Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Task Title" required value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Task Description</Form.Label>
                    <Form.Control type="text" placeholder="Describe your Work" required value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Label>Status</Form.Label>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {!status ? "Select the Status" : status}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {dropDownItems.map((item) => (
                                <Dropdown.Item onClick={() => setStatus(item)}>{item}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>


        </>
    )
}
export default About;