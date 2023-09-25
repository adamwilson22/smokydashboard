import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { AppImages } from '../../services/AppImages';
import { handleTags } from '../../services/AppConstant';
import { AppLogger } from '../../services/AppLogger';
import UnitDataService from "../../services/unit.service"
import Table from 'react-bootstrap/Table';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Sidebar from '../../components/sidebar/Sidebar';
import Navigation from '../../components/navbar/Navigation';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../App.css';

function AllProducts({ }) {
    const history = useHistory();
    const [storesList, setStoresList] = useState([]);
    const [searchList, setSearchList] = useState([]);

    useEffect(() => {
        getAllProducts();
        AppLogger("getAllProducts", "called")
    }, [])

    const getAllProducts = async () => {
        const data = await UnitDataService.getAllProducts();
        // AppLogger("userslist", data)
        setStoresList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

        // data.docs.map((doc) => {
        //     AppLogger("doc.data()", doc.data())
        //     AppLogger("doc.id", doc.id)
        // })
    };

    var finalList = []
    finalList = searchList.length != 0 ? searchList : storesList

    return (
        <>
            <div className='side-wrp'>
                <Sidebar />
            </div>
            <Navigation
                originalList={storesList}
                updatedList={(val) => setSearchList(val)}
                searchKey={"productName"}
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
                                        <h3 className='main-third'>List of All Products</h3>

                                        <Table striped bordered hover responsive>
                                            <thead>
                                                <tr>
                                                    <th>S.No</th>
                                                    <th>Image</th>
                                                    <th>Product Name</th>
                                                    <th>Description</th>
                                                    <th>Price</th>
                                                    <th>Tags</th>
                                                    {/* <th>createdAt</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {finalList.length != 0 ?
                                                    finalList.map((doc, index) => {
                                                        return (
                                                            <tr key={doc.id}>
                                                                <td>{index + 1}</td>
                                                                <td>
                                                                    <img
                                                                        src={doc.productImages.length != 0 ? doc.productImages[0] : AppImages.placeholder}
                                                                        alt="Logo"
                                                                        width={60}
                                                                        height={60}
                                                                        style={{ borderRadius: 8, objectFit: "cover" }}
                                                                    />
                                                                </td>
                                                                <td>{doc.productName}</td>
                                                                <td>{doc.productDescription}</td>
                                                                <td>${doc.productPrice}</td>
                                                                <td>{handleTags(doc.productTags)}</td>
                                                                {/* <td>{handleDateTime(doc.createdAt)}</td> */}
                                                                {/* <td>
                                                                    <Button
                                                                        variant=''
                                                                        className='edit'
                                                                        onClick={(e) => {
                                                                            // getUnitId(doc.id)
                                                                            history.push('/view-products',
                                                                                { storeId: doc.storeId, storeName: doc.storeName }
                                                                            )
                                                                        }}
                                                                    >
                                                                        View Products
                                                                    </Button>
                                                                </td> */}
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
        </>
    );
}

export default AllProducts