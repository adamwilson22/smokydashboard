import React, { Component } from 'react';
import './navbar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Admin from '../../assets/team.png'
import Toggle from '../../assets/toggle.png'
import search from '../../assets/search.png'
import notify from '../../assets/notify.png'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useHistory } from 'react-router-dom';
import { useUserAuth } from '../../Context/UserAuthContext';
import Dropdown from 'react-bootstrap/Dropdown';
import { AppLogger } from '../../services/AppLogger';

const Home = ({ originalList = [], updatedList = [], searchKey = "", showSearh = false }) => {
  const history = useHistory();
  const { logOut, user } = useUserAuth();

  // AppLogger("user", user)
  const handleLogout = async () => {
    try {
      await logOut();
      console.log('Hello From Logout')
      history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClick = () => {
    // 👇️ toggle class on the body element
    document.body.classList.toggle('hide-sidebar');
  };

  const handleSearch = (text) => {
    // AppLogger("text", text)
    if (text != "") {
      updatedList(originalList.filter(element => (((element[searchKey]).toLowerCase()).replace(/\s/g, '')).includes((text.toLowerCase()).replace(/\s/g, ''))))
    } else {
      updatedList([])
    }
  }


  return (
    <div className="custom-navigation">
      <Container fluid>
        <Row>
          <Col xs="2" className="d-flex align-items-center">
            <div className='nav-toogle ' onClick={handleClick}>
              <img src={Toggle} alt="Logo" />
            </div>
          </Col>

          <Col xs="10" className="d-flex align-items-center justify-content-end">
            {showSearh &&
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search here..."
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <Button className='search-btn' variant="outline-success"><img src={search} alt="Logo" /></Button>
              </Form>
            }
            <Nav>
              {/* <Dropdown>
                <Dropdown.Toggle variant="" id="dropdown-basic"><img src={notify} alt="Logo" /></Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>abc</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}
              <Dropdown>
                <Dropdown.Toggle variant="" id="dropdown-basic"><img src={Admin} alt="Logo" />{user.displayName ?? "Admin"}</Dropdown.Toggle>
                <Dropdown.Menu align="end">
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

            </Nav></Col>
        </Row>
      </Container>
    </div>
  );

}

export default Home;