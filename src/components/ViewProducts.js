import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import UnitDataService from "../services/unit.services"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Navigation from './navbar/Navigation'
import Sidebar from './sidebar/Sidebar'
import ListUnit from './chart/ViewUnit';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../App.css"
import { AppLogger } from '../services/AppLogger';
import { AppImages } from '../services/AppImages';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { handleTags } from '../services/AppConstant';
import CustomModal from './CustomModal';

function ViewProducts() {
    const history = useHistory();
    const { state } = useLocation();
    const [productsList, setProductsList] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [selectedProd, setSelectedProd] = useState(null)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        getStoresProducts()
    }, [])

    const getStoresProducts = async () => {
        const data = await UnitDataService.getStoresAllProducts(state.storeId);
        if (!data.empty) {
            setProductsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            data.docs.map((doc) => {
                AppLogger("product item", doc.data())
            })
        } else {
            console.log('Error: no products found')
        }
    };

    const handleRemoveProd = async () => {
        try {
            await UnitDataService.deleteProduct(selectedProd.uid)
            setShowModal(false)
        } catch (error) {
            AppLogger("error removing product", error)
        }
    }

    var finalList = []
    finalList = searchList.length != 0 ? searchList : productsList

    return (
        <>
            <div className='side-wrp'>
                <Sidebar />
            </div>
            <Navigation
                originalList={productsList}
                updatedList={(val) => setSearchList(val)}
                searchKey={"productName"}
                showSearh={true}
            />
            <Row className='full-height'>
                <Col className='white-bg'>
                    <Link className='back-btn' to="/list-stores"><ArrowBackIcon /> Back to Stores list </Link>
                    <Row>
                        <Col>
                            <div className='charts '>
                                <>
                                    <div className='table-wrap'>
                                        <h3 className='main-third'>{state.storeName ?? ""} Products</h3>
                                        <Table striped bordered hover responsive>
                                            <thead>
                                                <tr>
                                                    <th>Image</th>
                                                    <th>Product Name</th>
                                                    <th>Price</th>
                                                    <th>Tags</th>
                                                    <th>Description</th>
                                                    <th>Is Approved</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {finalList.length != 0 ?
                                                    finalList.map((doc, index) => {
                                                        return (
                                                            <tr key={doc.uid}>
                                                                <td>
                                                                    <img
                                                                        src={doc.productImages.length != 0 ? doc.productImages[0] : AppImages.placeholder}
                                                                        alt="Logo"
                                                                        width={60}
                                                                        height={60}
                                                                        style={{ borderRadius: 60, objectFit: "cover" }}
                                                                    />
                                                                </td>
                                                                <td>{doc.productName}</td>
                                                                <td>{doc.productPrice}</td>
                                                                <td>{handleTags(doc.productTags)}</td>
                                                                <td>{doc.productDescription}</td>
                                                                <td>{doc.isApproved}</td>
                                                                {/* <td>{doc.setupdateDate ? doc.setupdateDate : '-'}</td> */}
                                                                <td className='flexColumn'>
                                                                    <Button
                                                                        variant=''
                                                                        className='edit'
                                                                        onClick={(e) => {
                                                                            history.push('/update-product',
                                                                                { productDetails: doc }
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
                                                        <td colSpan={6} >
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
                    desc={`Are you sure you want to remove ${selectedProd.productName}?`}
                    btnText={`Yes`}
                    onClickDone={() => handleRemoveProd()}
                />
            }
        </>
    );
}

export default ViewProducts