import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { Trash } from 'react-bootstrap-icons';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';


const Cart = () => {
  let data = useCart();
  let dispatch = useDispatchCart();
  const totalQuantity = data.reduce((acc, food) => acc + food.quantity, 0);

  const handleCheckOut = async () => {
    if (totalQuantity > 15) {
      Swal.fire({
        title: 'Error!',
        text: 'Sorry, you can\'t order more than 15 items at a time.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    const userEmail = localStorage.getItem("userEmail");
    const response = await fetch("http://localhost:4000/api/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });

    if (response.status === 200) {
      dispatch({ type: "DROP" })
      Swal.fire({
        title: 'Success!',
        text: 'Checkout successful!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }

  }


  let totalPrice = data.reduce((total, food) => total + food.price, 0)

  return (

    <Container className='mt-1'>
      <div>
        {data.length === 0 ? (
          <div className="w-80 text-dark text-center fs-4">The Cart is Empty!</div>
        ) : ""}
      </div>

      <div className='container-fluid'>
        <Row>
          <Col xs={12}>
            <Table striped bordered hover variant="dark" responsive>
              <thead>
                <tr className='text-white'>
                  <th scope='col' className="col-1">#</th>
                  <th scope='col' className="col">Name</th>
                  <th scope='col' className="col-2">Quantity</th>
                  <th scope='col' className="col-2">Option</th>
                  <th scope='col' className="col-2">Amount</th>
                  <th scope='col' className="col-2"></th>
                </tr>
              </thead>
              <tbody>
                {data.map((food, index) => (
                  <tr key={index} className='text-white mr-2'>
                    <td className="col-1">{index + 1}</td>
                    <td className="col ">{food.name} </td>
                    <td className="col-2">{food.quantity}</td>
                    <td className="col-2">{food.size}</td>
                    <td className="col-2">{food.price}</td>
                    <td>
                      <Button variant="link" className="p-0 text-danger">
                        <Trash onClick={() => { dispatch({ type: "REMOVE", index: index }) }} />
                      </Button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </Table>

            <>
              <Row className="mt-5 text-black">
                <Col><h5>Total Price: {totalPrice}tk/-</h5></Col>
              </Row>

              <Row><Col><Button onClick={(handleCheckOut)}>Check out</Button></Col></Row>
            </>
          </Col>
        </Row>
      </div>
    </Container>


  );
};

export default Cart;


// const Cart = () => {
//   let data = useCart();
//   let dispatch = useDispatchCart();
//   const totalQuantity = data.reduce((acc, food) => acc + food.quantity, 0);

//   const handleCheckOut = async () => {
//     const userEmail = localStorage.getItem("userEmail");
//     const response = await fetch("http://localhost:4000/api/orderData", {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         order_data: data,
//         email: userEmail,
//         order_date: new Date().toDateString()
//       })
//     });

// if (response.status === 200) {
//   dispatch({ type: "DROP" })
//   Swal.fire({
//     title: 'Success!',
//     text: 'Checkout successful!',
//     icon: 'success',
//     confirmButtonText: 'OK'
//   });
// }

//   }
  

//   let totalPrice = data.reduce((total, food) => total + food.price, 0)

// return(

// <Container className='mt-1'>
//   <div>
//     {data.length === 0 ? (
//       <div className="w-80 text-white text-center fs-4">The Cart is Empty!</div>
//     ) : ""}
//   </div>

//   <div className='container-fluid'>
//     <Row>
//       <Col xs={12}>
//         <Table striped bordered hover variant="dark" responsive>
//           <thead>
//             <tr className='text-white'>
//               <th scope='col' className="col-1">#</th>
//               <th scope='col' className="col">Name</th>
//               <th scope='col' className="col-2">Quantity</th>
//               <th scope='col' className="col-2">Option</th>
//               <th scope='col' className="col-2">Amount</th>
//               <th scope='col' className="col-2"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((food, index) => (
//               <tr key={index} className='text-white mr-2'>
//                 <td className="col-1">{index+1}</td>
//                 <td className="col ">{food.name} </td>
//                 <td className="col-2">{food.quantity}</td>
//                 <td className="col-2">{food.size}</td>
//                 <td className="col-2">{food.price}</td>
//                 <td>
//                   <Button variant="link" className="p-0 text-danger">
//                     <Trash onClick={() => { dispatch({ type: "REMOVE", index: index }) }} />
//                   </Button>
//                 </td>

//               </tr>
//             ))}
//           </tbody>
//         </Table>
//         {totalQuantity > 15 ? (
//           <Row className="mt-5 text-danger">
//             <Col><h5>Sorry, you can't order more than 15 items at a time.</h5></Col>
//           </Row>
//         ) : (
//           <>
//             <Row className="mt-5 text-black">
//               <Col><h5>Total Price: {totalPrice}tk/-</h5></Col>
//             </Row>

//             <Row><Col><Button onClick={(handleCheckOut)}>Check out</Button></Col></Row>
//           </>
//         )}
//       </Col>
//     </Row>
//   </div>
// </Container>


// );};

// export default Cart;

