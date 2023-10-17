import React, { useState } from 'react'
import Navigation from '../../components/navbar/Navigation'
import Sidebar from '../../components/sidebar/Sidebar'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../App.css';
import DataTable from "../../components/chart/DataTable";

function Home() {
    const [unitId, setUnitId] = useState("");
    const getUnitIdHandler = (id) => {
        console.log("the id of the click unit is:", id);
        setUnitId(id);
    }
    return (
        <>
            <div className='side-wrp'>
                <Sidebar />
            </div>
            <Navigation showSearh={true}
                setSearchQuery={(val) => null}
            />
            <Row className='full-height'>

                <Col className='white-bg list-page'>

                    <Row>
                        <Col>
                            <DataTable getUnitId={getUnitIdHandler} />

                        </Col>
                    </Row>
                </Col>
            </Row >
        </>
    );
}

export default Home