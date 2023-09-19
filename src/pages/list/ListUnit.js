import React, { useEffect, useState } from 'react'
import { AppLogger } from '../../services/AppLogger';
import Navigation from '../../components/navbar/Navigation'
import Sidebar from '../../components/sidebar/Sidebar'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DataTable from "../../components/chart/ListUnit";
import UnitDataService from "../../services/unit.service"
import '../../App.css';

function Home() {
    const [unitId, setUnitId] = useState("");
    const [usersList, setUsersList] = useState([]);
    const [searchList, setSearchList] = useState([]);

    const getUnitIdHandler = (id) => {
        setUnitId(id);
    }

    useEffect(() => {
        getAllUsers();
    }, [])

    const getAllUsers = async () => {
        const data = await UnitDataService.getAllUnit();
        setUsersList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

        // data.docs.map((doc) => {
        //   AppLogger("doc.data()", doc.data())
        //   AppLogger("doc.id", doc.id)
        // })
    };

    var finalList = []
    finalList = searchList.length != 0 ? searchList : usersList

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
            />
            <Row className='full-height'>
                <Col className='white-bg'>
                    <Row>
                        <Col>
                            <DataTable finalArray={finalList} getUnitId={getUnitIdHandler} />

                        </Col>
                    </Row>
                </Col>
            </Row >
        </>
    );
}

export default Home