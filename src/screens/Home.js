import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navber from '../components/Navbar'
import { Container, Row, Col, Form } from 'react-bootstrap';
import Card from '../components/Cards'
import { Search } from 'react-bootstrap-icons';


export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:4000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    // console.log(response[0], response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div> <Navber /></div>
      <div>
  <div
      className="hero-section bg-container  "
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "48vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Container className=''>
        <Row className="justify-content-center align-items-center mt-4">
          <Col lg={6} md={8} sm={10}>
            <h1 className="fw-bold fs-1 m-0">Burger Happiness Delivered!</h1>
            <p className=" fs-6 ms-1 mb-1 "> Enjoy burger delivery in 25 minutes!</p>
            <div className="search-input">

  <Form.Control
    type="text"
    placeholder="Search Your Favourite Burger..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
   
  />
    <span className="search-icon">
    <Search />
  </span>
</div>


          </Col>
        </Row>
      </Container>
    </div>

      </div>

      <div className='container-fluid'>
        <div className="mb-2">
          <h3>Burger Menu</h3></div>
        {foodCat.length !== 0 ? (
          foodCat.map((data) => (

            <div className='row mb-3' key={data._id}>
              <div className=' fs-5'>{data.CategoryName}</div>
              <hr />
              {foodItem.length !== 0 ? (
                foodItem
                  .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                  .map((filterItems) => (
                    <div className='col-12 col-md-6 col-lg-4'
                      key={filterItems._id}>
                      <Card foodItem={filterItems}
                        options={filterItems.options[0]}
                


                      ></Card>
                    </div>
                  ))
              ) : (
                <div>No Such Data Found</div>
              )}
            </div>

          ))
        ) : (
          <div>Error</div>
        )

        }
      </div>

      <div><Footer /></div>
    
    </div>
  )
}
