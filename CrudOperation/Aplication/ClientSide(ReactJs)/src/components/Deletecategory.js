import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apiPath from '../apiPath';



export default function Deletecategory() {
    var {id} = useParams();
    var navigate=useNavigate();

    useEffect(()=>{
        fetch(apiPath+'delete-category/'+id , {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(result => {
                console.log("delete route");
                console.log(result);
                if(result['msg']){
                    navigate('/show-category');
                }

            })
    },[])

  return (
    <></>
  )
}