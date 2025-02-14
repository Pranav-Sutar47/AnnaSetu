import React, { useContext, useEffect, useState } from 'react'
import AddPost from './AddPost'
import AppContext from '../context/AppContext';

export default function Post() {

  const {login} = useContext(AppContext);
  const [show,setShow] = useState(true);

  useEffect(()=>{
    if(localStorage.getItem('token')) 
        setShow(true);
    else  
        setShow(false); 
  },[login]);

  return (
    <div className='container-fluid mt-5'>
        {
          show ? <AddPost/> : <h1 className='text-center'>Login Requried</h1>
        }
    </div>
  )
}
