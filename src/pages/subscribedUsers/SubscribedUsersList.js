import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { AppLogger } from '../../services/AppLogger';
import { handleDateTime } from '../../services/AppConstant';
import UnitDataService from "../../services/unit.service"
import FBServices from "../../services/unit.services"
import Table from 'react-bootstrap/Table';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Sidebar from '../../components/sidebar/Sidebar';
import Navigation from '../../components/navbar/Navigation';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../App.css';

function SubscribedUsersList({ }) { // getUnitId }) {
    const history = useHistory();
    const [subsPaymentList, setSubsPaymentList] = useState([]);
    const [subsPaymentListFiltered, setSubsPaymentListFiltered] = useState([]);
    const [searchList, setSearchList] = useState([]);

    useEffect(() => {
        getAllSubsPayments();
        AppLogger("getAllSubsPayments", "called")
    }, [])

    const getAllSubsPayments = async () => {
        const data = await UnitDataService.getAllSubsciptionsPayments();
        setSubsPaymentList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

        // data.docs.map((doc) => {
        //     AppLogger("doc.data()", doc.data())
        //     AppLogger("doc.id", doc.id)
        // })
    };

    const handleUserName = () => {
        var finalArray = []

        subsPaymentList.forEach(async (element) => {
            const userDetails = await FBServices.getUserDetails(element.userId);
            // AppLogger("userDetails", userDetails.docs[0].data())
            // AppLogger("typeof userDetails.docs", userDetails.docs)
            finalArray.push({
                ...element,
                userDetails: userDetails.docs[0].data()
            })

            // AppLogger("finallarrray payment", finalArray)
            setSubsPaymentListFiltered(...subsPaymentListFiltered, finalArray)
        })

        // AppLogger("finallarrray", finalArray)
        // setSubsPaymentListFiltered(finalArray)
    }


    // useEffect(() => {
    // console.log('====================================');
    // console.log("subsPaymentListFiltered", subsPaymentListFiltered);
    // console.log('====================================');
    // }, [subsPaymentListFiltered])

    useEffect(() => {
        if (subsPaymentList.length != 0) {
            handleUserName()
        }
    }, [subsPaymentList])


    var finalList = []
    finalList = searchList.length != 0 ? searchList : subsPaymentListFiltered ?? []

    return (
        <>
            <div className='side-wrp'>
                <Sidebar />
            </div>
            <Navigation
                originalList={subsPaymentListFiltered}
                updatedList={(val) => setSearchList(val)}
                searchKey={"userDetails.fullName"}
                showSearh={true}
            />
            <Row className='full-height'>
                <Col className='white-bg'>
                    <Link className='back-btn' to="/home"><ArrowBackIcon /> Back to Dashboard </Link>
                    <Row>
                        <Col>
                            <div className='charts '>
                                <>
                                    <div className='table-wrap'>
                                        <h3 className='main-third'>All Subscription Payment Details</h3>

                                        <Table striped bordered hover responsive>
                                            <thead>
                                                <tr>
                                                    <th>S.No</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Package Name</th>
                                                    <th>Amount</th>
                                                    {/* <th>Payment Method</th> */}
                                                    {/* <th>Payment Type</th> */}
                                                    <th>Created At</th>
                                                    <th>Expiry At</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {finalList.length != 0 ?
                                                    finalList.map((doc, index) => {
                                                        return (
                                                            <tr key={doc.id}>
                                                                <td>{index + 1}</td>
                                                                <td>{doc.userDetails.fullName}</td>
                                                                <td>{doc.userDetails.userEmail}</td>
                                                                <td>{doc.packageName}</td>
                                                                <td>${doc.amount}</td>
                                                                {/* <td>{doc.paymentMethod}</td> */}
                                                                {/* <td>{doc.paymentType}</td> */}
                                                                <td>{handleDateTime(doc.createdAt)}</td>
                                                                <td>{handleDateTime(doc.expiryAt)}</td>
                                                                <td>
                                                                    <Button
                                                                        variant=''
                                                                        className='edit'
                                                                        onClick={(e) => {
                                                                            // getUnitId(doc.id)
                                                                            history.push('/view-user', {
                                                                                selectedUser: doc.userDetails,
                                                                                backToPath: "/list-subscription-payments"
                                                                            });
                                                                        }}
                                                                    >
                                                                        View User
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }) :
                                                    <tr>
                                                        <td colSpan={8} >
                                                            <p>No record found</p>
                                                        </td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </Table>
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

export default SubscribedUsersList