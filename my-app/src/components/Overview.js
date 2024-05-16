import React from 'react';
import { Link } from 'react-router-dom';
import bg from './img/bg.jpg';
import './Navbar.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ImgOverview() {
  return (
    <Card className="bg-white text-dark">
      <Card.Img className='bg_img' src={bg} alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title className="title">
          <h2>
            Plan your next dream vacation
          </h2>
        </Card.Title>
        <Card.Text className="descrip">
          Step into a world of wanderlust and adventure! Welcome to our vacation planning hub, where every click brings you closer to your next unforgettable escape.
          <p>
            <Link to="/add">
              <Button variant="outline-secondary">Get started</Button>
            </Link>
          </p>
        </Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
}

export default ImgOverview;
