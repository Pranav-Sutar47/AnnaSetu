import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useNavigate } from 'react-router-dom';
import { showToast } from './ToastComponent';
import AppContext from '../context/AppContext';
export default function NavBar(){

    const navigate = useNavigate();
    const {login,setLogin} = useContext(AppContext);

    useEffect(()=>{
        if(localStorage.length===0)
            setLogin(false);
        else    
            setLogin(true);
    },[login]);

    const logOut = () =>{
      localStorage.clear();
      setLogin(false);
      showToast('Logout Successful!','success');
    }

    return(
        <Navbar expand={'false'} className="bg-body-tertiary mb-5">
          <Container fluid>
            <Navbar.Brand as={Link} to="/">Annadata</Navbar.Brand>
            <div className='d-flex gap-2'>
                {!login && <Button variant='outline-success' onClick={ ()=> navigate('/login')}>Login</Button>}
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />
            </div>
            
            
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-false`}
              aria-labelledby={`offcanvasNavbarLabel-expand-false`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
                  Annadata
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link as={Link} to="/home">Home</Nav.Link>
                  {
                    login && 
                    <>
                      <Nav.Link as={Link} to="/post">Post</Nav.Link>
                      <Button variant='danger' onClick={logOut}>LogOut</Button>
                    </>
                  }
                </Nav>
 
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    )
}