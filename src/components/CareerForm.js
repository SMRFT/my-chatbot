import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';

const CareerForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    department: '',
    status: '',
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStatusChange = (e) => {
    setFormData({
      ...formData,
      status: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('phone', formData.phone);
    data.append('email', formData.email);
    data.append('department', formData.department);
    data.append('status', formData.status);
    data.append('resume', formData.resume);

    try {
      await axios.post('http://15.207.192.151:8000/submit/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onSubmit(formData); // Call onSubmit to update the chatbot state
    } catch (error) {
      console.error('Error submitting the form', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} controlId="formName">
        <Col sm={10}>
          <Form.Control
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Col>
      </Form.Group>
      <br/>
      <Form.Group as={Row} controlId="formPhone">
        <Col sm={10}>
          <Form.Control
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Col>
      </Form.Group>
      <br/>
      <Form.Group as={Row} controlId="formEmail">
        <Col sm={10}>
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Col>
      </Form.Group>
      <br/>
      <Form.Group as={Row} controlId="formDepartment">
        <Col sm={10}>
          <Form.Control
            as="select"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="Doctor">Doctor</option>
            <option value="Nurse">Nurse</option>
            <option value="Dietician">Dietician</option>
            <option value="BioMedical">BioMedical</option>
            <option value="Lab">Lab</option>
            <option value="Admin">Admin</option>
            <option value="HouseKeeping/Security">HouseKeeping/Security</option>
          </Form.Control>
        </Col>
      </Form.Group>
      <br/>
      <Form.Group as={Row}>
        <Col sm={10}>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="status"
              id="inlineRadio1"
              value="Employee"
              checked={formData.status === 'Employee'}
              onChange={handleStatusChange}
            />
            <label className="form-check-label" htmlFor="inlineRadio1">Employee</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="status"
              id="inlineRadio2"
              value="Student"
              checked={formData.status === 'Student'}
              onChange={handleStatusChange}
            />
            <label className="form-check-label" htmlFor="inlineRadio2">Student</label>
          </div>
        </Col>
      </Form.Group>
      <br/>
      <Form.Group as={Row} controlId="formResume">
        <Col sm={10}>
          <Form.Control
            type="file"
            name="resume"
            onChange={handleFileChange}
            required
          />
        </Col>
      </Form.Group>
      <br/>
      <Form.Group as={Row}>
        <Col>
          <Button type="submit">Submit</Button>
        </Col>
      </Form.Group>
      <br/>
    </Form>
  );
};

export default CareerForm;
