import React, { useState } from 'react'
import Navigation from '../../components/navbar/Navigation'
import Sidebar from '../../components/sidebar/Sidebar'
import ListUnit from '../../components/chart/ViewUnit';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../App.css';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation } from 'react-router-dom';

function UnitCreate() {
    const { state } = useLocation();
    const [unitNo, setunitNo] = useState("");

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
                    <Link className='back-btn override' to={state.backToPath ?? ""}><ArrowBackIcon /> Back to list </Link>
                    <Row>
                        <Col>
                            <div className='charts '>
                                <ListUnit id={unitNo} setunitNo={setunitNo} />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default UnitCreate