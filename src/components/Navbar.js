
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import { useState } from 'react';
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { Cart2 } from 'react-bootstrap-icons';
export default function CustomNavbar() {

let data = useCart();
  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false)
//   const loadCart = () => {
//     setCartView(true)
// }
  const handelelogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login")
  }

  return (
    <Navbar  fixed="top" bg="dark" variant="dark" expand="lg" className=''>
      <Container fluid>
        <Navbar.Brand className="fs-5 fw-bold d-flex justify-content-center " as={Link} to="/"><div className='d-flex align-item-center'>
        <div className=''> </div>
          BURGER BRO
         </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto">
           

            {(localStorage.getItem("authToken")) ?

              <div className="row justify-content-center">
                <div className="col-sm-12 col-lg-auto">
                  <Nav.Item>
                    <Nav.Link className="nav-link fs-6 fw-normal bg-dark" as={Link} to="/myorders" >
                     My Orders
                    </Nav.Link>
                  </Nav.Item>
                </div>
                <div className="col-sm-12 col-lg-auto" onClick={() => setCartView(true)}>
                  <Nav.Item>
                    <Nav.Link className="nav-link fs-6 fw-normal bg-dark" as={Link} to="" style={{ color: ' rgb(206, 115, 66)' }}>
                     <Cart2 className="" size={24} color="orange" /> {""}

                     <Badge pil={'success '}>{data.length}</Badge>
                
                    </Nav.Link>
                  </Nav.Item>
                </div>
                {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart> </Modal> : ""}

                <div className="col-sm-12 col-lg-auto">
                  <Nav.Item>
                    <Nav.Link className="nav-link fs-6 text-danger" as={Link} to="/" onClick={handelelogout}>
                      Log Out
                    </Nav.Link>
                  </Nav.Item>
                </div>
              </div>
              : ""}


            {(!localStorage.getItem("authToken")) ?

              <div className="row d-flex align-items-center justify-content-center">
                <div className="col-sm-12 col-md-4 flex-wrap text-nowrap">
                  <Nav.Item>
                    <Nav.Link className="nav-link fs-6 text-success" as={Link} to="/login">
                      Log In
                    </Nav.Link>
                  </Nav.Item>
                </div>
                <div className="col-sm-12 col-md-4 flex-wrap text-nowrap">
                  <Nav.Item>
                    <Nav.Link className="nav-link fs-6 text-success" as={Link} to="/signup">
                      Sign Up
                    </Nav.Link>
                  </Nav.Item>
                </div>
                <div className="col-sm-12 col-md-4 flex-wrap text-nowrap">
                  <Nav.Item>
                    <Nav.Link className="nav-link fs-6 fw-normal bg-dark" as={Link} to="/login" style={{ color: ' rgb(206, 115, 66)' }}>
                      Order Now
                    </Nav.Link>
                  </Nav.Item>
                </div>
              </div>
              : ""}


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}







