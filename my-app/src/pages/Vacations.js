import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { getVacations, deleteVacation } from '../apiService';
import { Link } from 'react-router-dom';
import './Vacation.css';

function Vacations({ role }) {
  const [vacations, setVacations] = useState([]);
  const [filteredVacations, setFilteredVacations] = useState([]);
  const [filterType, setFilterType] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getVacations();
        setVacations(data);
        setFilteredVacations(data);
      } catch (error) {
        console.error('Error fetching vacations:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterVacations(filterType);
  }, [vacations, filterType]);

import { Link } from 'react-router-dom';
import './Vacation.css';


function Vacations() {
  const [vacations, setVacations] = useState([]);
  const [filteredVacations, setFilteredVacations] = useState([]);
  const [filterType, setFilterType] = useState('All'); 

  useEffect(() => {
    // Retrieve stored vacation data from localStorage
    const storedData = localStorage.getItem('vacationData');
    if (storedData) {
      // Parse the JSON string to convert it to an array
      const parsedData = JSON.parse(storedData);
      // Sort the vacations array in reverse order based on their indices
      const sortedVacations = parsedData.slice().reverse();
      setVacations(sortedVacations);
      setFilteredVacations(sortedVacations); 
    }
  }, []);


  const handleFilterChange = (e) => {
    const { value } = e.target;
    setFilterType(value);
    filterVacations(value);
  };


  const handleRemoveVacation = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this vacation?");
    if (isConfirmed) {
      try {
        await deleteVacation(id);
        setVacations(vacations.filter((vacation) => vacation.id !== id));
        setFilteredVacations(filteredVacations.filter((vacation) => vacation.id !== id));
      } catch (error) {
        console.error('Error deleting vacation:', error);
        setError(error.message);
      }
    }
  };

  const filterVacations = (type) => {
    if (type === 'All') {
      setFilteredVacations(vacations);
    } else if (type === 'Past') {
      setFilteredVacations(vacations.filter((vacation) => new Date(vacation.departure_date) < new Date()));
    } else if (type === 'Upcoming') {
      setFilteredVacations(vacations.filter((vacation) => new Date(vacation.departure_date) >= new Date()));
    }
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading vacations...</div>
      ) : error ? (
        <div>Error fetching vacations: {error}</div>
      ) : (
        <>
          <h2>Available Vacations</h2>
          <h2>
            <Link to="/add">
              <Button variant="secondary" disabled={role !== 'admin'}>
                + Add vacation
              </Button>
            </Link>
          </h2>
          <Form.Group controlId="filterType" className="row">
            <Form.Label className="col-sm-12 col-md-9 text-md-end">Filter Type:</Form.Label>
            <div className="col-sm-12 col-md-2 d-flex justify-content-end">
              <Form.Select value={filterType} onChange={handleFilterChange}>
                <option value="All">All</option>
                <option value="Past">Past Vacations</option>
                <option value="Upcoming">Upcoming Vacations</option>
              </Form.Select>
            </div>
          </Form.Group>
          {filteredVacations.map((vacation) => (
            <Card key={vacation.id} className="mb-3">
              <Card.Body className="bg">
                <div className="bgcard">
                  <div className="row">
                    <span className="col">
                      <Card.Title>{vacation.location}</Card.Title>
                    </span>
                    {role === 'admin' && (
                      <span className="col-auto">
                        <Button
                          variant="outline-dark"
                          onClick={() => handleRemoveVacation(vacation.id)}
                          className="remove"
                        />
                      </span>
                    )}
                  </div>
                  <Card.Text>
                    Departure Date: {vacation.departure_date}<br />
                    Departure Time: {vacation.departure_time}<br />
                    Return Date: {vacation.return_date}<br />
                    Return Time: {vacation.return_time}<br />
                    Accommodation Address: {vacation.accommodation_address}<br />
                    Number of Persons: {vacation.number_of_persons}<br />
                    Holiday Type: {vacation.holiday_type}
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          ))}
        </>
      )}

  const handleRemoveVacation = (index) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this vacation?");
  
   
    if (isConfirmed) {
      // Remove the vacation item at the specified index from the array
      const updatedVacations = [...vacations];
      updatedVacations.splice(index, 1);
      // Save the updated array 
      localStorage.setItem('vacationData', JSON.stringify(updatedVacations));
      // Update the state 
      setVacations(updatedVacations);
    }
  };
  

  useEffect(() => {
  
    filterVacations(filterType);
  }, [vacations, filterType]); 
  
  const filterVacations = (filterType) => {
    if (filterType === 'All') {
      setFilteredVacations(vacations); 
    } else if (filterType === 'Past') {
      const pastVacations = vacations.filter(vacation => new Date(vacation.departureDate) < new Date());
      setFilteredVacations(pastVacations);
    } else if (filterType === 'Upcoming') {
     
      const upcomingVacations = vacations.filter(vacation => new Date(vacation.departureDate) >= new Date());
      setFilteredVacations(upcomingVacations);
    }
  };
  
  

  return (
    <div>
      <h2>Available Vacations</h2>
      <h2>
      <Link to="/add">
      <Button variant="secondary" type="submit" className="button">
        + Add vacation
      </Button>
      </Link>
      </h2>
        
    
      

      <Form.Group controlId="filterType" className="row">
  <Form.Label className="col-sm-12 col-md-9 text-md-end">Filter Type:</Form.Label>
  <div className="col-sm-12 col-md-2 d-flex justify-content-end">
    <Form.Select value={filterType} onChange={handleFilterChange}>
      <option value="All">All</option>
      <option value="Past">Past Vacations</option>
      <option value="Upcoming">Upcoming Vacations</option>
    </Form.Select>
  </div>
</Form.Group>



      {filteredVacations.map((vacation, index) => (
        <Card key={index} className="mb-3">
         
          
         
          <Card.Body className="bg">
          <div className="bgcard">
          <div className="row">
  <span className="col">
    <Card.Title>{vacation.location}</Card.Title>
  </span>
  <span className="col-auto">
    <Button  variant="outline-dark" onClick={() => handleRemoveVacation(index)} className="remove"/>
  </span>
</div>

            <Card.Text >
              Departure Date: {vacation.departureDate}<br />
              Departure Time: {vacation.departureTime}<br />
              Return Date: {vacation.returnDate}<br />
              Return Time: {vacation.returnTime}<br />
              Accommodation Address: {vacation.accommodationAddress}<br />
              Number of Persons: {vacation.numberOfPersons}<br />
              Holiday Type: {vacation.holidayType}
            </Card.Text>
            </div>
          </Card.Body>
          
        </Card>
      ))}
    </div>
  );
}

export default Vacations;
