import React, { useEffect, useState } from 'react'
import { AppLogger } from '../../services/AppLogger';
import Navigation from '../../components/navbar/Navigation'
import Sidebar from '../../components/sidebar/Sidebar'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DataTable from "../../components/chart/ListUnit";
import UnitDataService from "../../services/unit.service"
import '../../App.css';

function ListOfUsers() {
    const [usersList, setUsersList] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        getAllUsers();
        // AppLogger("getAllUsers", "called")
    }, [])

    const getAllUsers = async () => {
        var userDummyArray = []
        const data = await UnitDataService.getAllUnit();
        data.docs.map((doc) => {
            if (doc.data().country != "") {
                userDummyArray.push({ ...doc.data(), id: doc.id })
            }
        })
        setUsersList(userDummyArray)
    };

    var finalList = []
    finalList = searchText ? searchList : usersList

    return (
        <>
            <div className='side-wrp'>
                <Sidebar />
            </div>
            <Navigation
                originalList={usersList}
                updatedList={(val) => setSearchList(val)}
                searchKey={"fullName"}
                showSearh={true}
                setSearchQuery={(val) => setSearchText(val)}
            />
            <Row className='full-height'>
                <Col className='white-bg'>
                    <Row>
                        <Col>
                            <DataTable finalArray={finalList} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default ListOfUsers