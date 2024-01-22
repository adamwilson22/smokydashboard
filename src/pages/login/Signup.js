import { useState } from 'react';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useHistory } from 'react-router-dom';
import { useUserAuth } from '../../Context/UserAuthContext';
import AppRoutes from '../../services/AppRoutes';

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { signUp } = useUserAuth();
    const history = useHistory();
    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            await signUp(email, password);
            history.push(AppRoutes.login);

        } catch (err) {
            setError(err.message);
        }
    }
    return (
        <Container>
            <Row>
                <Col>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Sign up
                        </Button>
                    </Form>
                    <hr />
                    <div className='p-4 box mt-3 text-center'>
                        Already have an Account <Link to={AppRoutes.login}>Log in</Link>
                    </div>
                </Col>
            </Row>
        </Container>

    );
}

export default Signup;