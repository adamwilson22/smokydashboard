import React, { useState, useEffect } from 'react'
import Navigation from '../../components/navbar/Navigation'
import Sidebar from '../../components/sidebar/Sidebar'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Chart from '../../components/chart/Chart';
import Progress from '../../components/chart/Progress';
import { Units } from '../../components/chart/Unit';
import DataTable from '../../components/chart/DataTable';
import BarCharts from '../../components/chart/BarCharts'
import '../../App.css';
import { useUserAuth } from '../../Context/UserAuthContext';
import UnitDataService from '../../services/unit.service';

function Home() {
    const { user } = useUserAuth();

    const [totalUsers, setTotalUsers] = useState(0)
    const [totalProducts, setTotalProducts] = useState(0)
    const [totalStores, setTotalStores] = useState(0)
    const [totalEvents, setTotalEvents] = useState(0)
    const [totalSubscribeUsers, setTotalSubscribedUsers] = useState(0)

    useEffect(() => {
        getDashboardData()
    }, [])

    const getDashboardData = async () => {
        const eventsData = await UnitDataService.getAllEvents()
        if (!eventsData.empty) {
            setTotalEvents(eventsData.docs.length)
        }

        const usersData = await UnitDataService.getAllUnit()
        if (!usersData.empty) {
            setTotalUsers(usersData.docs.length)
        }

        const storesData = await UnitDataService.getAllStores()
        if (!storesData.empty) {
            setTotalStores(storesData.docs.length)
        }

        const productsData = await UnitDataService.getAllProducts()
        if (!productsData.empty) {
            setTotalProducts(productsData.docs.length)
        }

        const subPayData = await UnitDataService.getAllSubsciptionsPayments()
        if (!subPayData.empty) {
            setTotalSubscribedUsers(subPayData.docs.length)
        }
    };

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
                    <div className="greet-text">
                        <h2>Hello, {user.displayName ?? "Admin"}</h2>
                        <p>SmokeBud Dashboard</p>
                    </div>
                    <Row>
                        <Col xl='4' lg='6' className='mt-2'>
                            <div className='charts'>
                                <Chart
                                    title={'Total Users'}
                                    // subTitle={'Users'}
                                    desc={totalUsers}
                                />
                            </div>
                        </Col>
                        <Col xl='4' lg='6' className='mt-2'>
                            <div className='charts'>
                                <Chart
                                    title={'Total User Subscriptions'}
                                    // subTitle={'Subscriptions Payments'}
                                    desc={totalSubscribeUsers}
                                />
                            </div>
                        </Col>
                        <Col xl='4' className='mt-2'>
                            <div className='charts'>
                                <Chart
                                    title={'Total Events'}
                                    // subTitle={'Events'}
                                    desc={totalEvents}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl='4' className='mt-2'>
                            <div className='charts'>
                                <Chart
                                    title={'Total Stores'}
                                    // subTitle={'Stores'}
                                    desc={totalStores}
                                />
                            </div>
                        </Col>
                        <Col xl='4' className='mt-2'>
                            <div className='charts'>
                                <Chart
                                    title={'Total Products'}
                                    // subTitle={'Products'}
                                    desc={totalProducts}
                                />
                            </div>
                        </Col>
                        {/* Add more columns/Charts as needed */}
                    </Row>
                    {/* <Row>
                        <Col lg="8" className='home-appliance-list'>
                            <DataTable />
                        </Col>
                        <Col lg="4">
                            <div className='table-wrap'>
                                <h3 className='main-third'>Daily Records</h3>
                                <BarCharts />
                            </div>
                        </Col>
                    </Row> */}
                </Col>
            </Row>
        </>
    );
}

export default Home