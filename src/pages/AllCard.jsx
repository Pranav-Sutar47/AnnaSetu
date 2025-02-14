import React, { useContext, useEffect } from 'react'
import CardComponent from './CardComponent'
import AppContext from '../context/AppContext'

export default function AllCard() {

    const {posts,getAllPost} = useContext(AppContext);

    useEffect(()=>{
        getAllPost();
    },[]);

  return (
    <div className='container-fluid'>
        <div className='row'>
            {
                posts.length > 0 ? 
                (
                    posts.map((item,index)=>{
                        return (
                            <div className='col-md-3 col-sm-12 mt-2' key={index}>
                                <CardComponent item={item} index={index}/>
                            </div>
                        )
                    })
                ):
                (
                    <h3 className='text-center'>No Posts Found...</h3>
                )
            }         
        </div>
    </div>
  )
}
