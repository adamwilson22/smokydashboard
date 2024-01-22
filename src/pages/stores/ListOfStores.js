import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { AppLogger } from '../../services/AppLogger';
import { AppImages } from '../../services/AppImages';
import { handleDateString, showErrorToast } from '../../services/AppConstant';
import firebaseServices from "../../services/unit.services"
import Navigation from '../../components/navbar/Navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UnitDataService from "../../services/unit.service"
import Sidebar from '../../components/sidebar/Sidebar';
import CustomModal from '../../components/CustomModal';
import AppRoutes from '../../services/AppRoutes';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../App.css';

function ListOfStores({ }) {
    const history = useHistory();
    const [storesList, setStoresList] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        getAllStores();
        AppLogger("getallstores", "called")
    }, [])

    const getAllStores = async () => {
        const data = await UnitDataService.getAllStores();
        // AppLogger("userslist", data)
        setStoresList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    };

    const handleRemoveStore = async () => {
        try {
            await firebaseServices.deleteStore(selectedStore.id);
            setShowModal(false)
        } catch (error) {
            AppLogger("Unable to remove store", error)
            showErrorToast(error)
        }

    }

    var finalList = []
    finalList = searchText ? searchList : storesList

    return (
        <>
            <div className='side-wrp'>
                <Sidebar />
            </div>
            <Navigation
                originalList={storesList}
                updatedList={(val) => setSearchList(val)}
                searchKey={"storeName"}
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
                                        <h3 className='main-third'>Stores List</h3>

                                        <Table striped bordered hover responsive>
                                            <thead>
                                                <tr>
                                                    <th>S.No</th>
                                                    <th>Image</th>
                                                    <th>Store Name</th>
                                                    <th>Owner Name</th>
                                                    <th>Description</th>
                                                    {/* <th>Is Approved</th> */}
                                                    <th>Created At</th>
                                                    {/* <th>Modified At</th> */}
                                                    <th>Action</th>
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
                                                                        src={doc.storeImage ?? AppImages.placeholder}
                                                                        alt="Logo"
                                                                        width={60}
                                                                        height={60}
                                                                        style={{ borderRadius: 8, objectFit: "cover" }}
                                                                    />
                                                                </td>
                                                                <td>{doc.storeName}</td>
                                                                <td>{doc.storeOwnerName}</td>
                                                                <td>{doc.storeDescription}</td>
                                                                {/* <td>{doc.isApproved}</td> */}
                                                                <td>{handleDateString(doc.createdAt)}</td>
                                                                {/* <td>{doc.modifiedAt}</td> */}
                                                                <td className='flexColumn'>
                                                                    <Button
                                                                        variant=''
                                                                        className='edit'
                                                                        onClick={(e) => {
                                                                            // getUnitId(doc.id)
                                                                            history.push(AppRoutes.viewProducts,
                                                                                { storeId: doc.storeId, storeName: doc.storeName }
                                                                            )
                                                                        }}
                                                                    >
                                                                        View Products
                                                                    </Button>
                                                                    <Button
                                                                        variant=''
                                                                        className='edit'
                                                                        onClick={(e) => {
                                                                            setSelectedStore(doc)
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
            {selectedStore != null &&
                <CustomModal
                    show={showModal}
                    setShow={(val) => setShowModal(val)}
                    title={`Remove Store`}
                    desc={`Are you sure you want to remove ${selectedStore.storeName}?`}
                    btnText={`Yes`}
                    onClickDone={() => handleRemoveStore()}
                />
            }
        </>
    );
}

export default ListOfStores