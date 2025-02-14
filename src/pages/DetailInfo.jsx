import React, { useContext, useEffect, useState } from 'react'
import { Button, Image } from '@chakra-ui/react'
import AppContext from '../context/AppContext';
import { useLocation } from 'react-router-dom';

export default function DetailInfo() {

  const location = useLocation();
  const {pos} = location.state || {};

  const [index,setIndex] = useState(0);

  useEffect(()=>{
    setIndex(pos || 0);
  },[]);

  const {posts} = useContext(AppContext);

  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-md-6 col-sm-12 mt-4 d-flex justify-content-center'>
                <Image
                    src={posts[index].image}
                    height={"450px"}
                    rounded={"lg"}
                    fit={"contain"}
                    alt="Green double couch with wooden legs"
                />
            </div>
            <div className='col-md-6 col-sm-12 mt-4 mb-2'>
                <h3>Address: {posts[index].address}</h3>
                <h5>Description: {posts[index].description}</h5>
                <Button variant={'subtle'} rounded={"md"} colorPalette={"black"} disabled={true} marginTop={"2%"}>Chat Now</Button>
            </div>
        </div>
    </div>
  )
}
