import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apiPath from '../apiPath';

export default function Editcategory() {

    var [name,setName] = useState('');
    let {id} = useParams();
    let navigate = useNavigate();

    useEffect(()=>{
        fetch(apiPath+'show-category/'+id)
        .then(res=>res.json())
        .then(val=>{
            console.log(val);
            var{_id,name} = val;
            setName(name);
        })
    },[])

    function updateRec(ev){
        ev.preventDefault();
        // console.log(name);
        var categoryName = name;

        fetch(apiPath+'update-category/'+id , {
            method:"PUT",
            headers: new Headers({'content-type': 'application/json'}),
                body: JSON.stringify(
                    {
                        name: categoryName
                    }
                )
        })
        .then(res=>res.json())
        .then(val=>{
            console.log(val);
            if(val['msg']){
                navigate('/show-category')
            }
        })
    }

  return (
    <div className='container'>
        <form onSubmit={updateRec}>
        <h2>Edit Category</h2>

        <input type="text" value={name} onChange={(ev)=>{setName(ev.target.value)}} className='form-control'/><br/>
        <button className='btn btn-warning'>Update</button>
        </form>
    </div>
  )
}