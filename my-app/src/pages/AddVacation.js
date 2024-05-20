import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { createVacation } from '../apiService';
import { Link } from 'react-router-dom';
import './Vacation.css';
function AddVacation({ role }) {
  const initialFormData = {
    departure_date: '',
    departure_time: '',
    return_date: '',
    return_time: '',
    location: '',
    accommodation_address: '',
    number_of_persons: '',
    holiday_type: 'Choose...',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submissionError, setSubmissionError] = useState(null);
import { Link } from 'react-router-dom';
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

    setErrors({ ...errors, [id]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.departure_date) newErrors.departure_date = 'Departure date is required';
    if (!formData.location) newErrors.location = 'Location is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (role !== 'admin') {
      alert('Only admins can add vacations.');
      return;
    }
    if (!validateForm()) return;

    try {
      await createVacation(formData);
      setFormData(initialFormData);
      alert('Vacation added successfully!');
    } catch (error) {
      console.error('Error creating vacation:', error);
      setSubmissionError('Failed to add vacation. Please try again.');
    }
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

      {submissionError && <div className="text-danger">{submissionError}</div>}
      <Row className="mb-3">
        <Form.Group as={Col} controlId="departure_date">
          <Form.Label>Departure date</Form.Label>
          <Form.Control
            type="date"
            value={formData.departure_date}
            onChange={handleChange}
            isInvalid={!!errors.departure_date}
          />
          <Form.Control.Feedback type="invalid">{errors.departure_date}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="departure_time">
          <Form.Label>Time: </Form.Label>
          <Form.Control type="time" value={formData.departure_time} onChange={handleChange} />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="return_date">
          <Form.Label>Return date:</Form.Label>
          <Form.Control type="date" value={formData.return_date} onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col} controlId="return_time">
          <Form.Label>Time: </Form.Label>
          <Form.Control type="time" value={formData.return_time} onChange={handleChange} />
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

          <Form.Control
            type="text"
            placeholder="Enter location"
            value={formData.location}
            onChange={handleChange}
            isInvalid={!!errors.location}
          />
          <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="accommodation_address">
          <Form.Label>Accommodation address </Form.Label>
          <Form.Control type="text" placeholder="Enter address" value={formData.accommodation_address} onChange={handleChange} />
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="number_of_persons">
        <Form.Label>Number of Persons</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter number of persons"
          value={formData.number_of_persons}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="holiday_type">
        <Form.Label>Holiday Type</Form.Label>
        <Form.Select value={formData.holiday_type} onChange={handleChange}>

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
      <Link to="/vacations">
        <Button variant="secondary" className="button">
          Check available vacations
        </Button>

      <Button variant="secondary" type="submit" className="button">
        Add vacation
      </Button>
      
      <Link to="/vacations">
      <Button variant="secondary" type="submit" className="button">
        Check available vacations
      </Button>

      </Link>
    </Form>
  );
}

export default AddVacation;
