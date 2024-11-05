import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { AppImages } from '../../services/AppImages';
import { handleTags, showErrorToast, showSuccessToast } from '../../services/AppConstant';
import { AppLogger } from '../../services/AppLogger';
import { Button } from 'react-bootstrap';
import CustomModal from '../../components/CustomModal';
import UnitDataService from "../../services/unit.service"
import firebaseServices from "../../services/unit.services"
import Navigation from '../../components/navbar/Navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Sidebar from '../../components/sidebar/Sidebar';
import AppRoutes from '../../services/AppRoutes';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../App.css';
import { get } from 'lodash';

function AllProducts({ }) {
    const history = useHistory();
    const [storesList, setStoresList] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [selectedProd, setSelectedProd] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [showApproveModal, setShowApproveModal] = useState(false)
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        getAllProducts();
        AppLogger("getAllProducts", "called")
    }, [])

    const getAllProducts = async () => {
        const data = await UnitDataService.getAllProducts();
        setStoresList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

        AppLogger("all products list ", data)
        data.docs.map((doc) => {
            AppLogger("all products doc.data()", doc.data())
            AppLogger("doc.id", doc.id)
        })
    };

    const handleRemoveProd = async () => {
        const date = Date()
        try {
            const body = {
                isDeleted: true,
                updatedAt: date.toString()
            }
            await firebaseServices.updateProduct(selectedProd.id, body)
            setShowModal(false)
        } catch (error) {
            AppLogger("error removing product", error)
        }
    }

    const handleApprove = async () => {
        var prodArry = []

        AppLogger("handleapprove", "")
        try {
            const body = {
                isApproved: !selectedProd.isApproved,
            }
            await firebaseServices.updateProduct(selectedProd.id, body)
            setShowApproveModal(false)
            storesList.forEach((element) => {
                if (element.id == selectedProd.id) {
                    prodArry.push({
                        ...element, isApproved: !selectedProd.isApproved
                    })
                } else {
                    prodArry.push(element)
                }
            })

            setStoresList(prodArry)
            showSuccessToast(`Product ${!selectedProd.isApproved ? "Approved" : "Declined"} Successfully`)
        } catch (error) {
            AppLogger("error changing product status", error)
            showErrorToast("Unable to update product status!")
        }
    }

    var finalList = []
    finalList = searchText ? searchList : storesList

    const handleReportedUsers = (reportedUsers = []) => {
        var usersList = []
        reportedUsers.forEach(async (item) => {
            const userData = await firebaseServices.getUserDetails(item)
            if (userData) {
                usersList.push(get(userData, "fullName", ""))
            }
        })

        return handleTags(usersList)
    }

    return (
        <>
            <div className='side-wrp'>
                <Sidebar />
            </div>
            <Navigation
                originalList={storesList}
                updatedList={(val) => setSearchList(val)}
                searchKey={"adName"}
                showSearh={true}
                setSearchQuery={(val) => setSearchText(val)}
            />
            <Row className='full-height'>
                <Col className='white-bg'>
                    <Link className='back-btn override' to={AppRoutes.home}><ArrowBackIcon /> Back to Dashboard </Link>
                    <Row>
                        <Col>
                            <div className='charts '>
                                <>
                                    <div className='table-wrap'>
                                        <h3 className='main-third'>Products List</h3>

                                        <Table striped bordered hover responsive>
                                            <thead>
                                                <tr>
                                                    <th>S.No</th>
                                                    <th>Image</th>
                                                    <th>Product Name</th>
                                                    <th>Description</th>
                                                    <th>Price</th>
                                                    <th>Reported By</th>
                                                    {/* <th>Approved</th> */}
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {finalList.length != 0 ?
                                                    finalList.map((doc, index) => {
                                                        return !get(doc, "isDeleted", false) && (
                                                            <tr key={doc.id}>
                                                                <td>{index + 1}</td>
                                                                <td>
                                                                    <img
                                                                        src={
                                                                            get(doc, "media", []).length != 0
                                                                                ? get(doc, "media[0].mediaUrl", "") : AppImages.placeholder}
                                                                        alt="Logo"
                                                                        width={60}
                                                                        height={60}
                                                                        style={{ borderRadius: 8, objectFit: "cover" }}
                                                                    />
                                                                </td>
                                                                <td>{doc.adName}</td>
                                                                <td>{get(doc, "description", "") ? get(doc, "description", "") : "-"}</td>
                                                                <td>${doc.price}</td>
                                                                <td>{get(doc, "reportedUserIds", []).length > 0 ? handleReportedUsers(doc.reportedUserIds) : "-"}</td>
                                                                {/* <td>
                                                                    <label class="switch">
                                                                        <input type="checkbox"
                                                                            // value={doc.isApproved}
                                                                            checked={doc.isApproved}
                                                                            onChange={(e) => {
                                                                                // handleApprove(e.target.checked)
                                                                                setShowApproveModal(true)
                                                                                setSelectedProd(doc)
                                                                            }}
                                                                        />
                                                                        <span class="slider round"></span>
                                                                    </label>
                                                                </td> */}

                                                                {/* <td>{handleDateTime(doc.createdAt)}</td> */}
                                                                <td className='flexColumn'>
                                                                    <Button
                                                                        variant=''
                                                                        className='edit'
                                                                        onClick={(e) => {
                                                                            history.push(AppRoutes.updateProduct,
                                                                                { productDetails: doc, backTo: AppRoutes.allProducts, backToText: "Products" }
                                                                            )
                                                                        }}
                                                                    >
                                                                        Edit
                                                                    </Button>
                                                                    <Button
                                                                        variant=''
                                                                        className='edit'
                                                                        onClick={(e) => {
                                                                            setSelectedProd(doc)
                                                                            setShowModal(true)
                                                                        }}
                                                                    >
                                                                        Remove
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }) :
                                                    <tr>
                                                        <td colSpan={9} >
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
            {selectedProd != null &&
                <CustomModal
                    show={showModal}
                    setShow={(val) => setShowModal(val)}
                    title={`Remove Product`}
                    desc={`Are you sure you want to remove ${selectedProd.adName}?`}
                    btnText={`Yes`}
                    onClickDone={() => handleRemoveProd()}
                />
            }
            {selectedProd != null &&
                <CustomModal
                    show={showApproveModal}
                    setShow={(val) => setShowApproveModal(val)}
                    title={`${selectedProd.isApproved ? "Decline" : "Arppove"} Product`}
                    desc={`Are you sure you want to ${selectedProd.isApproved ? "decline" : "arppove"} ${selectedProd.adName}?`}
                    btnText={`Yes`}
                    onClickDone={() => handleApprove()}
                />
            }
        </>
    );
}

export default AllProducts