import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import Navigation from '../components/navbar/Navigation'
import Sidebar from '../components/sidebar/Sidebar'
import UnitUpdateForm from '../components/form/UnitUpdateForm';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import firebaseServices from "../services/unit.services"
import { showErrorToast, showSuccessToast } from '../services/AppConstant';
import { AppLogger } from '../services/AppLogger';

function EditProduct() {
    const { state } = useLocation();

    const [product, setProduct] = useState({
        image: null,
        name: "",
        desc: "",
        price: "",
    })

    useEffect(() => {
        if (state.productDetails) {
            // AppLogger("state.prod", state.productDetails)
            setProduct({
                name: state.productDetails.productName,
                desc: state.productDetails.productDescription,
                price: state.productDetails.productPrice,
                image: state.productDetails.productImages[0]
            })
        }
    }, [state])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const body = {
                productName: product.name,
                productDescription: product.desc,
                productPrice: product.price
            }
            await firebaseServices.updateProduct(state.productDetails.id, body)
            showSuccessToast("Product Updated Successfully")
        } catch (error) {
            AppLogger("error removing product", error)
            showErrorToast("Unable to update product")
        }
    }

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
                    <Link className='back-btn override' to={state.backTo}><ArrowBackIcon /> Back to {`${state.backToText}`}</Link>
                    <div className="greet-text">
                        <h2>Update Product</h2>
                        {/* <p>Update Unit</p> */}
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
                                                    fullWidth label="Name"
                                                    id="model-no"
                                                    value={product.name}
                                                    onChange={(e) =>
                                                        setProduct({ ...product, name: e.target.value })
                                                    }
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
                                                    label="Description"
                                                    id="serial-no"
                                                    value={product.desc}
                                                    onChange={(e) =>
                                                        setProduct({ ...product, desc: e.target.value })
                                                    }
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBasicpo">
                                                <label className='label-styl'>Price</label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder='Price'
                                                    fullWidth label="Price"
                                                    id="po-no"
                                                    value={product.price}
                                                    onChange={(e) =>
                                                        setProduct({ ...product, price: e.target.value })
                                                    }
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
                                                Save & Continue
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

export default EditProduct