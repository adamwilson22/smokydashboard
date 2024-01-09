import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import '../../App.css';
import logo from '../../assets/logosmok.svg';
import dashIco from '../../assets/9055226_bxs_dashboard_icon.png';
import storeIco from '../../assets/3018711_ecommerce_platform_shopify_applications_online_icon.png';
import eventIco from '../../assets/8683108_calendar_care_medicine_events_schedule_icon.png';
import subscIco from '../../assets/678140_feed_media_news_rss_social_icon.png';
import usersIco from '../../assets/309041_users_group_people_icon.png';
import notifyIco from '../../assets/9075827_notification_alert_bell_notice_alarm_icon.png';
import chatsIco from "../../assets/chat-icon.png"

class Sidebar extends Component {
    render() {
        return (
            <div>
                <div className='logo-wrp'>
                    <img src={logo} alt="Logo" className='logo' />
                    {/* <h2>Smoke Bud</h2> */}
                </div>
                <div className='side-nav'>
                    <Nav defaultActiveKey="/home" className="flex-column">
                        <Nav.Link href="/home"><img src={dashIco} alt="Logo" />Dashboard</Nav.Link>
                        {/* <Nav.Link href="/addunit"><img src={dashIco} alt="Logo" />Add New Unit</Nav.Link> */}
                        <Nav.Link href="/list-users"><img src={usersIco} alt="Logo" />Users</Nav.Link>
                        <Nav.Link href="/list-subscription-payments"><img src={subscIco} alt="Logo" />Subscribed Users</Nav.Link>
                        <Nav.Link href="/list-events"><img src={eventIco} alt="Logo" />Events</Nav.Link>
                        {/* <Nav.Link href="/list-stores"><img src={storeIco} alt="Logo" />Stores</Nav.Link> */}
                        {/* <Nav.Link href="/all-products"><img src={storeIco} alt="Logo" />Products</Nav.Link> */}
                        <Nav.Link href="/notify-users"><img src={notifyIco} alt="Logo" />Notify Users</Nav.Link>
                        <Nav.Link href="/list-chats"><img src={chatsIco} alt="Logo" />Chats</Nav.Link>
                        <Nav.Link href="/list-posts"><img src={chatsIco} alt="Logo" />Posts</Nav.Link>

                        {/* <Nav.Link href="/add"><img src={dashIco} alt="Logo" />Add New Appliance</Nav.Link> */}
                        {/* <Nav.Link href="/list"><img src={dashIco} alt="Logo" />List Appliances</Nav.Link> */}
                    </Nav>
                </div>
            </div>
        );
    }
}

export default Sidebar;