import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import apiPath from '../apiPath';


export default function Addcategory() {

    var [cat, setCat] = useState('');
    var [err, setErr] = useState('');

    var navigate=useNavigate();

    var add = (ev) => {
        ev.preventDefault()
        

        if (cat == '') {
            setErr('Category Reguired')
        }
        else {
            fetch(apiPath +'add-category' , {
                method: "POST",
                headers: new Headers({'content-type': 'application/json'}),
                body: JSON.stringify(
                    {
                        name: cat
                    }
                )
            })
                .then(res => res.json())
                .then(result => {
                    console.log(cat);
                    setErr('Category Added')
                    navigate('/show-category')
                })
        }
    }

    var getCatValue = (ev) => {
        setCat(ev.target.value);
    }

    return (
        <div className='container text-center'>
            <h2>Addcategory</h2>
            <form onSubmit={add}>
                <input type="text" onChange={getCatValue} className='from-control' />
                <br /><br />
                {/* <input type="text" onChange={getCatValue} className='from-control' />
                <br /><br /> */}

                <button className='btn btn-warning'>Add Category</button>

                <p>{err}</p>
            </form>
        </div>
    )
}