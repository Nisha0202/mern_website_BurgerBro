import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Navber from '../components/Navbar';
import { useNavigate} from 'react-router-dom';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';


export default function Signup() {
  const navigate = useNavigate();

    const [first, setFirst] = useState({ name: "", email: "", password: "", geolocation: "" });

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:4000/api/creatuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: first.name, location: first.geolocation, email: first.email, password: first.password })
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      Swal.fire({
        title: 'Error!',
        text: 'Enter valid information',
        icon: 'error',
        confirmButtonText: 'OK'
      });

      // alert("Enter valid information");
    }
    else {
      Swal.fire({
        title: 'Success!',
        text: 'Signup successful!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      // alert("Sign Up successeful!");
      navigate("/login");
  
    }

  } catch (error) {
    console.error("An error occurred:", error);
    // Handle the error here, e.g., show an error message to the user
  }
};

const onChange = (event) => {
  setFirst({ ...first, [event.target.name]: event.target.value });
};

    return (
      <div className=''>
  <div>
    <Navber></Navber>
  </div>
  <div className='container-fluid mt-3 mb-4' style={{ minHeight: 'calc(100vh - 310px)' , paddingTop: '5rem' }}>
    <Card className="p-5 shadow">
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Your Name" name='name' value={first.name} onChange={onChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" placeholder="Enter Your Location" name='geolocation' value={first.geolocation} onChange={onChange} />
          <Form.Text className="text-muted">We'll never share your location with anyone else.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter Your email" name='email' value={first.email} onChange={onChange} />
          <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name='password' value={first.password} onChange={onChange} />
          <Form.Text className="text-muted">Your password has to contain at least 5 characters.</Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">Submit</Button>
        <Link to='/login' className='ms-5'>Already a User</Link>
        <div><Form.Text className="text-success mt-3">After sign up successefully you have to log in to place an order. </Form.Text> </div>
      </form>
    </Card>
  </div>
  <div className='mt-auto'>
    <Footer/>
  </div>
</div>


        
    );
}


