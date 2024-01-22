import React, { } from 'react'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navigation from '../../components/navbar/Navigation'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ListUnit from '../../components/chart/ViewUnit';
import Sidebar from '../../components/sidebar/Sidebar'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../App.css';

function ViewUser() {
    const { state } = useLocation();

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
                setSearchQuery={(val) => null}
            />
            <Row className='full-height'>
                <Col className='white-bg'>
                    <Link className='back-btn override' to={state.backToPath ?? ""}><ArrowBackIcon /> Back to list </Link>
                    <Row>
                        <Col>
                            <div className='charts '>
                                <ListUnit />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default ViewUser