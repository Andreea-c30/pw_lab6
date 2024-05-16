import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './Vacation.css';

function AddVacation() {
  const [formData, setFormData] = useState({
    departureDate: '',
    departureTime: '',
    returnDate: '',
    returnTime: '',
    location: '',
    accommodationAddress: '',
    numberOfPersons: '',
    holidayType: 'Choose...'
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Retrieve existing vacation data from localStorage
    const existingVacations = JSON.parse(localStorage.getItem('vacationData')) || [];
    // Add new vacation data to the existing array
    const updatedVacations = [...existingVacations, formData];
    // Save the updated vacation data to localStorage
    localStorage.setItem('vacationData', JSON.stringify(updatedVacations));
    // Optionally, you can reset the form after submission
    setFormData({
      departureDate: '',
      departureTime: '',
      returnDate: '',
      returnTime: '',
      location: '',
      accommodationAddress: '',
      numberOfPersons: '',
      holidayType: 'Choose...'
    });
  };

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <h2>Add details to your holiday</h2>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="departureDate">
          <Form.Label>Departure date</Form.Label>
          <Form.Control type="date" value={formData.departureDate} onChange={handleChange} />
        </Form.Group>

        <Form.Group as={Col} controlId="departureTime">
          <Form.Label>Time: </Form.Label>
          <Form.Control type="time" value={formData.departureTime} onChange={handleChange} />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="returnDate">
          <Form.Label>Return date:</Form.Label>
          <Form.Control type="date" value={formData.returnDate} onChange={handleChange} />
        </Form.Group>

        <Form.Group as={Col} controlId="returnTime">
          <Form.Label>Time: </Form.Label>
          <Form.Control type="time" value={formData.returnTime} onChange={handleChange} />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="location">
          <Form.Label>Location </Form.Label>
          <Form.Control type="text" placeholder="Enter location" value={formData.location} onChange={handleChange} />
        </Form.Group>

        <Form.Group as={Col} controlId="accommodationAddress">
          <Form.Label>Accommodation address </Form.Label>
          <Form.Control type="text" placeholder="Enter address" value={formData.accommodationAddress} onChange={handleChange} />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="numberOfPersons">
        <Form.Label>Number of Persons</Form.Label>
        <Form.Control type="number" placeholder="Enter number of persons" value={formData.numberOfPersons} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="holidayType">
        <Form.Label>Holiday Type</Form.Label>
        <Form.Select value={formData.holidayType} onChange={handleChange}>
          <option>Choose...</option>
          <option>Beach Holiday</option>
          <option>City Break</option>
          <option>Mountain Retreat</option>
        </Form.Select>
      </Form.Group>

      <Button variant="secondary" type="submit" className="button">
        Add vacation
      </Button>
    </Form>
  );
}

export default AddVacation;
