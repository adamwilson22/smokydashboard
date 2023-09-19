import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import '../../App.css';
import logo from '../../assets/LOGO.png';
import dashIco from '../../assets/dashicon.png';

class Sidebar extends Component {
    render() {
        return (
            <div>
                <div className='logo-wrp'>
                    {/* <img src={logo} alt="Logo" /> */}
                    <h2>Smoke Bud</h2>
                </div>
                <div className='side-nav'>
                    <Nav defaultActiveKey="/home" className="flex-column">
                        <Nav.Link href="/home"><img src={dashIco} alt="Logo" />Dashboard</Nav.Link>
                        {/* <Nav.Link href="/addunit"><img src={dashIco} alt="Logo" />Add New Unit</Nav.Link> */}
                        <Nav.Link href="/list-users"><img src={dashIco} alt="Logo" />Users</Nav.Link>
                        <Nav.Link href="/list-subscription-payments"><img src={dashIco} alt="Logo" />Subscribed Users</Nav.Link>
                        <Nav.Link href="/list-events"><img src={dashIco} alt="Logo" />Events</Nav.Link>
                        <Nav.Link href="/list-stores"><img src={dashIco} alt="Logo" />Stores</Nav.Link>
                        <Nav.Link href="/notify-users"><img src={dashIco} alt="Logo" />Notify Users</Nav.Link>

                        {/* <Nav.Link href="/add"><img src={dashIco} alt="Logo" />Add New Appliance</Nav.Link> */}
                        {/* <Nav.Link href="/list"><img src={dashIco} alt="Logo" />List Appliances</Nav.Link> */}
                    </Nav>
                </div>
            </div>
        );
    }
}

export default Sidebar;