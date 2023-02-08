import React from 'react';
import { useEffect, useState } from 'react'
import API from '../API';

function Display() {
    const [APIData, setAPIData] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')
    const [message, setMessage] = useState('')

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

    return (
        <>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h1 style={{ color: '#7550C7' }}>To Do List</h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {APIData.length != 0 ?
                    <table style={{ width: '70%', border: '1px', borderColor: 'black', borderStyle: 'double' }}>
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
    )


}

export default Display;