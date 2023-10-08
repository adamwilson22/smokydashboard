import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from '../services/AppConstant';
import { AppLogger } from '../services/AppLogger';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import firebaseServices from "../services/unit.services"
import Navigation from '../components/navbar/Navigation'
import Sidebar from '../components/sidebar/Sidebar'
import DateTimePicker from 'react-datetime-picker';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import moment from 'moment';
import '../App.css'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

function UpdateEvent() {
    const { state } = useLocation();

    const [event, setEvent] = useState({
        // image: null,
        name: "",
        desc: "",
        address: "",
    })
    const [startDateTime, setStartDateTime] = useState(new Date());
    const [endDateTime, setEndDateTime] = useState(new Date());


    useEffect(() => {
        if (state.action == "Update") {
            // AppLogger("eventDetails", state.eventDetails)
            setEvent({
                name: state.eventDetails.eventName,
                desc: state.eventDetails.eventDescription,
                address: state.eventDetails.eventAddress,
                // image: state.eventDetails.productImages[0]
            })
        }
    }, [state])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (state.action == "Update") {
            handleUpdateEvent()
        } else {
            handleAddEvent()
        }

    }

    const handleUpdateEvent = async () => {
        try {
            const body = {
                eventName: event.name,
                eventDescription: event.desc,
                eventAddress: event.address
            }
            await firebaseServices.updateEvent(state.eventDetails.eventId, body)
            showSuccessToast("Event Updated Successfully")
        } catch (error) {
            AppLogger("error removing event", error)
            showErrorToast("Unable to update event")
        }
    }

    const handleAddEvent = async () => {
        const currentDate = moment().format("YYYY-MM-DD hh:mm:ss")

        // AppLogger("start date", moment(startDateTime).format('MMM DD, YYYY'))
        // AppLogger("start time", moment(startDateTime).format('hh:mm A'))

        // AppLogger("end date", moment(endDateTime).format('MMM DD, YYYY'))
        // AppLogger("end time", moment(endDateTime).format('hh:mm A'))

        const body = {
            eventName: event.name,
            eventDescription: event.desc,
            eventAddress: event.address,
            comments: [],
            createdAt: currentDate,
            deletedAt: null,
            eventEndDate: moment(endDateTime).format('MMM DD, YYYY'),
            eventEndTime: moment(endDateTime).format('hh:mm A'),
            eventStartDate: moment(startDateTime).format('MMM DD, YYYY'),
            eventStartTime: moment(startDateTime).format('hh:mm A'),
            eventType: "",
            images: [],
            interestedUserIds: [],
            isPosted: true,
            joinedUserIds: [],
            modifiedAt: null,
            postedAt: null,
            userId: "",
        }
    }

    // useEffect(() => {
    //     AppLogger("startDateTime", startDateTime)
    // }, [startDateTime])

    // useEffect(() => {
    //     AppLogger("endDateTime", endDateTime)
    // }, [endDateTime])

    return (
        <>
            <div className='side-wrp'>
                <Sidebar />
            </div>
            <Navigation
                originalList={[]}
                updatedList={() => { }}
                searchKey={""}
                showSearh={false}
            />
            <Row className='full-height'>

                <Col className='white-bg'>
                    <Link className='back-btn override' to="/list-events"><ArrowBackIcon />  Back to Events</Link>
                    <div className="greet-text">
                        <h2>{`${state.action} Event`}</h2>
                    </div>
                    <Row>
                        <Col>
                            <div className='charts '>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBasicModel">
                                                <label className='label-styl'>Name</label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder='Name'
                                                    fullWidth
                                                    value={event.name}
                                                    onChange={(e) => setEvent({ ...event, name: e.target.value })}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBasicSerial">
                                                <label className='label-styl'>Description</label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder='Description'
                                                    fullWidth
                                                    value={event.desc}
                                                    onChange={(e) => setEvent({ ...event, desc: e.target.value })}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBasicpo">
                                                <label className='label-styl'>Address</label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder='Address'
                                                    fullWidth
                                                    value={event.address}
                                                    onChange={(e) => setEvent({ ...event, address: e.target.value })}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3 date-con" controlId="formBasicpo">
                                                <label className='label-styl'>Start Date/Time</label>
                                                <DateTimePicker
                                                    onChange={(val) => setStartDateTime(val)}
                                                    value={startDateTime}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3 date-con" controlId="formBasicpo">
                                                <label className='label-styl'>End Date/Time</label>
                                                <DateTimePicker
                                                    onChange={(val) => setEndDateTime(val)}
                                                    value={endDateTime}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    {/* <Row>
                                        <h4 className='text-left mt-4'>Add Images</h4>
                                        <Col md="4">
                                            <div className='image-field mt-2'>
                                                <img src={imgsrc ? imgsrc : ''} className="upload_photo_main" />
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <Form.Group className="mt-2 image-file" controlId="formBasicimage">
                                                <input type="file" onChange={(e) => { handleInputFileChange(e.target.files[0]) }} />
                                            </Form.Group>
                                        </Col>
                                    </Row> */}
                                    <Row>
                                        <Col className='btn-align mt-4'>
                                            <Button variant="primary" type="submit">
                                                {state.action}
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
    );
}

export default UpdateEvent