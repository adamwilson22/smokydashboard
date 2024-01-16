import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { AppLogger } from '../../services/AppLogger';
import { useHistory, } from 'react-router-dom';
import { handleDateString } from '../../services/AppConstant';
import { Button } from 'react-bootstrap';
import UnitDataService from "../../services/unit.service"
import firebaseServices from "../../services/unit.services"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Navigation from "../../components/navbar/Navigation"
import Sidebar from "../../components/sidebar/Sidebar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import '../../App.css';
import CustomModal from '../../components/CustomModal';

function ListOfEvents() {
    const history = useHistory();
    const [eventsList, setEventsList] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        getListOfEvents()
        AppLogger("getListOfEvents", "called")
    }, [])

    const getListOfEvents = async () => {
        const data = await UnitDataService.getAllEvents()
        if (!data.empty) {
            setEventsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            // data.docs.map((doc) => {
            //     AppLogger("doc.data()", doc.data())
            //     AppLogger("doc.id", doc.id)
            // })
        } else {
            AppLogger('error no events found')
        }
    };

    const handleRemoveEvent = async () => {
        // AppLogger("selectedveent", selectedEvent)
        try {
            await firebaseServices.deleteEvent(selectedEvent.id)
            setShowModal(false)
        } catch (error) {
            AppLogger("error removing product", error)
        }
    }

    var finalList = []
    finalList = searchText ? searchList : eventsList

    return (
        <>
            <div className='side-wrp'>
                <Sidebar />
            </div>
            <Navigation
                originalList={eventsList}
                updatedList={(val) => setSearchList(val)}
                searchKey={"eventName"}
                showSearh={true}
                setSearchQuery={(val) => setSearchText(val)}
            />
            <Row className='full-height'>
                <Col className='white-bg'>
                    <Link className='back-btn override' to="/home"><ArrowBackIcon /> Back to Dashboard </Link>
                    <Row>
                        <Col>
                            <div className='charts '>
                                <>
                                    <div className='table-wrap'>
                                        <div className='flexRow'>
                                            <h3 className='main-third'>Hunt List</h3>
                                            <div></div>
                                            {/* uncomment after testing */}
                                            {/* <Button variant="primary" className='cus-btn'
                                                onClick={() => history.push('/update-event', { action: "Add", })}
                                            >
                                                Add
                                            </Button> */}
                                        </div>
                                        <Table striped bordered hover responsive>
                                            <thead>
                                                <tr>
                                                    {/* <th>Profile Photo</th> */}
                                                    <th>S.No</th>
                                                    <th>Event Name</th>
                                                    <th>Type</th>
                                                    <th>Description</th>
                                                    <th>Address</th>
                                                    <th>Start Date/Time</th>
                                                    <th>End Date/Time</th>
                                                    {/* <th>Is Posted</th> */}
                                                    <th>Created At</th>
                                                    <th>Modified At</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {finalList.length != 0 ?
                                                    finalList.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                {/* <td>
                                                                    <img
                                                                        src={item.profilePicture ?? AppImages.placeholder}
                                                                        alt="Logo"
                                                                        width={60}
                                                                        height={60}
                                                                        style={{ borderRadius: 60, objectFit: "cover" }}
                                                                    />
                                                                </td> */}
                                                                <td>{index + 1}</td>
                                                                <td>{item.eventName}</td>
                                                                <td>{item.eventType}</td>
                                                                <td>{item.eventDescription}</td>
                                                                <td>{item.eventAddress}</td>
                                                                <td>{`${item.eventStartDate}/${item.eventStartTime}`}</td>
                                                                <td>{`${item.eventEndDate}/${item.eventEndTime}`}</td>
                                                                {/* <td>{item.isPosted}</td> */}
                                                                <td>{handleDateString(item.createdAt)}</td>
                                                                <td>{handleDateString(item.modifiedAt)}</td>
                                                                {/* <td>{doc.setupdateDate ? doc.setupdateDate : '-'}</td> */}
                                                                <td>
                                                                    <Button
                                                                        variant=''
                                                                        className='edit'
                                                                        onClick={(e) => {
                                                                            history.push('/update-event', {
                                                                                action: "Update",
                                                                                eventDetails: item,
                                                                            })
                                                                        }}
                                                                    >
                                                                        Edit
                                                                    </Button>
                                                                    <Button
                                                                        variant=''
                                                                        className='edit'
                                                                        onClick={(e) => {
                                                                            setSelectedEvent(item)
                                                                            setShowModal(true)
                                                                        }}
                                                                    >
                                                                        Remove
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                    :
                                                    <tr>
                                                        <td colSpan={9} >
                                                            <p>No record found</p>
                                                        </td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </Table>
                                        {/* <div className='text-center'>
                                                        <a href="#" className='text-dark'>View All</a>
                                                    </div> */}
                                    </div>

                                </>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {selectedEvent != null &&
                <CustomModal
                    show={showModal}
                    setShow={(val) => setShowModal(val)}
                    title={`Remove Event`}
                    desc={`Are you sure you want to remove ${selectedEvent.eventName}?`}
                    btnText={`Yes`}
                    onClickDone={() => handleRemoveEvent()}
                />
            }
        </>
    );
}

export default ListOfEvents