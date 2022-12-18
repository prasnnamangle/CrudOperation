
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import apiPath from '../apiPath';

export default function Addproduct() {

  var x1 = useRef();
  var x2 = useRef();

  var navigate = useNavigate();

  var [apidata, setApidata] = useState([]);

  useEffect(() => {
    fetch(apiPath + 'show-category')
      .then(res => res.json())
      .then(result => {
        
        setApidata(result);
      })
  }, [])

  var add = () => {
    var categoryid = x1.current.value;
    var proname = x2.current.value;
    

    if (categoryid != "" && proname != "") {
      fetch(apiPath + 'add-product', {
        method: "POST",
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(
          {
            name: proname,
            catid: categoryid
          }
        )
      })
        .then(res => res.json())
        .then(result => {
          console.log(result);

          navigate('/show-product')
        })
    }
    else {
      alert('values Required')
    }
  }

  return (
    <div className='container text-center'>
      <h2>Addproduct</h2>

      <form className='form'>
        <select className=' text-center' ref={x1}>
          <option value="">Please Select Category</option>
          {
            apidata && apidata.map(obj =>
              <option value={obj._id}>{obj.name}</option>
            )
          }
        </select>
        <br />
        <input type="text" className='' ref={x2} />
        <br />

        <button onClick={add} className='btn btn-warning'>Add Product</button>
      </form>
    </div>
  )
}