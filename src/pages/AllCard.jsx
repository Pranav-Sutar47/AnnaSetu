import React, { useContext, useEffect } from "react";
import CardComponent from "./CardComponent";
import AppContext from "../context/AppContext";
import Aos from "aos";

export default function AllCard() {
  const { posts, getAllPost } = useContext(AppContext);

  useEffect(() => {
    getAllPost();
  }, []);

  useEffect(() => {
    Aos.init({
      duration: 500,
      delay: 200,
    });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row" data-aos="fade-up">
        {posts && posts.length > 0 ? (
          posts.map((item, index) => {
            return (
              <div
                className="col-lg-4 col-md-6 col-sm-12 mt-2"
                key={index}
                style={{ display: "flex", justifyContent: "center" }} // Center cards in small screens
              >
                <CardComponent item={item} index={index} />
              </div>
            );
          })
        ) : (
          <h3 className="text-center">No Posts Found...</h3>
        )}
      </div>
    </div>
  );
}
