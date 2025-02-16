import React, { useContext, useState } from "react";
import { Badge, Button, Card, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import AppContext from "../context/AppContext";
import { showToast } from "./ToastComponent";
import { Tooltip } from 'react-tooltip'

export default function CardComponent({ item, index, user }) {
  const navigate = useNavigate();

  const { userPosts, setUserPosts } = useContext(AppContext);

  const showPage = () => {
    navigate("/detailInfo", {
      state: {
        pos: index,
      },
    });
  };

  const [load, setLoad] = useState(false);

  const deletePost = async () => {
    try {
      setLoad(true);
      let url = String(import.meta.env.VITE_URL);
      url += `api/v1/deletePost/${item._id}`;

      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        showToast(response.data.message, "success");
        const updatedFiles = userPosts.filter((post) => post._id !== item._id);
        setUserPosts(updatedFiles);
      } else {
        showToast(response.data.message, "error");
      }
      setLoad(false);


    } catch (err) {
      if (err.response) {
        // Server responded with a status code outside 2xx
        showToast(err.response.data.message || "Delete failed", "error");
      } else {
        // Network or unknown error
        showToast("Something went wrong. Please try again.", "error");
      }
    } finally {
      setLoad(false);
    }
  };

  return (
<Card.Root
  variant={"elevated"}
  className="mb-2"
  style={{
    width: "100%",
    minWidth: "300px", // Ensures it works on small screens
    maxWidth: "500px", // Prevents excessive stretching
    height: "450px", // Fixed height for all cards
    display: "flex",
    flexDirection: "column", // Ensures proper structure
  }}
>
  <div
    style={{
      position: "relative",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      cursor: "pointer",
    }}
  >
    {/* Badge positioned at the top-right corner */}
    {user && (
      <Badge
        variant="solid"
        colorPalette="blue"
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Delete Post"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1, // Keeps badge above the image
        }}
        onClick={deletePost}
      >
        {load ? <Spinner size="sm" /> : <MdDeleteOutline />}
        <Tooltip id="my-tooltip" />
      </Badge>
    )}

    {/* Image: Fixed height and responsive */}
    <Image
      src={item.image}
      fit="contain"
      rounded="md"
      alt="Item Image"
      style={{
        height: "200px"
      }}
    />
  </div>

  {/* Scrollable Card Body */}
  <Card.Body
    gap="2"
    style={{
      flexGrow: 1, // Allows the body to fill available space
      maxHeight: "180px", // Prevents body from growing too much
      overflowY: "auto", // Enables scrolling if content exceeds the height
      padding: "10px",
    }}
    className="card-body-scroll"
  >
    <Card.Title>{item.address}</Card.Title>
    <Card.Description>{item.description}</Card.Description>
  </Card.Body>

  {!user && (
    <Card.Footer style={{ marginTop: "auto" }}>
      <Button
        width={"full"}
        variant="ghost"
        rounded={5}
        colorPalette={"teal"}
        onClick={showPage}
      >
        Chat now
      </Button>
    </Card.Footer>
  )}
</Card.Root>



  );
}
