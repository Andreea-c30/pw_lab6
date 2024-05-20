import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css';
function NavbarEl() {
  return (
    <Navbar expand="lg" className="bgcol">
      <Container fluid >
        <Navbar.Brand className="bgcol" >Explore Ease</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavbarEl;