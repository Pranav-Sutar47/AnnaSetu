import React, { useState } from 'react'
import AppContext from './AppContext'
import axios from 'axios';

export default function AppState(props) {
  
    const [login,setLogin] = useState(false);

    const [posts,setPosts] = useState([]);

    const [userPosts,setUserPosts] = useState([]);

    const getAllPost = async()=>{
        try{
            let url = String(import.meta.env.VITE_URL) + 'api/v1//getAllPosts';
            const response = await axios.get(url);

            if(response.status)
                setPosts(response.data.data);
            else 
                setPosts([]);
        }catch(err){
            console.log('GetAppPost error',err);
        }
    }

    return (
        <AppContext.Provider value={{login,setLogin,posts,getAllPost,userPosts,setUserPosts}}>
            {props.children}
        </AppContext.Provider>
    )
}
