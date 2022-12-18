import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apiPath from '../apiPath';

export default function Deletepro() {

    let {id} = useParams();
    let navigate = useNavigate()

    useEffect(()=>{
        fetch(apiPath + "delete-product/"+id , {
            method:"DELETE"
        })
        .then(res=>res.json())
        .then(ans=>{
            console.log("res from delete product route");
            console.log(ans);
            if(ans['msg']){
                navigate('/show-product');
            }
        }) 
    },[]);

  return (
    <></>
  )
}