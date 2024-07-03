import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://15.207.192.151:8000/create/', formData);
      console.log('User created:', response.data);
      onSubmit(response.data);
    } catch (error) {
      console.error('There was an error creating the user!', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
      </Form.Group>
      <br/>
      <Form.Group controlId="formPhone">
        <Form.Control
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
        />
      </Form.Group>
      <br/>
      <Form.Group controlId="formEmail">
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
      </Form.Group>
      <br/>
      <Form.Group controlId="formAddress">
        <Form.Control
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your address"
        />
      </Form.Group>
      <br/>
      <Button variant="primary" style={{float: 'left'}} type="submit">
        Done
      </Button>
    </Form>
  );
};

export default UserForm;
