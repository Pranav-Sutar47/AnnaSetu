import React from 'react'
import { Button, Card, Image} from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom'

export default function CardComponent({item,index}) {

    const navigate = useNavigate();

    const showPage = () =>{
        navigate('/detailInfo',{state:{
          pos:index
        }});
    }

  return (
    <Card.Root variant={"elevated"} className='mb-2' height={'450px'}>
      <Image
        src={item.image}
        fit={"contain"}
        rounded={"md"}
        alt="Green double couch with wooden legs"
        height={'250px'}
      />
      <Card.Body gap="2">
        <Card.Title>{item.address}</Card.Title>
        <Card.Description>
          {item.description}
        </Card.Description>
      </Card.Body>
      <Card.Footer>
        <Button width={'full'} variant="ghost" colorPalette={'gray'} onClick={showPage}>Chat now</Button>
      </Card.Footer>
    </Card.Root>
  )
}
