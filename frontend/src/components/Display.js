import React from 'react';
import { useEffect, useState } from 'react'
import API from '../API';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function Display() {
    const [APIData, setAPIData] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')
    const [message, setMessage] = useState('')

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

    const editTask = (index) => {

        navigate('/update', {state: {index: index}})
    }

    const deleteTask = (index) => {
        API.delete('/' + index + '/')
            .then(() => {
                alert("Task Deleted")
                refreshData()
            })
    }


    return (
        <>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h1 style={{ color: '#3D75E3' }}>To Do List</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                {APIData.length != 0 ?
                    <div>
                        {APIData.flatMap((item, index) => (
                            <Card key={index} style={{ width: '18rem', margin: 20}}>
                                <Card.Header>
                                    {item.status}
                                </Card.Header>
                                <Card.Title style={{margin: 10}}>
                                    {item.title}
                                </Card.Title>
                                <Card.Text style={{margin: 10}}>
                                    {item.description}
                                </Card.Text>
                                <Button variant="primary" onClick={() => editTask(item.id)} style={{margin: 10}}>Edit Task</Button>
                                <Button variant="danger" onClick={() => deleteTask(item.id)} style={{margin: 10}}>Delete Task</Button>
                            </Card>
                        ))}
                    </div>
                    :
                    <p>No Data To Display</p>
                }
            </div>
        </>
    )


}

export default Display;


// <table style={{ width: '70%', border: '1px', borderColor: 'black', borderStyle: 'double' }}>
                    //     <tr>
                    //         <th>Id</th>
                    //         <th>Title</th>
                    //         <th>Description</th>
                    //         <th>Status</th>
                    //     </tr>
                    //     {APIData.map((data) => (
                    //         <tr key={data.id}>
                    //             <td>{data.id}</td>
                    //             <td>{data.title}</td>
                    //             <td>{data.description}</td>
                    //             <td>{data.status}</td>
                    //         </tr>
                    //     ))}
                    // </table>