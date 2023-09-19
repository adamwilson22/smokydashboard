import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import UnitDataService from "../../services/unit.service"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Navigation from "../../components/navbar/Navigation"
import Sidebar from "../../components/sidebar/Sidebar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../App.css';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { AppLogger } from '../../services/AppLogger';
import { AppImages } from '../../services/AppImages';
import { useHistory, useLocation } from 'react-router-dom';



function ListOfEvents() {
    const history = useHistory();
    const [eventsList, setEventsList] = useState([]);
    const [searchList, setSearchList] = useState([]);


    useEffect(() => {
        getListOfEvents()
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

    var finalList = []
    finalList = searchList.length != 0 ? searchList : eventsList

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
            />
            <Row className='full-height'>
                <Col className='white-bg'>
                    <Link className='back-btn' to="/home"><ArrowBackIcon /> Back to Home </Link>
                    <Row>
                        <Col>
                            <div className='charts '>
                                <>
                                    <div className='table-wrap'>
                                        <h3 className='main-third'>List Of Events</h3>
                                        <Table striped bordered hover responsive>
                                            <thead>
                                                <tr>
                                                    {/* <th>Profile Photo</th> */}
                                                    <th>Event Name</th>
                                                    <th>Type</th>
                                                    <th>Description</th>
                                                    <th>Address</th>
                                                    <th>Start Date/Time</th>
                                                    <th>End Date/Time</th>
                                                    <th>Is Posted</th>
                                                    <th>Created At</th>
                                                    <th>Modified At</th>
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
                                                                <td>{item.eventName}</td>
                                                                <td>{item.eventType}</td>
                                                                <td>{item.eventDescription}</td>
                                                                <td>{item.eventAddress}</td>
                                                                <td>{`${item.eventStartDate}/${item.eventStartTime}`}</td>
                                                                <td>{`${item.eventEndDate}/${item.eventEndTime}`}</td>
                                                                <td>{item.isPosted}</td>
                                                                <td>{item.createdAt}</td>
                                                                <td>{item.modifiedAt}</td>
                                                                {/* <td>{doc.setupdateDate ? doc.setupdateDate : '-'}</td> */}
                                                                <td>
                                                                    <Button
                                                                        variant=''
                                                                        className='edit'
                                                                    // onClick={(e) => {
                                                                    //     history.push('/update',
                                                                    //         // { eventID: id }
                                                                    //     )
                                                                    // }
                                                                    // }
                                                                    >
                                                                        Edit
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
        </>
    );
}

export default ListOfEvents