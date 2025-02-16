import AppContext from "../context/AppContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { showToast } from "./ToastComponent";
import CardComponent from "./CardComponent";
import Aos from "aos";

export default function UserPost() {
  const [load, setLoad] = useState(false);
  const [found, setFound] = useState(false);

  const { userPosts, setUserPosts } = useContext(AppContext);

  const getPost = async () => {
    try {
      setLoad(true);
      let url = String(import.meta.env.VITE_URL);
      url += "api/v1//getUserPosts";
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setUserPosts(response.data.data);
        setFound(true);
      } else {
        setFound(false);
      }
    } catch (err) {
      if (err.response) {
        // Server responded with a status code outside 2xx
        showToast(err.response.data.message || "Not Found", "error");
      } else {
        // Network or unknown error
        showToast("Something went wrong. Please try again.", "error");
      }
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

    useEffect(()=>{
      Aos.init({
        duration:500,
        delay:200
      });
    },[]);

  return (
    <div className="container-fluid">
      {load && <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh", 
      zIndex:9999
    }}
  >
    <Spinner size="lg" color={"teal"} />
  </div>}
      {!load && !found && <h1 className="text-center">No Posts found....</h1>}
      <div className="row" data-aos="fade-up">
        {
            userPosts.length > 0 ?
            <h1 className="text-center">Your Posts</h1>
            :
            <h1 className="text-center">You haven't Posted yet...</h1>
        }
            {!load && userPosts.length > 0 &&
          userPosts.map((post, index) => {
            return (
              <div className="col-md-3 col-sm-12 mt-2" key={index}>
                <CardComponent item={post} index={index} user={true}/>
              </div>
            );
          })}
      </div>
    </div>
  );
}
