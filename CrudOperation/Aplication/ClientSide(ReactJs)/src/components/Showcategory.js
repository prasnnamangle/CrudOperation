import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import apiPath from '../apiPath';



export default function Showcategory() {

    var [apidata, setApidata] = useState([]);

    useEffect(() => {
        fetch(apiPath + 'show-category')
            .then(res => res.json())
            .then(result => {
                // console.log("data from Api");
                // console.log(result);
                setApidata(result);
            })
    }, [])

    return (
        <div className='container'>
            <h2 className='text-center'>Showcategory</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th>Edit</th>
                        <th>Delete</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        apidata && apidata.map(obj =>
                            <tr>
                                <td>{obj._id}</td>
                                <td>{obj.name}</td>
                                <td>
                                    <button className='btn btn-sm btn-success'>
                                        <Link to={"/edit-cat/" + obj._id}>Edit</Link>
                                    </button>
                                </td>
                                <td>
                                    <button className='btn btn-sm btn-danger'>
                                        <Link to={"/delete-cat/" + obj._id}>Delete</Link>
                                    </button>
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </table>
        </div>
    )
}