import React from 'react'
import { Link } from 'react-router-dom';
import { Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-white pt-4 h-28">
      <div className='container-fluid justify-content-center '>
        <Row >
          <Col md={5}>
            <Link to="/" className="mb-1 text-white text-decoration-none ">
              <div className="fs-5 fw-bold" as={Link} to="/">
                BURGER BRO
              </div>
            </Link>
            <p>Bite into the perfection</p>
          </Col>
          <Col md={4}>
            <div className='logo-img pt-2 mb-2 align-items-center'></div>
          </Col>
          <Col md={3}>
            <div className=''>
            <p className='fw-bold m-0 pb-1'>Contact</p>
            <p className='m-0 pb-1'>Address: Dhaka-1217, Bangladesh</p>
            <p className='m-0 pb-1'>Email: burgerbro@gmail.com</p>
            <p className='m-0 pb-2'>Phone: +880123456789</p>
            </div>
          </Col>
        </Row>
        <span className="align-items-center" style={{ color: "grey" }}>© 2023 Burger Bro, Inc</span>
      </div>
    </footer>
  );
}

export default Footer;


