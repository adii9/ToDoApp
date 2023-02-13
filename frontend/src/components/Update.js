
import React from 'react';
import { useEffect, useState } from 'react'
import API from '../API';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';



function Update() {

    const initialData = {
        id: null,
        title: '',
        description: '',
        status: ''
    }
    const [currentData, setCurrentData] = useState(initialData)
    const {state} = useLocation();
    const {index} = state
    const dropDownItems = ['In Progress', 'Not Completed', 'Completed', 'Not Started']

    console.log("State Value from Route is -> ", index)

    const navigate = useNavigate()

    useEffect(() => {
        fetchData(index)
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target
        setCurrentData({...currentData, [name]: value})
    }


    const onSubmit = (e) => {
        e.preventDefault()
        update(index)
    }

    const update = (id) => {
        console.log("Status Updated Data -> ", currentData.status)
        let data = {
            title: currentData.title,
            description: currentData.description,
            status: currentData.status
        }
        API.put('/' + id + '/', data)
            .then(() => {
                alert("Data Pushed Successfully")
                navigate('/');
            })
    }

    const fetchData = (id) => {
        API.get('/' + id)
            .then((res) => {
                setCurrentData({
                    id: res.data.id,
                    title: res.data.title,
                    description: res.data.description,
                    status: res.data.status
                })
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
                    <Form.Control name='title' type="text" placeholder="Enter Task Title" required value={currentData.title} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Task Description</Form.Label>
                    <Form.Control name='description' type="text" placeholder="Describe your Work" required value={currentData.description} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Label>Status</Form.Label>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {currentData.status}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {dropDownItems.map((item) => (
                                <Dropdown.Item onClick={() => setCurrentData({...currentData, status: item})}>{item}</Dropdown.Item>
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

export default Update;