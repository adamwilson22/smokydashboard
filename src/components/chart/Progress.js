import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';

class Progress extends Component {
    render() {
        return (
            
            <div className='progress-bar-sec chart-wrap'>
                <h3  className='main-third'>Statistics </h3>
                <div className='progress-bar-row'>
                    <Row>
                        <Col><h6>Today's Appliance</h6></Col>
                        <Col><p>100 Units</p></Col>
                    </Row>
                    <ProgressBar variant="success" now={40} />
                </div>
                <div className='progress-bar-row'>
                    <Row>
                        <Col><h6>Today's Appliance</h6></Col>
                        <Col><p>100 Units</p></Col>
                    </Row>
                    <ProgressBar variant="info" now={20} />
                </div>
                <div className='progress-bar-row'>
                    <Row>
                        <Col><h6>Today's Appliance</h6></Col>
                        <Col><p>100 Units</p></Col>
                    </Row>
                    <ProgressBar variant="warning" now={60} />

                </div>
                <div className='progress-bar-row'>
                    <Row>
                        <Col><h6>Today's Appliance</h6></Col>
                        <Col><p>100 Units</p></Col>
                    </Row>
                    <ProgressBar variant="danger" now={80} />
                </div>
                <div className='progress-bar-row'>
                    <Row>
                        <Col><h6>Today's Appliance</h6></Col>
                        <Col><p>100 Units</p></Col>
                    </Row>
                    <ProgressBar variant="success" now={40} />
                </div>
            </div>
        );
    }
}

export default Progress;