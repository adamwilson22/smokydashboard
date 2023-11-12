import { useState, useEffect } from 'react';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import GoogleButton from 'react-google-button'
import { Link } from 'react-router-dom';
import { useUserAuth } from '../../Context/UserAuthContext';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/logodark.svg';
import { AppLogger } from '../../services/AppLogger';
import UnitDataService from "../../services/unit.service"
import { showErrorToast, showSuccessToast } from '../../services/AppConstant';


function BasicExample() {
    const history = useHistory()
    const [email, setEmail] = useState(
        "",
        // "admin@smokebud.com",
    );
    const [password, setPassword] = useState(
        "",
        // "SmokeBud2023"
    );
    const [error, setError] = useState("");
    const { logIn, user, logOut } = useUserAuth();
    const loginResp = JSON.parse(localStorage.getItem("USER"))

    const handleSubmit = async (e) => {
        var isAdmin = false
        e.preventDefault()
        try {
            const response = await logIn(email, password)
            AppLogger("login response", response)

            const superAdmins = await UnitDataService.getSuperAdmins();
            superAdmins.docs.forEach((doc) => {
                if (doc.id == response.user.uid) {
                    isAdmin = true
                }
            })
            if (isAdmin) {
                // showSuccessToast("Super Admin")
                localStorage.setItem("USER", JSON.stringify(response.user))
                history.push("/home");
            } else {
                await logOut();
                showErrorToast("Invalid Credentials")
            }
        } catch (err) {
            // showErrorToast(err.message);
            showErrorToast("Login Failed : Invalid Email or Password")
        }
    }

    useEffect(() => {
        if (loginResp != null) {
            history.push("/home")
        }
    }, [loginResp])

    return (
        <div className="loginbg">
            <Container>
                <Row>
                    <Col></Col>
                    <Col lg="5">
                        <div className='login-form'>
                            <div className='logo-wrp'>
                                <img src={logo} alt="Logo" />
                                {/* <h2>Smoke Bud</h2> */}
                            </div>
                            <p>Welcome back! Please login to your account.</p>
                            <Form onSubmit={handleSubmit}>
                                {/* {error && <Alert variant="danger">{error}</Alert>} */}
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control
                                        required
                                        type="email"
                                        placeholder="Enter email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formBasicPassword">
                                    <Form.Control
                                        required
                                        type="password"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                    />
                                </Form.Group>
                                {/* <Row>
                                    <Col>
                                        <Form.Group className="mb-5" controlId="formBasicCheckbox">
                                            <Form.Check type="checkbox" label="Remember me" />
                                        </Form.Group>
                                    </Col>
                                    <Col className="text-lg-right">
                                        <a href="#">Forgot password</a>
                                    </Col>
                                </Row> */}
                                <Row>
                                    <Col>
                                        <Button variant="primary" className="w-100" type="submit">
                                            Login
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>

    );
}

export default BasicExample;