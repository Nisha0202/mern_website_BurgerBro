import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navber from '../components/Navbar';
import Card from 'react-bootstrap/Card';
import Footer from '../components/Footer'
import Swal from 'sweetalert2';
export default function Login() {

  const [first, setFirst] = useState({ email: "", password: ""});
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: first.email, password: first.password })
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
      }
      else {
        localStorage.setItem("userEmail", first.email);
        localStorage.setItem("authToken", json.authToken);
        //console.log(localStorage.getItem("authToken"));
        Swal.fire({
          title: 'Success!',
          text: 'Login successful!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        navigate("/");
       
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
        <div className=''> <Navber/></div>
        <div className='container-fluid' style={{ minHeight: 'calc(100vh - 165px)', paddingTop: '7rem' }}>
        <Card className=" p-5 shadow">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter Your email" name='email' value={first.email} onChange={onChange} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
    
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name='password' value={first.password} onChange={onChange} />
              </Form.Group>
    
              <Button variant="primary" type="submit">
                Submit
              </Button>
    
              <Link to='/signup' className='ms-5'>Don't Have an Account?</Link>
            </Form>
          </Card>
        </div>
        <div className='mt-auto'><Footer/></div>
      </div>

  );
}
