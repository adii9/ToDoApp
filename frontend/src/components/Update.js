
import React from 'react';
import { useEffect, useState } from 'react'
import API from '../API';
import { useNavigate, useLocation } from 'react-router-dom';


function Update() {
    // const [APIData, setAPIData] = useState([])
    // const [title, setTitle] = useState('')
    // const [description, setDescription] = useState('')
    // const [status, setStatus] = useState('')
    const initialData = {
        id: null,
        title: '',
        description: '',
        status: ''
    }
    const [currentData, setCurrentData] = useState(initialData)
    const {state} = useLocation();
    const {index} = state

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

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <form onSubmit={onSubmit}>
                    <label>Task Title: </label>
                    <input
                        type='text'
                        required
                        placeholder='Title of Your Task'
                        value={currentData.title}
                        onChange={handleChange}
                        name='title'
                    >
                    </input>

                    <label>Description of the Task : </label>
                    <input
                        type='text'
                        required
                        placeholder='Describe your Task'
                        value={currentData.description}
                        onChange={handleChange}
                        name='description'
                    >
                    </input>

                    <label>Status: </label>
                    <select required value={currentData.status} onChange={handleChange} name='status'>
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