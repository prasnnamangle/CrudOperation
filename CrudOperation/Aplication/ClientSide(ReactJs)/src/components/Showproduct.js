import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import apiPath from '../apiPath';

export default function Showproduct() {

  var [apidata, setApidata] = useState([]);
  var [count, setCount] = useState(0);
  var [page, setPage] = useState(0);
  var [pagearr, setPagearr] = useState([]);
  var [perpage, setPerpage] = useState(10);


  useEffect(() => {
    fetch(apiPath + 'show-product')
      .then(res => res.json())
      .then(result => {
        // console.log("data from Api");
        var {ans_product,Procount} = result;

        console.log(Procount);
        setApidata(ans_product); 
        setCount(Procount)

        var totalPages=Math.ceil(Procount/perpage)

        setPage(totalPages);

        var arrPage = [];
        for(var i=1;i<=totalPages;i++){
          
          arrPage.push(i);
        }
        console.log(arrPage);
        setPagearr(arrPage)
      })
  }, [])

  function myfunc1(ev){
    ev.preventDefault();
    console.log(ev.target.attributes.for.value);
    var pageno = ev.target.attributes.for.value;
    console.log(perpage);

    var skipvalue = perpage * pageno - perpage;
    console.log(skipvalue , pageno);
  
    fetch(`${apiPath}show-product/${skipvalue}/${perpage}`)
    .then(res=>res.json())
    .then(ans=>{
      console.log("After Pagination");
      console.log(ans);
      var {ans_product,Procount} = ans;
      setApidata(ans_product)
    })
  }

  return (
    <div className='container text-center'>
      <h2>Showproduct</h2>
      
      <hr/>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Product Id</th>
            <th scope="col">Product Name</th>
            <th scope="col">Category Name</th>
            <th scope="col">Category Id</th>
            <th scope="col">Delete</th>
            <th scope="col">Edit</th>

          </tr>
        </thead>
        <tbody>
          {
            apidata && apidata.map((obj) =>
              <tr>
                <td>{obj.name}</td>
                <td>{obj._id}</td>
                <td>Category 1</td>
                <td>{obj.catid}</td>
                <td>
                  <button className='del-btn btn btn-sm btn-danger'>
                  <Link to={"/delete-pro/"+obj._id}>Delete</Link>
                  </button>
                </td>
                <td>
                  <button className='edit-btn btn btn-sm btn-info'>
                  <Link to={"/edit-pro/"+obj._id}>Edit</Link>
                  </button>
                </td>
              </tr>
            )
          }

        </tbody>
      </table>

      {
        pagearr && pagearr.length>0 && pagearr.map(val=>
          
          <div className='show-pro'>
            <button className='show-pro-btn btn btn-warning'>
              <a href='#' for={val} onClick={myfunc1}>Page {val}</a>
            </button>&nbsp;&nbsp;
          </div>
        )
      }
    </div>

  )
}