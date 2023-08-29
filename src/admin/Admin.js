import React from 'react';
import { Navbar, Table } from 'react-bootstrap';

const ordersData = [
  { email: 'user1@example.com', name: 'User 1', order: 'Order 1' },
  { email: 'user2@example.com', name: 'User 2', order: 'Order 2' },
  { email: 'user3@example.com', name: 'User 3', order: 'Order 3' },
  // Add more data as needed
];

const NavbarWithTable = ({ loggedInEmail }) => {
  const filteredOrders = ordersData.filter(order => order.email === loggedInEmail);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Your App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Table responsive>
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Order</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.email}>
                <td>{order.email}</td>
                <td>{order.name}</td>
                <td>{order.order}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarWithTable;