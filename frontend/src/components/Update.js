
import React from 'react';
import { useEffect, useState } from 'react'
import API from '../API';
import { useNavigate, useLocation } from 'react-router-dom';


function Update() {
    const [APIData, setAPIData] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')
    const {state} = useLocation();
    const {index} = state

    console.log("State Value from Route is -> ", index)

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

    const fetchData = (id) => {
        API.get('/' + id)
            .then((res) => {
                console.log("Result for Specific Data -> ", res.data)
            })
    }

    fetchData(index)

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
            </div>
        </>
    )
}

export default Update;