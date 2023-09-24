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
import storeIco from '../../assets/3018711_ecommerce_platform_shopify_applications_online_icon.png';
import eventIco from '../../assets/8683108_calendar_care_medicine_events_schedule_icon.png';
import subscIco from '../../assets/678140_feed_media_news_rss_social_icon.png';
import usersIco from '../../assets/309041_users_group_people_icon.png';
import prodIco from '../../assets/6843036_courier_deliver_delivery_package_product_icon.png';
import { Card } from 'react-bootstrap';

function Home() {
    const { user } = useUserAuth();

    const [totalUsers, setTotalUsers] = useState(0)
    const [totalProducts, setTotalProducts] = useState(0)
    const [totalStores, setTotalStores] = useState(0)
    const [totalEvents, setTotalEvents] = useState(0)
    const [totalSubscribeUsers, setTotalSubscribedUsers] = useState(0)
    const loginResp = JSON.parse(localStorage.getItem("USER"))

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
                        <h2>Hello, {user != null ? user.displayName : "Admin"}</h2>
                        <p>SmokeBud Dashboard</p>
                    </div>
                    <Row>
                        <Col xl='4' lg='6' className='mt-2'>
                            <div className='charts'>
                                <Card className='flexcard'>
                                    <Card.Body>
                                        <Chart
                                            title={'Total Users'}
                                            // subTitle={'Users'}
                                            desc={totalUsers}
                                        />
                                        <img src={usersIco} />
                                    </Card.Body>
                                </Card>

                            </div>
                        </Col>
                        <Col xl='4' lg='6' className='mt-2'>
                            <div className='charts'>
                                <Card className='flexcard'>
                                    <Card.Body>
                                        <Chart
                                            title={'Total User Subscriptions'}
                                            // subTitle={'Subscriptions Payments'}
                                            desc={totalSubscribeUsers}
                                        />
                                        <img src={subscIco} />
                                    </Card.Body>
                                </Card>

                            </div>
                        </Col>
                        <Col xl='4' className='mt-2'>
                            <div className='charts'>
                                <Card className='flexcard'>
                                    <Card.Body>
                                        <Chart
                                            title={'Total Events'}
                                            // subTitle={'Events'}
                                            desc={totalEvents}
                                        />
                                        <img src={eventIco} />
                                    </Card.Body>
                                </Card>

                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl='4' className='mt-2'>
                            <div className='charts'>
                                <Card className='flexcard'>
                                    <Card.Body>
                                        <Chart
                                            title={'Total Stores'}
                                            // subTitle={'Stores'}
                                            desc={totalStores}
                                        />
                                        <img src={storeIco} />
                                    </Card.Body>
                                </Card>

                            </div>
                        </Col>
                        <Col xl='4' className='mt-2'>
                            <div className='charts'>
                                <Card className='flexcard'>
                                    <Card.Body>
                                        <Chart
                                            title={'Total Products'}
                                            // subTitle={'Products'}
                                            desc={totalProducts}
                                        />
                                        <img src={prodIco} />
                                    </Card.Body>
                                </Card>

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