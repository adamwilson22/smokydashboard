import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { AppLogger } from '../../services/AppLogger';
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import { AppImages } from '../../services/AppImages';
import { handleDateTime } from '../../services/AppConstant';
import UnitDataService from "../../services/unit.service"
import FBServices from "../../services/unit.services"
import Table from 'react-bootstrap/Table';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Sidebar from '../../components/sidebar/Sidebar';
import Navigation from '../../components/navbar/Navigation';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../../App.css';
import { firebaseMessaging } from '../../firebase-config';

function NotifyUsers({ }) {
    const history = useHistory();
    const [listOfUsers, setListOfUsers] = useState([]);
    const [notifyBody, setNotifyBody] = useState({
        title: "",
        body: "",
    });
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        getUsersForNotification();
    }, [])

    const getUsersForNotification = async () => {
        const data = await FBServices.getNotificationUsers();
        setListOfUsers(data.docs.map((doc) => ({
            value: doc.data().fcmToken, label: doc.data().fullName
        })))

        // data.docs.map((doc) => {
        //     AppLogger("doc.data()", doc.data())
        //     AppLogger("doc.id", doc.id)
        // })
    };

    useEffect(() => {
        AppLogger("listOfUsers", listOfUsers)
    }, [listOfUsers])


    // const handleUserName = () => {
    //     var finalArray = []
    //     subsPaymentList.forEach(async (element) => {
    //         const userDetails = await FBServices.getUserDetails(element.userId);
    //         finalArray.push({
    //             ...element,
    //             username: userDetails.docs[0].data().fullName
    //         })
    //         setSubsPaymentListFiltered(...subsPaymentListFiltered, finalArray)
    //     })
    // }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (selectedOptions.length != 0) {
            selectedOptions.forEach((item) => {
                AppLogger("item", item)
                if (item.value != "iOS Device") {
                    sendNotification(notifyBody.title, notifyBody.body, item.value)
                }
            })
        }
    }

    const sendNotification = (title, body, fcmToken) => {
        // This registration token comes from the client FCM SDKs.
        // const registrationToken = 'YOUR_REGISTRATION_TOKEN';

        // const message = {
        //     data: {
        //         title: title,
        //         body: body
        //     },
        //     token: fcmToken
        // };

        // Send a message to the device corresponding to the provided
        // registration token.
        // firebaseMessaging.send(message)
        //     .then((response) => {
        //         // Response is a message ID string.
        //         console.log('Successfully sent message:', response);
        //     })
        //     .catch((error) => {
        //         console.log('Error sending message:', error);
        //     });



        // const bodyObj = {
        //     "message": {
        //         "topic": "matchday",
        //         "notification": {
        //             "title": "Test",
        //             "body": "testing notifications"
        //         },
        //     }
        // }
        // fetch("https://fcm.googleapis.com//v1/projects/smokersclub-e39db/messages:send", {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: `Bearer ${"AIzaSyC4G2LPBhl5R-OMx-RnWYf5yDDhxUYDeWw"}`,
        //     },
        //     body: JSON.stringify(bodyObj)
        // },)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         AppLogger("data fcm send", data)
        //     })
        //     .catch((error) => {
        //         AppLogger("error fcm send", error)
        //     })

    }


    const handleChange = (value) => {
        // AppLogger("value", value)
        setSelectedOptions(value)
    }

    const colourOptions = [
        { value: "ocean1", label: "Ocean" },
        { value: "blue", label: "Blue" },
        { value: "purple", label: "Purple" },
        { value: "red", label: "Red" },
        { value: "orange", label: "Orange" },
        { value: "yellow", label: "Yellow" },
        { value: "green", label: "Green" },
        { value: "forest", label: "Forest" },
        { value: "slate", label: "Slate" },
        { value: "silver", label: "Silver" }
    ];

    const Option = (props) => {
        return (
            <div>
                <components.Option {...props}>
                    <input
                        type="checkbox"
                        checked={props.isSelected}
                        onChange={() => null}
                    />{" "}
                    <label>{props.label}</label>
                </components.Option>
            </div>
        );
    };


    return (
        <>
            <div className='side-wrp'>
                <Sidebar />
            </div>
            <Navigation
                originalList={[]}
                updatedList={() => { }}
                searchKey={""}
            />
            <Row className='full-height'>

                <Col className='white-bg'>
                    <Link className='back-btn' to="/home"><ArrowBackIcon /> Back to Home </Link>
                    <div className="greet-text">
                        <h2>Send Push Notifications to Users</h2>

                    </div>
                    <Row>
                        <Col>
                            <div className='charts '>
                                <Row>
                                    <Col style={{ height: "50px", marginBottom: "24px" }}>
                                        {listOfUsers.length != 0 &&
                                            <ReactSelect
                                                styles={{ height: "100%" }}
                                                // maxMenuHeight={100}
                                                options={listOfUsers}
                                                isMulti
                                                closeMenuOnSelect={false}
                                                hideSelectedOptions={false}
                                                // components={{
                                                //     Option
                                                // }}
                                                onChange={handleChange}
                                                allowSelectAll={true}
                                                // value={optionSelected}
                                                placeholder={"Select Users"}
                                            />}
                                    </Col>
                                </Row>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBasicSerial">
                                                <Form.Control type="text"
                                                    required
                                                    placeholder='Title' fullWidth
                                                    label="Title" id="title"
                                                    value={notifyBody.title}
                                                    onChange={(e) => setNotifyBody({ ...notifyBody, title: e.target.value })}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBasicSerial">
                                                <Form.Control as="textarea" rows={6}
                                                    required
                                                    placeholder='Body' fullWidth
                                                    label="Body" id="body"
                                                    value={notifyBody.body}
                                                    onChange={(e) => setNotifyBody({ ...notifyBody, body: e.target.value })}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className='btn-align'>
                                            <Button variant="primary" type='submit'>
                                                Send
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )

}

export default NotifyUsers