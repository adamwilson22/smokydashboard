import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { AppLogger } from '../../services/AppLogger';
import { default as ReactSelect } from "react-select";
import { AppConstant, showErrorToast, showSuccessToast } from '../../services/AppConstant';
import FBServices from "../../services/unit.services"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Sidebar from '../../components/sidebar/Sidebar';
import Navigation from '../../components/navbar/Navigation';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../../App.css';

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
        AppLogger("getUsersForNotification", "called")
    }, [])

    const getUsersForNotification = async () => {
        var dummyList = []
        const data = await FBServices.getNotificationUsers();
        data.docs.map((doc) => {
            AppLogger("user details", doc.data())
            if (doc.data().fcmToken != "iOS Device")
                dummyList.push({ value: doc.data().fcmToken, label: doc.data().fullName })
        })
        setListOfUsers(dummyList)
    };

    // const handleUserName = () => {
    //     var finalArray = []
    //     subsPaymentList.forEach(async (element) => {
    //         const userDetails = await FBServices.getUserDetails(element.userId);
    //         finalArray.push({
    //             ...element,
    //             usernamee: userDetails.docs[0].data().fullName
    //         })
    //         setSubsPaymentListFiltered(...subsPaymentListFiltered, finalArray)
    //     })
    // }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (selectedOptions.length != 0) {
            selectedOptions.forEach((item) => {
                if (item.value != "*") {
                    sendNotification(notifyBody.title, notifyBody.body, item.value)
                }
            })
        }
    }

    const sendNotification = (title, body, fcmToken) => {
        var apiBody = {
            notification: {
                body: body,
                title: title,
                priority: "high"
            },
            data: {},
            to: `${fcmToken}`
        }
        fetch("https://fcm.googleapis.com/fcm/send", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `key=${AppConstant.FCM_SERVER_KEY}`
            },
            body: JSON.stringify(apiBody)
        },)
            .then((response) => response.json())
            .then((data) => {
                // AppLogger("data fcm send notification", data)
                setSelectedOptions([])
                showSuccessToast("Notification Send Successfully")
                setNotifyBody({
                    title: "",
                    body: "",
                })
            })
            .catch((error) => {
                // AppLogger("error fcm send notification", error)
                showErrorToast("Unable to send Notification")
            })
    }

    const selectAllOption = { label: 'Select All', value: '*' };

    const handleChange = (newSelectedOptions, actionMeta) => {
        var allSelected = false
        // AppLogger("value", newSelectedOptions)
        // AppLogger("actionMeta", actionMeta)

        if (actionMeta.action == "select-option") {
            allSelected = actionMeta.option.label == "All"
            setSelectedOptions(
                allSelected ?
                    [{ label: "All", value: "*" }, ...listOfUsers]
                    : newSelectedOptions
            )
        } else if (actionMeta.action == "remove-value" || actionMeta.action == "deselect-option") {
            var key = ""
            key = actionMeta.action == "remove-value" ? "removedValue" : "option"
            allSelected = actionMeta[key].label == "All"
            setSelectedOptions(
                allSelected ? [] : newSelectedOptions
            )
        } else if (actionMeta.action == "clear") {
            setSelectedOptions([])
        }
    }

    const customStyles = {
        control: base => ({
            ...base,
            height: 80,
            minHeight: 35,
            overflowX: "hidden",
        })
    };

    return (
        <>
            <div style={{}} className='side-wrp'>
                <Sidebar />
            </div>
            <Navigation
                originalList={[]}
                updatedList={() => { }}
                searchKey={""}
                showSearh={false}
                setSearchQuery={(val) => null}
            />
            <Row className='full-height'>

                <Col className='white-bg'>
                    <Link className='back-btn override' to="/home"><ArrowBackIcon /> Back to Dashboard </Link>
                    <div className="greet-text">
                        <h2>Send Push Notifications</h2>

                    </div>
                    <Row>
                        <Col>
                            <div className='charts '>
                                <Row>
                                    <Col style={{ height: "50px", marginBottom: "44px" }}>
                                        {/* {listOfUsers.length != 0 && */}
                                        <ReactSelect
                                            styles={customStyles}
                                            options={[{ label: "All", value: "*" }, ...listOfUsers]}
                                            isMulti
                                            closeMenuOnSelect={false}
                                            hideSelectedOptions={false}
                                            // components={{
                                            //     Option
                                            // }}
                                            onChange={(e, actionMeta) => handleChange(e, actionMeta)}
                                            allowSelectAll={true}
                                            value={selectedOptions}
                                            placeholder={"Select Users"}
                                            required
                                        />
                                        {/* } */}
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