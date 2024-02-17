import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useUserAuth } from '../../Context/UserAuthContext';
import { AppLogger } from '../../services/AppLogger';
import { showErrorToast, showSuccessToast, showToast } from '../../services/AppConstant';
import { AppImages } from '../../services/AppImages';
import { auth } from '../../firebase-config';
import { get } from 'lodash';
import unitServices from '../../services/unit.services';
import unitService from '../../services/unit.service';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import logo from "../../assets/logo2.png"
import logo2 from "../../assets/deer.png"
import moment from 'moment';
import CustomModal from '../../components/CustomModal';
import CustomLoader from '../../components/CustomLoader';

function DeleteAccount() {
    const { logIn, logOut } = useUserAuth();
    const [showPass, setShowPass] = useState(false)
    const [email, setEmail] = useState(
        "",
        // "admin@outdoortrader.com"
    );
    const [password, setPassword] = useState(
        "",
        // "OutdoorTrader2024"
    );
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        setLoading(true)
        setShowDeleteModal(false)

        var isAdmin = false
        var date = moment().utcOffset('+05:00').format('MMMM DD, YYYY');
        var time = moment().utcOffset('+05:00').format('hh:mm:ss A');
        const dateString = `${date} at ${time} UTC+5`

        try {
            const response = await logIn(email, password)

            const superAdmins = await unitService.getSuperAdmins();
            superAdmins.docs.forEach((doc) => {
                if (doc.data().id == get(response, "user.email", "")) {
                    isAdmin = true
                }
            })

            if (isAdmin) {
                showToast("Admin can't be deleted")
                await logOut();
                setLoading(false)
            } else {
                try {
                    deleteUserAuth()
                    var body = { deletedAt: dateString, isDeleted: true }
                    const currentUserDetails = await unitServices.getUserByEmail(get(response, "user.email", ""))

                    if (get(currentUserDetails.docs[0], "data.uid", "")) {
                        await unitServices.updateUser(get(currentUserDetails.docs[0], "data.uid", ""), body);
                    }
                    showSuccessToast(`User deleted succesfully`)
                    setLoading(false)
                } catch (error) {
                    await logOut();
                    AppLogger("error deleting user ", error)
                    showErrorToast(error)
                    setLoading(false)
                }
            }
        } catch (err) {
            console.log("Error === ", err.message)
            showErrorToast("Invalid Credentials")
            setLoading(false)
        }
    }

    const deleteUserAuth = () => {
        auth.currentUser.delete()
            .then((resp) => {
                console.log("user delete function response success")
            })
            .catch((error) => {
                console.log("user delete function error", error)
            });
    }

    return (
        <div className="loginbg">
            <div className='leftlogo'>
                <img src={logo} alt="Logo" />
            </div>
            {loading &&
                <CustomLoader />
            }
            <Container>
                <Row>
                    <Col></Col>
                    <Col lg="5">
                        <div className='login-form'>
                            <div className='logo-wrp'>
                                <img src={logo2} alt="Logo" />
                            </div>

                            <p><strong>Delete Account</strong></p>
                            <Form onSubmit={(e) => {
                                e.preventDefault()
                                setShowDeleteModal(true)
                            }}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control
                                        required
                                        type="email"
                                        placeholder="Enter email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-4 position-relative " controlId="formBasicPassword">
                                    <Form.Control
                                        required
                                        type={showPass ? "text" : "password"}
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                    />
                                    <img
                                        onClick={() => setShowPass(!showPass)}
                                        className='eye-icon position-absolute'
                                        src={showPass ? AppImages.showPass : AppImages.hidePass}
                                    />
                                </Form.Group>
                                <Row>
                                    <Col>
                                        <Button variant="primary" className="w-100" type="submit">
                                            Delete
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
            <CustomModal
                setShow={setShowDeleteModal}
                show={showDeleteModal}
                title={"Delete User"}
                btnText={"Yes"}
                desc={"Are you sure you want to delete this account?"}
                centered={true}
                onClickDone={() => handleSubmit()}
            />
        </div>
    );
}

export default DeleteAccount;