import { useEffect, useState } from 'react'
import React from 'react';
import API from '../API';
import { useNavigate } from 'react-router-dom';

function About() {
    const [APIData, setAPIData] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')

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
export default About;