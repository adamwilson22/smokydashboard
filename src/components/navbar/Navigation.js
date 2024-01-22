import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useUserAuth } from '../../Context/UserAuthContext';
import { AppLogger } from '../../services/AppLogger';
import { showSuccessToast } from '../../services/AppConstant';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Admin from '../../assets/logo2.png'
import Toggle from '../../assets/toggle.png'
import search from '../../assets/search.png'
import Dropdown from 'react-bootstrap/Dropdown';
import './navbar.css';
import AppRoutes from '../../services/AppRoutes';

const Home = ({ setSearchQuery, originalList = [], updatedList = [], searchKey = "", showSearh = false }) => {
  const history = useHistory();
  const { logOut, user } = useUserAuth();
  const loginResp = JSON.parse(localStorage.getItem("USER"))

  useEffect(() => {
    // AppLogger("loginResp ", loginResp)
    if (loginResp == null) {
      history.push(AppRoutes.login)
    }
  }, [loginResp])

  const handleLogout = async () => {
    try {
      await logOut();
      // console.log('Hello From Logout')
      localStorage.setItem("USER", JSON.stringify(null))
      showSuccessToast("Logged Out Sucessfully")
      history.push(AppRoutes.login);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClick = () => {
    // 👇️ toggle class on the body element
    document.body.classList.toggle('hide-sidebar');
  };

  const handleSearch = (text) => {
    AppLogger("text", text)
    setSearchQuery(text)
    if (text) {
      updatedList(originalList.filter(element => element[searchKey] && (((element[searchKey]).toLowerCase()).replace(/\s/g, '')).includes((text.toLowerCase()).replace(/\s/g, ''))))
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
                <Dropdown.Toggle variant="" id="dropdown-basic"><img src={Admin} height={40} width={40} alt="Logo" />{user != null ? user.displayName : "Admin"}</Dropdown.Toggle>
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