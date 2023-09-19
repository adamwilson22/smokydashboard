import React, { useEffect, useState } from 'react'
import '../../App.css';
import UnitDataService from "../../services/unit.services"
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useHistory, useLocation } from 'react-router-dom';
import { AppLogger } from '../../services/AppLogger';
import { AppImages } from '../../services/AppImages';

function Home({ id, setUnitId }) {
  const history = useHistory();
  const { state } = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // const test = UnitDataService.getSelectedUnit(state.state).then(r => console.log(r));
    //  getUnits();
    // console.log("state selectedUser =>", state.selectedUser)
    setUser(state.selectedUser)
  }, [])

  // useEffect(() => {
  //   AppLogger("user", user)
  // }, [user])
  // const getUnits = async () => {
  //   const data = await UnitDataService.getSelectedUnit(state.state);
  //   if (!data.empty)
  //     setUnits(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  //   else {
  //     console.log('error')
  //   }
  // };

  return (
    <>
      <div className='table-wrap'>
        <h3 className='main-third'>User Details:  {state.state}</h3>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Profile Photo</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Country</th>
              <th>City</th>
              <th>Date of Birth</th>
              <th>Is Verified</th>
              <th>Is Reported</th>
            </tr>
          </thead>
          <tbody>
            {user != null &&
              // units.map((doc, index) => {
              // return (
              <tr key={user.uid}>
                <td>
                  <img
                    src={user.profilePicture ?? AppImages.placeholder}
                    alt="Logo"
                    width={60}
                    height={60}
                    style={{ borderRadius: 60, objectFit: "cover" }}
                  />
                </td>
                <td>{user.fullName}</td>
                <td>{user.gender}</td>
                <td>{user.userEmail}</td>
                <td>{user.phone}</td>
                <td>{user.country}</td>
                <td>{user.city}</td>
                <td>{user.dateOfBirth}</td>
                <td>{user.isVerified}</td>
                <td>{user.isReported}</td>
                {/* <td>{doc.setupdateDate ? doc.setupdateDate : '-'}</td> */}
                <td>
                  <Button
                    variant=''
                    className='edit'
                    onClick={(e) => {
                      // history.push('/update', { userId: user.uid })
                    }}
                  >
                    Block
                  </Button>
                </td>
              </tr>
              // )
              // })
            }
          </tbody>
        </Table>
        {/* <div className='text-center'>
          <a href="#" className='text-dark'>View All</a>
        </div> */}
      </div>

    </>
  );
}

export default Home